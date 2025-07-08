document.addEventListener('DOMContentLoaded', () => {
    const page3MainInteraction = document.getElementById('page3-main-interaction');
    const noBtn3 = document.getElementById('noBtn3');
    const yesBtn3 = document.getElementById('yesBtn3');
    const teaseResponse3 = document.getElementById('teaseResponse3');
    const finalResponse3 = document.getElementById('finalResponse3');
    const questionSection = document.getElementById('the-question-section');

    // Array of teasing phrases for the "No" button on page 3
    const page3TeasyPhrases = [
        "Aww, come on, Reechita! My heart can't take that 'No'! 😉",
        "Really? Are you absolutely, positively, 100% sure? Think about it! ❤️",
        "My love, that button is broken, I think. Try 'YES' instead! 😉",
        "Uh oh, I think you pressed the wrong button! Let's try again...",
        "Don't play coy, my sweetheart! You know what I'm hoping for!",
        "My Mammam always told me 'No' means 'Ask again later'. So... later?",
        "Are you teasing me? Because it's working! But seriously, 'Yes'?",
        "My heart just skipped a beat... and it's asking you to reconsider! ❤️",
        "Is this a trick? Because I'm falling for you even harder with every 'No'!",
        "Come closer to the 'Yes' button, it misses you!"
    ];

    // --- Sound Effects (Optional, requires audio files) ---
    // You'd need to add actual audio files (e.g., .mp3, .wav) to your repo
    // and replace 'path/to/no-sound.mp3' and 'path/to/yes-sound.mp3'
    const noSound = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); // Placeholder, replace with actual
    noSound.volume = 0.5;
    const yesSound = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'); // Placeholder, replace with actual
    yesSound.volume = 0.7;


    // Function to set initial position of 'No' button relative to 'questionSection'
    function setInitialNoButtonPosition3() {
        if (window.innerWidth > 768) { // Only apply on larger screens
            const yesBtnRect = yesBtn3.getBoundingClientRect();
            const questionSectionRect = questionSection.getBoundingClientRect();

            const initialLeft = (yesBtnRect.right + 60) - questionSectionRect.left; // 60px gap
            const initialTop = yesBtnRect.top - questionSectionRect.top + (yesBtnRect.height / 2); // Center vertically with yes button
            
            noBtn3.style.position = 'absolute';
            noBtn3.style.left = `${initialLeft}px`;
            noBtn3.style.top = `${initialTop}px`;
            noBtn3.style.transform = 'translate(-50%, -50%) scale(0.9)'; // Center and scale
            noBtn3.classList.add('moved'); // Add 'moved' class to enable transitions
        } else {
            // On smaller screens, revert to static positioning
            noBtn3.style.position = 'relative'; // Change from absolute for better flow
            noBtn3.style.transform = 'none';
            noBtn3.style.left = 'unset';
            noBtn3.style.top = 'unset';
            noBtn3.classList.remove('moved');
        }
    }

    // Set initial position on load and recalculate on window resize
    window.addEventListener('load', setInitialNoButtonPosition3);
    window.addEventListener('resize', setInitialNoButtonPosition3);


    // Function to handle "No" button movement
    function moveNoButton3() {
        if (window.innerWidth <= 768) { return; } // Don't move on smaller screens

        const questionSectionRect = questionSection.getBoundingClientRect();
        const noBtnRect = noBtn3.getBoundingClientRect();
        const padding = 20; // Padding from section edges

        // Calculate maximum random positions within the section
        const maxX = questionSectionRect.width - noBtnRect.width - padding;
        const maxY = questionSectionRect.height - noBtnRect.height - padding;

        // Ensure targetX and targetY are always positive
        let targetX = Math.random() * (maxX > 0 ? maxX : 1) + padding;
        let targetY = Math.random() * (maxY > 0 ? maxY : 1) + padding;

        // Adjust for current scroll position to keep it visually within the section
        targetX = targetX; // Relative to parent
        targetY = targetY; // Relative to parent

        noBtn3.style.left = `${targetX}px`;
        noBtn3.style.top = `${targetY}px`;
        noBtn3.style.transform = `scale(0.9) rotate(${Math.random() * 20 - 10}deg)`; // Subtle rotation
        try { noSound.play(); } catch (e) { console.warn("No sound played:", e); } // Play sound
    }

    // Function to display a random teasing text
    function displayTeasyText3() {
        const randomIndex = Math.floor(Math.random() * page3TeasyPhrases.length);
        teaseResponse3.textContent = page3TeasyPhrases[randomIndex];
        teaseResponse3.style.opacity = 1;

        setTimeout(() => {
            teaseResponse3.style.opacity = 0;
        }, 3000);
    }

    // --- "No" button logic ---
    noBtn3.addEventListener('mouseover', () => {
        moveNoButton3(); // Jumps on hover
    });
    noBtn3.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.innerWidth > 768) {
            noBtn3.classList.add('clicked'); // Add class for shake animation
            setTimeout(() => {
                noBtn3.classList.remove('clicked');
                moveNoButton3();
                displayTeasyText3();
            }, 300);
        } else {
            displayTeasyText3(); // On mobile, just display tease text
        }
    });

    // --- "Yes" button logic ---
    yesBtn3.addEventListener('click', () => {
        try { yesSound.play(); } catch (e) { console.warn("Yes sound played:", e); } // Play sound

        // Fade out interaction elements
        page3MainInteraction.style.animation = 'fadeOutDisappear 0.8s ease-in forwards';
        teaseResponse3.style.animation = 'fadeOutDisappear 0.8s ease-in forwards';

        // Disable 'No' button completely
        noBtn3.style.display = 'none';
        noBtn3.style.pointerEvents = 'none';

        setTimeout(() => {
            // Hide elements completely after animation
            page3MainInteraction.style.display = 'none';
            teaseResponse3.style.display = 'none';

            // Update the final response text and apply animations
            finalResponse3.innerHTML = "YES!!! My heart is absolutely bursting! This is the start of something truly amazing, Reechita. Thank you for making me the happiest guy in the world! ❤️ I love you so much!";
            finalResponse3.style.animation = 'fadeInSlideUp 2s ease-out forwards, pulseText 3s ease-in-out infinite alternate';
            finalResponse3.style.opacity = 1;
            finalResponse3.style.transform = 'translateY(0) scale(1)';

            // Trigger grand celebration animations
            createConfetti(100); // 100 confetti particles
            createCelebrationHearts(50); // 50 hearts
            // You can add more animations here!
            // E.g., make the entire body background sparkle or pulse
            document.body.style.animation = 'gradientShift 5s ease-in-out infinite alternate, backgroundPulse 2s infinite alternate';

        }, 800);
    });

    // --- Helper functions for celebration animations ---

    // Confetti animation
    function createConfetti(count) {
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.top = `${Math.random() * -200}px`; // Start above screen
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 70%)`; // Random color
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            confetti.style.animationDuration = `${Math.random() * 2 + 2}s`; // Vary speed
            confetti.style.width = `${Math.random() * 8 + 4}px`;
            confetti.style.height = confetti.style.width;
            questionSection.appendChild(confetti); // Append to section for containment

            // Remove confetti after animation to keep DOM clean
            setTimeout(() => confetti.remove(), parseFloat(confetti.style.animationDuration) * 1000 + parseFloat(confetti.style.animationDelay) * 1000 + 100);
        }
    }

    // Floating heart for celebration
    function createCelebrationHearts(count) {
        for (let i = 0; i < count; i++) {
            const heart = document.createElement('div');
            heart.classList.add('celebration-heart');
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.bottom = `-50px`; // Start from below the viewport
            heart.style.animationDuration = `${Math.random() * 5 + 5}s`;
            heart.style.animationDelay = `-${Math.random() * 5}s`; // Stagger
            heart.style.opacity = 0; // Fade in during animation
            heart.style.width = `${Math.random() * 40 + 20}px`;
            heart.style.height = heart.style.width;
            questionSection.appendChild(heart); // Append to section for containment

            // Remove heart after animation
            setTimeout(() => heart.remove(), parseFloat(heart.style.animationDuration) * 1000 + parseFloat(heart.style.animationDelay) * 1000 + 100);
        }
    }
});
