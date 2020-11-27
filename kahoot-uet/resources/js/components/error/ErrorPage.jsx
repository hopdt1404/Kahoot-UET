import React from "react";
import { useLocation } from "react-router-dom";
import "./error.css";

function ErrorPage() {
    let location = useLocation();

    return (
        <div className="error-main">
            <section class="error-container">
                <span>4</span>
                <span>
                    <span class="screen-reader-text">0</span>
                </span>
                <span>4</span>
            </section>
            <h1 className="error-text">Page not found!</h1>
            <div class="link-container">
                <a href="/" class="more-link">
                    Visit home
                </a>
            </div>
        </div>
    );
}

export default ErrorPage;