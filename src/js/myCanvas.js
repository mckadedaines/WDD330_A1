// const canvas = document.querySelector(".myCanvas");
// const width = (canvas.width = window.innerWidth);
// const height = (canvas.height = window.innerHeight);
// const ctx = canvas.getContext("2d");

// console.log("Canvas width:", width);
// console.log("Canvas height:", height);

// ctx.fillStyle = "rgb(0 0 0)";
// ctx.fillRect(0, 0, width, height);

// From chatgpt
document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.querySelector(".myCanvas");
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, width, height);
});