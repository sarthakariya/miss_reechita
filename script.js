document.addEventListener('DOMContentLoaded', () => {
    const beginJourneyBtn = document.getElementById('beginJourneyBtn');
    const confessionBtn = document.getElementById('confessionBtn');
    const confessionYesBtn = document.getElementById('confessionYesBtn');
    const confessionNoBtn = document.getElementById('confessionNoBtn');

    // Function to handle fade out and navigation
    const navigateTo = (targetUrl) => {
        const currentContainer = document.querySelector('.container.active');
        if (currentContainer) {
            currentContainer.classList.remove('fade-in-up'); // Remove fade-in for smooth transition
            currentContainer.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            currentContainer.style.opacity = 0;
            currentContainer.style.transform = 'translateY(-20px)'; // Animate upwards on exit
        }
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 500); // Wait for the fade-out animation to complete
    };

    // Navigation for index.html (Page 1)
    if (beginJourneyBtn) {
        beginJourneyBtn.addEventListener('click', () => {
            navigateTo('page2.html');
        });
    }

    // Navigation for page2.html (Page 2)
    if (confessionBtn) {
        confessionBtn.addEventListener('click', () => {
            navigateTo('page3.html');
        });
    }

    // Navigation for page3.html (Page 3)
    if (confessionYesBtn) {
        confessionYesBtn.addEventListener('click', () => {
            navigateTo('page_yes_response.html');
        });
    }

    // "No" button functionality for page3.html
    if (confessionNoBtn) {
        const makeButtonUnclickable = (button) => {
            if (!button) return;

            button.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default button action
                button.classList.add('floating'); // Add class for CSS animation

                // Randomly move the button within a reasonable range
                const moveButton = () => {
                    const parentContainer = button.closest('.container');
                    if (!parentContainer) return;

                    const containerRect = parentContainer.getBoundingClientRect();
                    const buttonRect = button.getBoundingClientRect();

                    // Calculate new position relative to the document, then adjust for parent container
                    let newX = Math.random() * (window.innerWidth - buttonRect.width);
                    let newY = Math.random() * (window.innerHeight - buttonRect.height);

                    // Ensure it stays roughly within the container's visual area or not too far off-screen
                    newX = Math.max(containerRect.left, Math.min(newX, containerRect.right - buttonRect.width));
                    newY = Math.max(containerRect.top, Math.min(newY, containerRect.bottom - buttonRect.height));

                    button.style.position = 'fixed'; // Use fixed to move relative to viewport
                    button.style.left = `${newX}px`;
                    button.style.top = `${newY}px`;
                    button.style.transition = 'all 0.3s ease-out'; // Smooth transition for movement
                };

                moveButton(); // Initial random move
                
                // Keep moving it slightly on subsequent clicks or mouseover
                button.addEventListener('mouseover', moveButton);
                button.addEventListener('click', moveButton); // Re-trigger movement on click
            });
        };

        makeButtonUnclickable(confessionNoBtn);
    }
});
