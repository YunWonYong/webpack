import "./index.css";
import hanmburgerBtn from "./hamburger_btn.png";

document.addEventListener("DOMContentLoaded", () => {
    const imageTag = document.createElement("IMG");
    imageTag.src = hanmburgerBtn;
    imageTag.alt = "hanmburger button";
    document.body.appendChild(imageTag);   
});

console.log(process.env);
console.log(process.env.NODE_ENV);
console.log(TWO);
console.log(TWOStr);
console.log(api.url);
console.log(api);