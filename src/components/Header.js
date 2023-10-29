import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src="https://stockarea.io/assets/user/images/header/logo.png" alt="logo" />
                </Link>
            </div>
            <div className="">
                <h2>Where everyone gets a bargain</h2>
            </div>
        </header>
    )
}