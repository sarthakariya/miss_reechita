// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Get references to key DOM elements
    const mainContent = document.getElementById('main-content');
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const questionText = document.getElementById('questionText');
    const introText = document.getElementById('introText');
    const responseText = document.getElementById('response');
    const teaseResponseText = document.getElementById('teaseResponse');
    const nextPageLink = document.getElementById('nextPageLink');
    const body = document.body;

    // Array of teasing phrases for the "No" button
    const teasyPhrases = [
        "Are you sure about that, sweetie? My heart says otherwise 😉",
        "Didn't you wear your glasses today, Reechita? Or maybe your heart's a little blurry?",
        "Hmm, that 'No' sounds awfully like a 'Yes, please!' to me. Just sayin'...",
        "Is that your final answer? Because I think we both know the real one...",
        "Come on, you can't resist this much charm! Try again. ❤️",
        "Oh, you adorable little tease! Press 'Yes' already, you know you want to."
    ];

    // Function to set the initial position of the 'No' button relative to the 'Yes' button
    function setInitialNoButtonPosition() {
        // Only apply absolute positioning if the screen is wide enough (not mobile)
        if (window.innerWidth > 768) {
            const yesBtnRect = yesBtn.getBoundingClientRect();
            const mainContentRect = mainContent.getBoundingClientRect();

            // Calculate 'No' button's initial desired position relative to mainContent's top-left
            // This places it correctly next to the 'Yes' button
            const initialLeft = (yesBtnRect.right + 40) - mainContentRect.left; // 40px gap
            const initialTop = yesBtnRect.top - mainContentRect.top;

            noBtn.style.position = 'absolute';
            noBtn.style.left = `${initialLeft}px`;
            noBtn.style.top = `${initialTop}px`;
            noBtn.style.transform = 'translate(-50%, -50%) scale(0.9)'; // Keep its original scale
            noBtn.classList.add('moved'); // Add 'moved' class to enable transitions
        } else {
            // On smaller screens, revert to static positioning (controlled by flexbox in CSS)
            noBtn.style.position = 'static';
            noBtn.style.transform = 'none';
            noBtn.style.left = 'unset';
            noBtn.style.top = 'unset';
            noBtn.classList.remove('moved');
        }
    }

    // Set initial position on load and recalculate on window resize
    window.addEventListener('load', setInitialNoButtonPosition);
    window.addEventListener('resize', setInitialNoButtonPosition); // Recalculate on resize

    // Add background particles for ambiance
    for (let i = 0; i < 30; i++) {
        createParticle();
    }

    // Function to create and manage a single snowflake element
    function createSnowflake() {
        const flake = document.createElement('div');
        flake.classList.add('snowflake');
        flake.style.left = `${Math.random() * 100}vw`; // Random horizontal position across viewport
        flake.style.animationDelay = `${Math.random() * 10}s`; // Stagger animation start
        flake.style.opacity = Math.random(); // Random opacity
        flake.style.animationDuration = `${Math.random() * 8 + 6}s`; // Vary fall speed
        flake.style.width = `${Math.random() * 4 + 2}px`; // Vary snowflake size
        flake.style.height = flake.style.width;
        body.appendChild(flake);

        // Remove snowflake after it falls to keep DOM clean
        setTimeout(() => {
            flake.remove();
        }, parseFloat(flake.style.animationDuration) * 1000);
    }

    // Generate snowflakes continuously
    setInterval(createSnowflake, 300);

    // Function to handle "No" button movement
    function moveNoButton() {
        if (window.innerWidth <= 768) {
            // Do not move 'No' button on smaller screens
            return;
        }
        const mainContentRect = mainContent.getBoundingClientRect();
        const noBtnRect = noBtn.getBoundingClientRect();
        const padding = 20;

        const maxX = mainContentRect.width - noBtnRect.width - padding;
        const maxY = mainContentRect.height - noBtnRect.height - padding;

        let targetX = Math.random() * (maxX - padding) + padding;
        let targetY = Math.random() * (maxY - padding) + padding;

        noBtn.style.left = `${targetX}px`;
        noBtn.style.top = `${targetY}px`;
        noBtn.style.transform = `scale(0.9) rotate(${Math.random() * 20 - 10}deg)`; // Add subtle rotation
    }

    // Function to display a random teasing text
    function displayTeasyText() {
        const randomIndex = Math.floor(Math.random() * teasyPhrases.length);
        teaseResponseText.textContent = teasyPhrases[randomIndex];
        teaseResponseText.style.opacity = 1;

        setTimeout(() => {
            teaseResponseText.style.opacity = 0;
        }, 3000);
    }

    // --- "No" button logic ---
    noBtn.addEventListener('mouseover', () => {
        moveNoButton(); // Jumps on hover
    });
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.innerWidth > 768) { // Only shake and move on larger screens
            noBtn.style.animation = 'shake 0.3s ease';
            setTimeout(() => {
                noBtn.style.animation = '';
                moveNoButton();
                displayTeasyText();
            }, 300);
        } else {
            // On mobile, just display tease text without moving the button
            displayTeasyText();
        }
    });

    // --- "Yes" button logic ---
    yesBtn.addEventListener('click', () => {
        // Fade out question text, intro text, and yes button
        questionText.style.animation = 'fadeOutDisappear 0.8s ease-in forwards';
        introText.style.animation = 'fadeOutDisappear 0.8s ease-in forwards';
        yesBtn.style.animation = 'bounceOut 0.8s ease-in forwards';
        teaseResponseText.style.animation = 'fadeOutDisappear 0.8s ease-in forwards';

        // Keep 'No' button visible but move it slightly
        noBtn.style.animation = 'none';
        noBtn.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        noBtn.style.transform = 'translateY(150px) scale(0.7)'; // Move it down and shrink a bit
        noBtn.style.opacity = 0.6;
        noBtn.style.pointerEvents = 'none'; // Disable clicks on 'No' button

        setTimeout(() => {
            // Hide elements completely after animation
            questionText.style.display = 'none';
            introText.style.display = 'none';
            yesBtn.style.display = 'none';
            teaseResponseText.style.display = 'none';

            // Update the response text and apply animations
            responseText.innerHTML = "My sweet Reechita, every moment with you ignites a fire in my soul. Thank you for being the incredible girl you are. Now, about making this *officially* web-official... let's just say clicking 'yes' means I get to unleash all sorts of delightful naughtiness on you later. 😉 I love you! ❤️";
            responseText.style.animation = 'fadeInSlideUp 2s ease-out forwards, textJiggle 0.5s ease-in-out infinite alternate, scaleResponse 4s infinite alternate';
            responseText.style.textShadow = '2px 2px var(--response-outline-color), -2px -2px var(--response-outline-color), 2px -2px var(--response-outline-color), -2px 2px var(--response-outline-color), 0 0 10px rgba(0, 0, 0, 0.5)';
            
            // Show the "Next Page" link
            nextPageLink.style.display = 'inline-block';
            // Animation for the link is already defined in CSS

            // Create floating hearts animation
            for (let i = 0; i < 40; i++) {
                createFloatingHeart();
            }
        }, 800);
    });

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

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        body.appendChild(particle);

        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
        particle.style.animationDelay = `-${Math.random() * 10}s`;
    }
});
