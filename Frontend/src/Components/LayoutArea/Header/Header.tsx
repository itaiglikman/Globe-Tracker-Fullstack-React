import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Menu from "../Menu/Menu";
import "./Header.css";


function Header(): JSX.Element {

    return (
        <div className="Header">
            <div className="left-header">
                <h1>Globe Trekker</h1>
                <Menu />
            </div>

            <div className="right-header">
                <AuthMenu />
            </div>

        </div>
    );
}

export default Header;
