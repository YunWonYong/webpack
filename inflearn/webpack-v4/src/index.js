import "./index.css";
import hanmburgerBtn from "./hamburger_btn.png";

document.addEventListener("DOMContentLoaded", () => {
    const imageTag = document.createElement("IMG");
    imageTag.src = hanmburgerBtn;
    imageTag.alt = "hanmburger button";
    document.body.appendChild(imageTag);   
});