// Book page flip functionality
document.addEventListener('DOMContentLoaded', () => {
    const book = document.querySelector('.book');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const pageIndicator = document.getElementById('pageIndicator');

    const pages = [
        'coverPage',
        'introPage',
        'projectsPage',
        'skillsPage',
        'contactPage',
        'page-back' // The thank you page
    ];

    let currentPageIndex = 0;
    updatePageIndicator();

    // Page turning effect with sound
    function turnPage(direction) {
        const oldIndex = currentPageIndex;

        if (direction === 'next' && currentPageIndex < pages.length - 1) {
            currentPageIndex++;
            playPageTurnSound();

            // Add page turning animation
            const currentPage = document.getElementById(pages[oldIndex]);
            currentPage.classList.add('turning-forward');

            setTimeout(() => {
                updatePageVisibility();
                currentPage.classList.remove('turning-forward');
                updatePageIndicator();
            }, 400);

        } else if (direction === 'prev' && currentPageIndex > 0) {
            currentPageIndex--;
            playPageTurnSound();

            // Add page turning animation
            const nextPage = document.getElementById(pages[currentPageIndex]);
            nextPage.classList.add('turning-backward');

            setTimeout(() => {
                updatePageVisibility();
                nextPage.classList.remove('turning-backward');
                updatePageIndicator();
            }, 400);
        }
    }

    function updatePageVisibility() {
        pages.forEach((pageId, index) => {
            // Handle the last page differently as it has a different class
            const page = (pageId === 'page-back')
                ? document.querySelector('.page-back')
                : document.getElementById(pageId);

            if (index <= currentPageIndex) {
                page.style.transform = 'rotateY(0deg)';
            } else {
                page.style.transform = 'rotateY(180deg)';
            }
        });
    }

    function updatePageIndicator() {
        pageIndicator.textContent = `${currentPageIndex + 1}/${pages.length}`;
    }

    function playPageTurnSound() {
        // Create page turn sound effect
        const audio = new Audio();
        audio.src = 'about:blank'; // Would be replaced with actual sound file
        audio.volume = 0.5;

        // Since we don't have actual sound files, we'll just simulate the sound effect
        console.log('Page turn sound effect would play here');
    }

    // Book interaction events
    nextBtn.addEventListener('click', () => turnPage('next'));
    prevBtn.addEventListener('click', () => turnPage('prev'));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            turnPage('next');
        } else if (e.key === 'ArrowLeft') {
            turnPage('prev');
        }
    });

    // Book tilt effect based on mouse position
    document.addEventListener('mousemove', (e) => {
        const bookContainer = document.querySelector('.book-container');
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        bookContainer.style.transform = `translate(-50%, -50%) rotateX(${20 - mouseY * 10}deg) rotateY(${-10 + mouseX * 10}deg)`;
    });

    // Book hover effect
    book.addEventListener('mouseenter', () => {
        book.style.transform = 'scale(1.05)';
    });

    book.addEventListener('mouseleave', () => {
        book.style.transform = 'scale(1)';
    });
});