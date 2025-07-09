document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const confessionYesBtn = document.getElementById('confessionYesBtn');
    const confessionNoBtn = document.getElementById('confessionNoBtn');
    const body = document.body;

    // Background particle generation for desktop
    if (window.innerWidth > 768) {
        setInterval(() => {
            createParticle();
        }, 300); // Create a new particle every 300ms
    }

    // Function to create a floating heart (from previous context, kept for potential future use)
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

    // Function to create background particles
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        body.appendChild(particle);

        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`; // Start from random top
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`; // Slower fall
        particle.style.animationDelay = `-${Math.random() * 5}s`;
        particle.style.opacity = Math.random();
        particle.style.backgroundColor = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`;
    }

    // "No" button functionality for index.html and page3.html
    const makeButtonUnclickable = (button) => {
        if (!button) return;

        button.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default button action
            button.classList.add('floating'); // Add class for CSS animation

            // Randomly move the button
            const moveButton = () => {
                const x = Math.random() * (window.innerWidth - button.offsetWidth);
                const y = Math.random() * (window.innerHeight - button.offsetHeight);
                button.style.position = 'absolute';
                button.style.left = `${x}px`;
                button.style.top = `${y}px`;
                button.style.transition = 'all 0.3s ease-out'; // Smooth transition for movement
            };

            moveButton(); // Initial random move
            
            // Keep moving it slightly on subsequent clicks or mouseover if desired
            button.addEventListener('mouseover', moveButton);
            button.addEventListener('click', moveButton); // Re-trigger movement on click
        });
    };

    makeButtonUnclickable(noBtn);
    makeButtonUnclickable(confessionNoBtn);

    // Navigation for "Yes" buttons
    if (yesBtn) {
        yesBtn.addEventListener('click', () => {
            window.location.href = 'page2.html';
        });
    }

    if (confessionYesBtn) {
        confessionYesBtn.addEventListener('click', () => {
            window.location.href = 'page_yes_response.html';
        });
    }
});
