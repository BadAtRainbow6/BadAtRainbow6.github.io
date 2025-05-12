// Enhanced page content transition functionality
document.addEventListener('DOMContentLoaded', () => {
    const book = document.querySelector('.book');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const pageIndicator = document.getElementById('pageIndicator');

    // Define pages with both ID and page number
    const pages = [
        { id: 'coverPage', number: 1, title: 'Cover' },
        { id: 'introPage', number: 2, title: 'About Me' },
        { id: 'projectsPage', number: 3, title: 'Projects' },
        { id: 'skillsPage', number: 4, title: 'Skills' },
        { id: 'contactPage', number: 5, title: 'Contact' },
        { id: 'page-back', number: 6, title: 'Thank You' } // The thank you page
    ];

    let currentPageIndex = 0;
    updatePageIndicator();
    setPageNumbers();

    // Add page numbers to book pages
    function setPageNumbers() {
        pages.forEach((page, index) => {
            // Handle the last page differently as it has a different class
            const pageElement = (page.id === 'page-back')
                ? document.querySelector('.page-back')
                : document.getElementById(page.id);

            // Add data-page attribute for the ::after content
            if (pageElement) {
                pageElement.setAttribute('data-page', page.number);
            }
        });
    }

    // Page turning effect with sound and content transition
    function turnPage(direction) {
        const oldIndex = currentPageIndex;
        let newIndex = currentPageIndex;

        if (direction === 'next' && currentPageIndex < pages.length - 1) {
            newIndex = currentPageIndex + 1;
            playPageTurnSound();

            // Add page turning animation
            const currentPage = document.getElementById(pages[oldIndex].id) ||
                document.querySelector(`.${pages[oldIndex].id}`);

            if (currentPage) {
                currentPage.classList.add('turning-forward');

                // Use setTimeout to sequence the animations and content visibility
                setTimeout(() => {
                    currentPageIndex = newIndex;
                    updatePageVisibility();
                    currentPage.classList.remove('turning-forward');
                    updatePageIndicator();

                    // Highlight current page content with a fade-in effect
                    highlightCurrentPageContent();
                }, 400);
            }

        } else if (direction === 'prev' && currentPageIndex > 0) {
            newIndex = currentPageIndex - 1;
            playPageTurnSound();

            // Add page turning animation
            const nextPage = document.getElementById(pages[newIndex].id) ||
                document.querySelector(`.${pages[newIndex].id}`);

            if (nextPage) {
                nextPage.classList.add('turning-backward');

                // Use setTimeout to sequence the animations and content visibility
                setTimeout(() => {
                    currentPageIndex = newIndex;
                    updatePageVisibility();
                    nextPage.classList.remove('turning-backward');
                    updatePageIndicator();

                    // Highlight current page content with a fade-in effect
                    highlightCurrentPageContent();
                }, 400);
            }
        }
    }

    function updatePageVisibility() {
        pages.forEach((page, index) => {
            // Handle the special case for the last page
            const pageElement = (page.id === 'page-back')
                ? document.querySelector('.page-back')
                : document.getElementById(page.id);

            if (pageElement) {
                if (index <= currentPageIndex) {
                    pageElement.style.transform = 'rotateY(0deg)';
                } else {
                    pageElement.style.transform = 'rotateY(180deg)';
                }
            }
        });
    }

    function updatePageIndicator() {
        // Update page number display
        pageIndicator.textContent = `${pages[currentPageIndex].number}/${pages.length}`;

        // Update page indicator with page title
        pageIndicator.setAttribute('title', pages[currentPageIndex].title);

        // Disable/enable navigation buttons as needed
        prevBtn.disabled = currentPageIndex === 0;
        nextBtn.disabled = currentPageIndex === pages.length - 1;

        // Visual feedback for disabled buttons
        if (prevBtn.disabled) {
            prevBtn.classList.add('btn-disabled');
        } else {
            prevBtn.classList.remove('btn-disabled');
        }

        if (nextBtn.disabled) {
            nextBtn.classList.add('btn-disabled');
        } else {
            nextBtn.classList.remove('btn-disabled');
        }
    }

    // Highlight the current page content with animation
    function highlightCurrentPageContent() {
        // Get the current page element
        const currentPage = (pages[currentPageIndex].id === 'page-back')
            ? document.querySelector('.page-back')
            : document.getElementById(pages[currentPageIndex].id);

        if (currentPage) {
            const content = currentPage.querySelector('.page-content');
            if (content) {
                // Apply a subtle animation to the content
                content.style.animation = 'none';
                setTimeout(() => {
                    content.style.animation = 'fadeIn 0.5s ease-in-out';
                }, 10);
            }
        }
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

    // Enhanced book tilt effect based on mouse position
    document.addEventListener('mousemove', (e) => {
        const bookContainer = document.querySelector('.book-container');
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        // Make tilt effect more subtle and realistic
        bookContainer.style.transform = `translate(-50%, -40%) rotateX(${5 - mouseY * 5}deg) rotateY(${-5 + mouseX * 5}deg)`;

        // Add subtle shadow movement
        const shadow = bookContainer.querySelector('.book');
        if (shadow) {
            shadow.style.boxShadow = `${20 + mouseX * 10}px ${30 - mouseY * 10}px 60px var(--book-shadow)`;
        }
    });

    // Book hover effect
    book.addEventListener('mouseenter', () => {
        book.style.transform = 'scale(1.02)';
    });

    book.addEventListener('mouseleave', () => {
        book.style.transform = 'scale(1)';
    });

    // Add animation for page content
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .btn-disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
        </style>
    `);

    // Initialize the pages
    updatePageVisibility();
    highlightCurrentPageContent();
});