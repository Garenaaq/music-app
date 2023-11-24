import MainPage from "./pages/MainPage/MainPage.jsx";
import style from "./global.module.scss";
import PlayBar from "./components/PlayBar/PlayBar.jsx";

const App = () => {
  return (
    <div className={style.wrapper}>
      <MainPage/>
      <PlayBar/>
    </div>
  );
};
 

export default App;
