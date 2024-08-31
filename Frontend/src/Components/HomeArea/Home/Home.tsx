import "./Home.css";
import globe from "../../../Assets/Images/globe.png"
import useTitle from "../../../Utils/UseTitle";

function Home(): JSX.Element {

    useTitle("Home");
    return (
        <div className="Home">
            <img src={globe}/>
        </div>
    );
}

export default Home;
