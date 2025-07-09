document.addEventListener('DOMContentLoaded', () => {
    const startJourneyBtn = document.getElementById('startJourneyBtn');
    const introContainer = document.getElementById('intro-container');
    const mainContent = document.getElementById('main-content');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const responseContent = document.getElementById('response-content');
    const happyGif = document.getElementById('happyGif');
    const greetingText = document.getElementById('greetingText');
    const timeGreeting = document.getElementById('timeGreeting');
    const introElaborateText = document.getElementById('introElaborateText');
    const body = document.body;
    const sparkleContainer = document.querySelector('.sparkle-container');
    const floatingHeartsContainer = document.querySelector('.floating-hearts-container');

    // Function to set time-based greeting
    function setTimeGreeting() {
        const date = new Date();
        const hours = date.getHours();
        let greeting = "";

        if (hours < 12) {
            greeting = "Good morning!";
        } else if (hours < 18) {
            greeting = "Good afternoon!";
        } else {
            greeting = "Good evening!";
        }
        timeGreeting.textContent = greeting;
    }

    // Call time-based greeting on load
    setTimeGreeting();

    // Initial fade-in for the intro container
    introContainer.style.opacity = '0';
    introContainer.style.transform = 'translateY(20px)';
    setTimeout(() => {
        introContainer.style.transition = 'opacity 1s cubic-bezier(0.23, 1, 0.32, 1), transform 1s cubic-bezier(0.23, 1, 0.32, 1)';
        introContainer.style.opacity = '1';
        introContainer.style.transform = 'translateY(0)';
    }, 100);

    // Create persistent background sparkles
    for (let i = 0; i < 50; i++) { // More sparkles
        createSparkle();
    }
    // Create persistent floating hearts
    for (let i = 0; i < 15; i++) { // Some background hearts
        createFloatingHeart('background');
    }

    startJourneyBtn.addEventListener('click', () => {
        introContainer.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        introContainer.style.opacity = '0';
        introContainer.style.transform = 'translateY(-20px)';
        introContainer.addEventListener('transitionend', () => {
            introContainer.classList.add('hidden');
            mainContent.classList.remove('hidden');
            mainContent.style.opacity = '0';
            mainContent.style.transform = 'translateY(20px)';
            setTimeout(() => {
                mainContent.style.transition = 'opacity 1s cubic-bezier(0.23, 1, 0.32, 1), transform 1s cubic-bezier(0.23, 1, 0.32, 1)';
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
            }, 50);
        }, { once: true });

        // Optional: Trigger more floating hearts on main content load
        setTimeout(() => {
            for (let i = 0; i < 20; i++) {
                createFloatingHeart('foreground');
            }
        }, 800);
    });

    yesBtn.addEventListener('click', () => {
        mainContent.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(-20px)';
        mainContent.addEventListener('transitionend', () => {
            mainContent.classList.add('hidden');
            responseContent.classList.remove('hidden');
            happyGif.classList.remove('hidden'); // Show the happy GIF
            responseContent.style.opacity = '0';
            responseContent.style.transform = 'translateY(20px)';
            setTimeout(() => {
                responseContent.style.transition = 'opacity 1s cubic-bezier(0.23, 1, 0.32, 1), transform 1s cubic-bezier(0.23, 1, 0.32, 1)';
                responseContent.style.opacity = '1';
                responseContent.style.transform = 'translateY(0)';
            }, 50);
        }, { once: true });
    });

    // Enhanced No button movement logic
    let moveCount = 0;
    const maxMoves = 20; // Increased limit for more evasion

    // Set initial position of No button relative to the container
    function setNoButtonInitialPosition() {
        // Only apply complex positioning on larger screens where there's enough space
        if (window.innerWidth > 768) {
            const buttonsContainer = mainContent.querySelector('.buttons-container');
            if (!buttonsContainer) return;

            // Using offsetLeft/Top relative to its parent for initial positioning
            // Place it to the right of Yes button by default
            noBtn.style.position = 'absolute';
            noBtn.style.left = `${yesBtn.offsetLeft + yesBtn.offsetWidth + 100}px`; // Adjust 100px for gap
            noBtn.style.top = `${yesBtn.offsetTop}px`;
            noBtn.style.transform = 'translateY(0) scale(1)'; // Reset transform for initial setup
        } else {
            // On smaller screens, revert to static positioning (flexbox handles layout)
            noBtn.style.position = 'static';
            noBtn.style.transform = 'none';
            noBtn.style.left = 'unset';
            noBtn.style.top = 'unset';
        }
        moveCount = 0; // Reset move count whenever position is re-initialized
        noBtn.classList.remove('float-animation'); // Ensure no lingering animation class
    }

    // Call on load and resize to maintain responsiveness
    window.addEventListener('load', setNoButtonInitialPosition);
    window.addEventListener('resize', setNoButtonInitialPosition);

    noBtn.addEventListener('mouseover', handleNoButtonInteraction);
    noBtn.addEventListener('click', handleNoButtonInteraction);

    function handleNoButtonInteraction(event) {
        // Only move if not on small screens where it's static
        if (window.innerWidth <= 768) {
            return;
        }

        if (moveCount >= maxMoves) {
            // After max moves, make it static and change cursor
            noBtn.style.position = 'static';
            noBtn.style.transform = 'none';
            noBtn.classList.remove('float-animation');
            noBtn.style.cursor = 'not-allowed'; // Indicate it's no longer interactive
            noBtn.removeEventListener('mouseover', handleNoButtonInteraction);
            noBtn.removeEventListener('click', handleNoButtonInteraction);
            console.log("No button is now static after max moves.");
            return;
        }

        const buttonsContainer = mainContent.querySelector('.buttons-container');
        if (!buttonsContainer) return;

        const containerRect = buttonsContainer.getBoundingClientRect();
        const buttonRect = noBtn.getBoundingClientRect();
        const yesBtnRect = yesBtn.getBoundingClientRect();

        let newX, newY;
        let attempts = 0;
        const padding = 20; // Keep button away from container edges
        const minDistanceToYes = 200; // Minimum distance from Yes button center

        // Calculate a valid random position within the container
        do {
            newX = Math.random() * (containerRect.width - buttonRect.width - padding * 2) + padding;
            newY = Math.random() * (containerRect.height - buttonRect.height - padding * 2) + padding;
            
            // Calculate center of new No button position relative to container
            const newNoCenterX = newX + buttonRect.width / 2;
            const newNoCenterY = newY + buttonRect.height / 2;

            // Calculate center of Yes button relative to container
            const yesCenterX = yesBtn.offsetLeft + yesBtn.offsetWidth / 2;
            const yesCenterY = yesBtn.offsetTop + yesBtn.offsetHeight / 2;

            const distance = Math.sqrt(
                Math.pow(newNoCenterX - yesCenterX, 2) +
                Math.pow(newNoCenterY - yesCenterY, 2)
            );

            attempts++;
            if (attempts > 100) { // Safety break to prevent infinite loops
                console.warn("Could not find a valid new position for No button within container, relaxing constraints.");
                // If too many attempts, just pick a random spot within the container, might be closer to Yes
                newX = Math.random() * (containerRect.width - buttonRect.width);
                newY = Math.random() * (containerRect.height - buttonRect.height);
                break;
            }
        } while (
            newX < 0 || newX + buttonRect.width > containerRect.width ||
            newY < 0 || newY + buttonRect.height > containerRect.height ||
            distance < minDistanceToYes // Ensure it's not too close to the Yes button
        );

        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;

        noBtn.classList.add('float-animation');
        moveCount++;

        setTimeout(() => {
            noBtn.classList.remove('float-animation');
        }, 600); // Duration matches float-animation in CSS
    }

    // --- Helper functions for dynamic animations ---
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkleContainer.appendChild(sparkle);

        const size = Math.random() * 4 + 2;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.left = `${Math.random() * 100}vw`;
        sparkle.style.top = `${Math.random() * 100}vh`;
        sparkle.style.animationDelay = `-${Math.random() * 10}s`; // Stagger animation start
        sparkle.style.animationDuration = `${Math.random() * 5 + 5}s`; // Vary movement speed
        sparkle.style.filter = `blur(${Math.random() * 0.5}px)`; // Soft blur
    }

    function createFloatingHeart(type) { // 'background' or 'foreground'
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '&#10084;&#65039;'; // Red heart emoji

        if (type === 'background') {
            floatingHeartsContainer.appendChild(heart);
            heart.style.fontSize = `${Math.random() * 1.5 + 1}em`;
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.bottom = `${Math.random() * 100}vh`; // Start from anywhere
            heart.style.animationDuration = `${Math.random() * 8 + 10}s`; // Slower
            heart.style.animationDelay = `-${Math.random() * 10}s`; // Stagger
            heart.style.opacity = `${Math.random() * 0.2 + 0.1}`; // Very subtle
            heart.style.filter = `blur(${Math.random() * 1}px)`; // More blur for background
        } else { // foreground
            body.appendChild(heart);
            heart.style.fontSize = `${Math.random() * 2.5 + 1.5}em`;
            heart.style.left = `${event ? event.clientX : Math.random() * window.innerWidth}px`; // Start near click or random
            heart.style.top = `${event ? event.clientY : Math.random() * window.innerHeight}px`;
            heart.style.animationDuration = `${Math.random() * 4 + 4}s`;
            heart.style.animationDelay = `0s`;
            heart.style.opacity = `0.8`;
            heart.style.filter = `blur(0px)`;
        }

        // Remove after animation
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    // Function to reset the page to the introduction
    window.resetPage = () => {
        responseContent.classList.add('hidden');
        happyGif.classList.add('hidden');
        introContainer.classList.remove('hidden');
        mainContent.classList.add('hidden');

        // Reset button position and re-enable listeners
        setNoButtonInitialPosition(); // Reset to calculated initial position
        noBtn.removeEventListener('mouseover', handleNoButtonInteraction);
        noBtn.removeEventListener('click', handleNoButtonInteraction);
        noBtn.addEventListener('mouseover', handleNoButtonInteraction);
        noBtn.addEventListener('click', handleNoButtonInteraction);
        noBtn.style.cursor = 'pointer'; // Restore default cursor
        moveCount = 0; // Reset move counter
    };
});
