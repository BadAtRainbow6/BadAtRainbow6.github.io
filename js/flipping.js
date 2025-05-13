const sheets = document.querySelectorAll('.sheet');
let current = 0;

function updateSheets(index) {
    sheets.forEach((sheet, i) => {
        if (i < index) {
            sheet.classList.add('flipped');
        } else {
            sheet.classList.remove('flipped');
        }
    });
    current = index;
}

// Button Controls
document.getElementById('next').addEventListener('click', () => {
    if (current < sheets.length) {
        updateSheets(current + 1);
    }
});

document.getElementById('prev').addEventListener('click', () => {
    if (current > 0) {
        updateSheets(current - 1);
    }
});

// Jump Links
document.querySelectorAll('.jump').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = parseInt(link.dataset.sheet);
        if (!isNaN(target)) {
            updateSheets(target);
        }
    });
});

// Init
updateSheets(0);