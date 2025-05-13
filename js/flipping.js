const pages = document.querySelectorAll(".page");
let current = 0;

document.getElementById("next").onclick = () => {
    if (current < pages.length) {
        pages[current].style.transform = "rotateY(-180deg)";
        current++;
    }
};

document.getElementById("prev").onclick = () => {
    if (current > 0) {
        current--;
        pages[current].style.transform = "rotateY(0deg)";
    }
};