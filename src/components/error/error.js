import { Link } from "react-router-dom";

export default function Error() {
    return (
        <div className="error">
            <h1 className="error-title">Oops, something went wrong.</h1>
            <Link to="/" className="error-btn">Go home</Link>
        </div>
    )
}