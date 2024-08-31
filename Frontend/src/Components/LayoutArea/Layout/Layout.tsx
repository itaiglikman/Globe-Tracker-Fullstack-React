import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <Header />

            <div className="routing"><Routing /></div>

            <Footer />
        </div>
    );
}

export default Layout;
