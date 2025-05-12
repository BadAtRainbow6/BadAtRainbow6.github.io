// Contact form handling and validation
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formGroups = document.querySelectorAll('.form-group');

    // Setup form validation and submission
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form inputs
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            // Validate form
            let isValid = true;

            // Reset previous validation states
            resetValidationStates();

            // Validate name
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Please enter your name');
                isValid = false;
            } else {
                showSuccess(nameInput);
            }

            // Validate email
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            } else {
                showSuccess(emailInput);
            }

            // Validate message
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Please enter your message');
                isValid = false;
            } else {
                showSuccess(messageInput);
            }

            // If form is valid, submit
            if (isValid) {
                // In a real application, this would send data to a server
                // For now, we'll just simulate a successful submission
                simulateFormSubmission();
            }
        });
    }

    // Helper functions
    function resetValidationStates() {
        // Remove any existing validation messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(message => message.remove());

        // Reset input styles
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.style.borderColor = '#ddd';
        });
    }

    function showError(input, message) {
        // Add red border to input
        input.style.borderColor = '#e74c3c';

        // Create and add error message
        const formGroup = input.parentElement;
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        errorMessage.style.color = '#e74c3c';
        errorMessage.style.fontSize = '12px';
        errorMessage.style.marginTop = '5px';
        formGroup.appendChild(errorMessage);

        // Shake effect for visual feedback
        input.classList.add('shake-effect');
        setTimeout(() => {
            input.classList.remove('shake-effect');
        }, 500);
    }

    function showSuccess(input) {
        // Add green border for visual confirmation
        input.style.borderColor = '#2ecc71';
    }

    function isValidEmail(email) {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function simulateFormSubmission() {
        // Disable form
        const submitButton = contactForm.querySelector('.submit-btn');
        const originalButtonText = submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Add spinner to button
        const spinner = document.createElement('span');
        spinner.className = 'spinner';
        spinner.style.display = 'inline-block';
        spinner.style.width = '12px';
        spinner.style.height = '12px';
        spinner.style.border = '2px solid #fff';
        spinner.style.borderBottomColor = 'transparent';
        spinner.style.borderRadius = '50%';
        spinner.style.animation = 'spin 1s linear infinite';
        spinner.style.marginLeft = '10px';
        submitButton.appendChild(spinner);

        // Add spinner animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                20%, 60% { transform: translateX(-5px); }
                40%, 80% { transform: translateX(5px); }
            }
            .shake-effect {
                animation: shake 0.5s;
            }
        `;
        document.head.appendChild(style);

        // Simulate server request delay
        setTimeout(() => {
            // Remove spinner
            spinner.remove();

            // Show success message
            contactForm.innerHTML = `
                <div class="success-message">
                    <h3 style="color: #2ecc71;">Message Sent Successfully!</h3>
                    <p>Thank you for reaching out. I'll get back to you soon.</p>
                    <div class="checkmark" style="
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: #2ecc71;
                        margin: 20px auto;
                        animation: scale-up 0.5s;
                    ">
                        <div style="
                            width: 20px;
                            height: 10px;
                            border-bottom: 3px solid white;
                            border-left: 3px solid white;
                            transform: rotate(-45deg);
                            margin-top: -3px;
                        "></div>
                    </div>
                </div>
            `;

            // Add animation for success message
            const successStyle = document.createElement('style');
            successStyle.textContent = `
                @keyframes scale-up {
                    0% { transform: scale(0); }
                    70% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
                .success-message {
                    text-align: center;
                    padding: 20px;
                    animation: fade-in 0.5s;
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
            document.head.appendChild(successStyle);
        }, 2000);
    }

    // Add input transition effects
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');

        if (input && label) {
            // Style for focus effect
            input.style.transition = 'border-color 0.3s ease';
            label.style.transition = 'color 0.3s ease';

            input.addEventListener('focus', () => {
                label.style.color = 'var(--button-hover)';
            });

            input.addEventListener('blur', () => {
                label.style.color = 'var(--accent-color)';
            });
        }
    });

    // Add social links hover animations
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.style.position = 'relative';
        link.style.paddingBottom = '2px';

        // Create underline element
        const underline = document.createElement('span');
        underline.style.position = 'absolute';
        underline.style.bottom = '0';
        underline.style.left = '0';
        underline.style.width = '0';
        underline.style.height = '2px';
        underline.style.backgroundColor = 'var(--button-hover)';
        underline.style.transition = 'width 0.3s ease';
        link.appendChild(underline);

        // Animate underline on hover
        link.addEventListener('mouseenter', () => {
            underline.style.width = '100%';
        });

        link.addEventListener('mouseleave', () => {
            underline.style.width = '0';
        });
    });
});