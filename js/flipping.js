const pages = document.querySelectorAll('.page');
let current = 0;

function updateZIndexes() {
    pages.forEach((page, i) => {
        if (page.classList.contains('flipped')) {
            // Pages flipped to the left should stack from bottom up
            page.style.zIndex = i + 1;
        } else {
            // Pages still on the right should stack top down
            page.style.zIndex = pages.length - i;
        }
    });
}

function flipForward() {
    if (current < pages.length) {
        pages[current].classList.add('flipped');
        current++;
        updateZIndexes(); // Recalculate after each flip
    }
}

function flipBackward() {
    if (current > 0) {
        current--;
        pages[current].classList.remove('flipped');
        updateZIndexes(); // Recalculate after each flip
    }
}

document.getElementById('next').addEventListener('click', flipForward);
document.getElementById('prev').addEventListener('click', flipBackward);

document.querySelectorAll('.jump').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = parseInt(link.dataset.page);
        if (!isNaN(target)) {
            if (target > current) {
                while (current < target) flipForward();
            } else if (target < current) {
                while (current > target) flipBackward();
            }
        }
    });
});

updateZIndexes();