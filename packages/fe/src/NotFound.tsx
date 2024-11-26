import { Link } from "@tanstack/react-router";

export function NotFound() {
    return (
        <div>
            <h1>Error 404</h1>
            <p>Unable to find requested resource</p>
            <Link to="/">Go back to home</Link>
        </div>
    );
}
