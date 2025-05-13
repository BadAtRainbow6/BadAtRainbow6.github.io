const pages = document.querySelectorAll(".page");
let current = 0;

function flipPage(index) {
    pages[index].style.transform = 'rotateY(-180deg)';
}

function unflipPage(index) {
    pages[index].style.transform = 'rotateY(0deg)';
}

document.getElementById("next").onclick = () => {
    if (current < pages.length - 1) {
        flipPage(current);
        current++;
    }
};

document.getElementById("prev").onclick = () => {
    if (current > 0) {
        current--;
        unflipPage(current);
    }
};