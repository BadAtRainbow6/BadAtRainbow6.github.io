// script.js
const pages = document.querySelectorAll('.page');
let current = 0;

document.getElementById('next').addEventListener('click', () => {
    if (current < pages.length - 1) {
        pages[current].style.transform = 'rotateY(-180deg)';
        current++;
    }
});

document.getElementById('prev').addEventListener('click', () => {
    if (current > 0) {
        current--;
        pages[current].style.transform = 'rotateY(0deg)';
    }
});