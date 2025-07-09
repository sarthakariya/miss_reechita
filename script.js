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
    const questionElement = document.getElementById('question');
    const body = document.body;

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
        introContainer.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        introContainer.style.opacity = '1';
        introContainer.style.transform = 'translateY(0)';
    }, 100);

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
                mainContent.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
            }, 50);
        }, { once: true });

        // Create initial floating hearts for immersive feel
        setTimeout(() => {
            for (let i = 0; i < 40; i++) {
                createFloatingHeart();
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
                responseContent.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
                responseContent.style.opacity = '1';
                responseContent.style.transform = 'translateY(0)';
            }, 50);
        }, { once: true });
    });

    // Enhanced No button movement logic
    let moveCount = 0;
    const maxMoves = 15; // Increased limit for more evasion

    // Set initial position of No button relative to the container
    function setNoButtonInitialPosition() {
        if (window.innerWidth > 768) { // Only apply complex positioning on larger screens
            const buttonsContainer = mainContent.querySelector('.buttons-container');
            if (!buttonsContainer) return;

            const yesBtnRect = yesBtn.getBoundingClientRect();
            const containerRect = buttonsContainer.getBoundingClientRect();

            // Position No button to the right of Yes button, relative to buttonsContainer
            noBtn.style.position = 'absolute';
            noBtn.style.left = `${yesBtnRect.right - containerRect.left + 80}px`; // 80px gap
            noBtn.style.top = `${yesBtnRect.top - containerRect.top}px`;
            noBtn.style.transform = 'translateY(0)'; // Reset transform for initial setup
        } else {
            // On smaller screens, revert to static positioning (flexbox handles layout)
            noBtn.style.position = 'static';
            noBtn.style.transform = 'none';
            noBtn.style.left = 'unset';
            noBtn.style.top = 'unset';
        }
        moveCount = 0; // Reset move count whenever position is re-initialized
    }

    // Call on load and resize
    window.addEventListener('load', setNoButtonInitialPosition);
    window.addEventListener('resize', setNoButtonInitialPosition);

    noBtn.addEventListener('mouseover', handleNoButtonInteraction);
    noBtn.addEventListener('click', handleNoButtonInteraction);

    function handleNoButtonInteraction(event) {
        // Only move if not on small screens
        if (window.innerWidth <= 768) {
            console.log("No button is static on small screens.");
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
            console.log("No button is now static.");
            return;
        }

        const buttonsContainer = mainContent.querySelector('.buttons-container');
        if (!buttonsContainer) return;

        const containerRect = buttonsContainer.getBoundingClientRect();
        const buttonRect = noBtn.getBoundingClientRect();

        let newX, newY;
        let attempts = 0;
        const padding = 20;

        // Calculate a valid random position within the container
        do {
            newX = Math.random() * (containerRect.width - buttonRect.width - padding * 2) + padding;
            newY = Math.random() * (containerRect.height - buttonRect.height - padding * 2) + padding;
            attempts++;
            if (attempts > 50) { // Safety break
                console.warn("Could not find a valid new position for No button within container.");
                break;
            }
        } while (
            newX < 0 || newX + buttonRect.width > containerRect.width ||
            newY < 0 || newY + buttonRect.height > containerRect.height ||
            (Math.abs(newX - (yesBtn.offsetLeft + yesBtn.offsetWidth / 2)) < 150 && Math.abs(newY - (yesBtn.offsetTop + yesBtn.offsetHeight / 2)) < 150) // Avoid overlapping Yes button
        );

        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;

        noBtn.classList.add('float-animation');
        moveCount++;
        console.log(`No button moved. Move count: ${moveCount}`);

        setTimeout(() => {
            noBtn.classList.remove('float-animation');
        }, 800); // Duration matches float-animation in CSS
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
        setNoButtonInitialPosition(); // Reset to calculated initial position
        noBtn.removeEventListener('mouseover', handleNoButtonInteraction);
        noBtn.removeEventListener('click', handleNoButtonInteraction);
        noBtn.addEventListener('mouseover', handleNoButtonInteraction);
        noBtn.addEventListener('click', handleNoButtonInteraction);
        noBtn.style.cursor = 'pointer'; // Restore default cursor
        moveCount = 0; // Reset move counter
    };
});
