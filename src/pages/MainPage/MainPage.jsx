import style from "./mainPage.module.scss"
import Track from "../../components/Track/Track.jsx";
import tracksList from "../../assets/tracksList.js";
import { Input } from "@mui/material";
import { useState } from "react";

const foundTrack = (query) => {
    if (!query) {
        return tracksList;
    }
    return tracksList.filter((track) => {
        return track.artists.toLowerCase().includes(query.toLowerCase()) || track.title.toLowerCase().includes(query.toLowerCase());
    });
};

const MainPage = () => {
    const [tracks, setTracks] = useState(tracksList);
    const handleChange = (event) => {
        setTracks(foundTrack(event.target.value));
    };

    return (
        <div className={style.search}>
            <Input className={style.input} placeholder="Поиск песен" onChange={handleChange}></Input>
            <div className={style.list}>
               {tracks.map((track) => {
                    return (<Track key={track.id} {...track}/>);
               })}
            </div>
        </div>
    );
}

export default MainPage;