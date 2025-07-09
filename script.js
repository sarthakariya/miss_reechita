document.addEventListener('DOMContentLoaded', () => {
    const startJourneyBtn = document.getElementById('startJourneyBtn');
    const introContainer = document.getElementById('intro-container');
    const mainContent = document.getElementById('main-content');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const responseContent = document.getElementById('response-content');
    const happyGif = document.getElementById('happyGif');
    const questionElement = document.getElementById('question');
    const body = document.body;

    // Initial fade-in for the intro container
    introContainer.style.opacity = '0';
    introContainer.style.transform = 'translateY(20px)';
    setTimeout(() => {
        introContainer.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        introContainer.style.opacity = '1';
        introContainer.style.transform = 'translateY(0)';
    }, 100);

    startJourneyBtn.addEventListener('click', () => {
        introContainer.classList.add('hidden');
        mainContent.classList.remove('hidden');
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(20px)';
        setTimeout(() => {
            mainContent.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }, 50);

        // Optional: Trigger background particles/hearts for initial immersion
        setTimeout(() => {
            for (let i = 0; i < 40; i++) {
                createFloatingHeart();
            }
        }, 800);
    });

    yesBtn.addEventListener('click', () => {
        mainContent.classList.add('hidden');
        responseContent.classList.remove('hidden');
        happyGif.classList.remove('hidden'); // Show the happy GIF
        responseContent.style.opacity = '0';
        responseContent.style.transform = 'translateY(20px)';
        setTimeout(() => {
            responseContent.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            responseContent.style.opacity = '1';
            responseContent.style.transform = 'translateY(0)';
        }, 50);
    });

    // Enhanced No button movement logic
    let moveCount = 0;
    const maxMoves = 10; // Limit how many times it tries to evade before becoming static

    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('click', moveNoButton); // Also move on click to prevent accidental click

    function moveNoButton(event) {
        if (moveCount >= maxMoves) {
            // After max moves, make it less evasive or stop
            noBtn.style.position = 'static'; // Or revert to original position
            noBtn.style.transform = 'none';
            noBtn.classList.remove('float-animation');
            noBtn.removeEventListener('mouseover', moveNoButton);
            noBtn.removeEventListener('click', moveNoButton);
            console.log("No button is now static.");
            return;
        }

        const container = mainContent.querySelector('.buttons-container');
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const buttonRect = noBtn.getBoundingClientRect();

        let newX, newY;
        let attempts = 0;
        const padding = 20; // Keep button away from container edges

        // Try to find a new position that is inside the container
        do {
            newX = Math.random() * (containerRect.width - buttonRect.width - padding * 2) + padding;
            newY = Math.random() * (containerRect.height - buttonRect.height - padding * 2) + padding;
            attempts++;
            if (attempts > 50) { // Prevent infinite loop if container is too small
                console.warn("Could not find a valid new position for No button within container.");
                break;
            }
        } while (
            newX < 0 || newX + buttonRect.width > containerRect.width ||
            newY < 0 || newY + buttonRect.height > containerRect.height
        );

        // Apply relative positioning to the button
        noBtn.style.position = 'absolute'; // Ensure absolute positioning relative to its parent .buttons-container
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;

        // Add a floating animation class for visual flair
        noBtn.classList.add('float-animation');
        moveCount++;
        console.log(`No button moved. Move count: ${moveCount}`);

        // Optional: Remove animation class after a short delay to reset for next move
        setTimeout(() => {
            noBtn.classList.remove('float-animation');
        }, 1000); // Duration matches float-animation in CSS
    }

    // --- Helper functions for dynamic animations ---
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        body.appendChild(heart);

        const size = Math.random() * 30 + 20;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.bottom = `-50px`;
        heart.style.animationDuration = `${Math.random() * 4 + 4}s`;
        heart.style.animationDelay = `-${Math.random() * 4}s`;
        heart.style.opacity = 0.8;
    }

    // Function to reset the page to the introduction
    window.resetPage = () => {
        responseContent.classList.add('hidden');
        happyGif.classList.add('hidden');
        introContainer.classList.remove('hidden');
        mainContent.classList.add('hidden');

        // Reset button position and re-enable listeners
        noBtn.style.position = 'static'; // Reset to default flow
        noBtn.style.transform = 'none';
        noBtn.classList.remove('float-animation');
        noBtn.removeEventListener('mouseover', moveNoButton);
        noBtn.removeEventListener('click', moveNoButton); // Remove old listeners
        noBtn.addEventListener('mouseover', moveNoButton); // Re-add listeners
        noBtn.addEventListener('click', moveNoButton);
        moveCount = 0; // Reset move counter
    };
});
