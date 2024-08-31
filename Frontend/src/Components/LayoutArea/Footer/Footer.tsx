import "./Footer.css";

function Footer(): JSX.Element {

    let year = new Date().getFullYear();

    return (
        <div className="Footer">
            {year} ©️ Itai Glikman 
        </div>
    );
}

export default Footer;
