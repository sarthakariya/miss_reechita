document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.getElementById('main-container');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const noPrompt = document.getElementById('noPrompt');
    const body = document.body;

    // Fade in main container
    if (mainContainer) {
        mainContainer.style.opacity = 0;
        mainContainer.style.transform = 'translateY(30px) scale(0.95)';
        setTimeout(() => {
            mainContainer.style.transition = 'opacity 1s cubic-bezier(0.23, 1, 0.32, 1), transform 1s cubic-bezier(0.23, 1, 0.32, 1)';
            mainContainer.style.opacity = 1;
            mainContainer.style.transform = 'translateY(0) scale(1)';
        }, 100);
    }

    // Yes button click handler for index.html (leads to page2.html)
    if (yesBtn) {
        yesBtn.addEventListener('click', () => {
            if (mainContainer) {
                mainContainer.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                mainContainer.style.opacity = 0;
                mainContainer.style.transform = 'translateY(-30px) scale(0.95)';
            }
            setTimeout(() => {
                window.location.href = 'page2.html'; // Corrected navigation
            }, 800); // Match animation duration
        });
    }

    // No button functionality for index.html
    let clickCount = 0;
    if (noBtn) {
        noBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default button behavior
            clickCount++;

            if (clickCount === 1) {
                noPrompt.classList.add('show');
                noBtn.classList.add('float-animation');
            } else if (clickCount === 2) {
                noBtn.classList.add('float-animation');
                noPrompt.textContent = 'Please reconsider! &#128532;';
            } else if (clickCount === 3) {
                noBtn.classList.add('float-animation');
                noPrompt.textContent = 'Are you really really sure? &#128557;';
            } else {
                noBtn.classList.remove('float-animation');
                noPrompt.textContent = "I won't give up! &#128522;";
                noPrompt.classList.add('show');

                setTimeout(() => {
                    if (mainContainer) {
                        mainContainer.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                        mainContainer.style.opacity = 0;
                        mainContainer.style.transform = 'translateY(-30px) scale(0.95)';
                    }
                    setTimeout(() => {
                        window.location.href = 'page2.html'; // Still lead to page2.html eventually
                    }, 800);
                }, 2000);
            }

            noBtn.addEventListener('animationend', () => {
                noBtn.classList.remove('float-animation');
            }, { once: true });

            setTimeout(() => {
                if (clickCount === 1) {
                    noPrompt.classList.remove('show');
                }
            }, 3000);
        });
    }

    // --- Dynamic Background Animations ---
    setTimeout(() => {
        for (let i = 0; i < 30; i++) {
            createSparkle();
        }
        for (let i = 0; i < 40; i++) {
            createFloatingHeart();
        }
    }, 800);

    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        body.appendChild(heart);

        const size = Math.random() * 30 + 20;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.bottom = `-50px`;
        heart.style.animationDuration = `${Math.random() * 8 + 8}s`;
        heart.style.animationDelay = `-${Math.random() * 8}s`;
        heart.style.opacity = Math.random() * 0.5 + 0.3;

        heart.addEventListener('animationiteration', () => {
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.animationDuration = `${Math.random() * 8 + 8}s`;
            heart.style.opacity = Math.random() * 0.5 + 0.3;
        });
    }

    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        body.appendChild(sparkle);

        const size = Math.random() * 3 + 1;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.left = `${Math.random() * 100}vw`;
        sparkle.style.top = `${Math.random() * 100}vh`;
        sparkle.style.animationDuration = `${Math.random() * 2 + 1}s`;
        sparkle.style.animationDelay = `-${Math.random() * 2}s`;
        sparkle.style.opacity = 0;

        sparkle.addEventListener('animationiteration', () => {
            sparkle.style.left = `${Math.random() * 100}vw`;
            sparkle.style.top = `${Math.random() * 100}vh`;
            sparkle.style.animationDuration = `${Math.random() * 2 + 1}s`;
            sparkle.style.animationDelay = `-${Math.random() * 2}s`;
        });
    }

    // --- Page 3 specific logic (Confession acceptance) ---
    const confessionYesBtn = document.getElementById('confessionYesBtn');
    const confessionNoBtn = document.getElementById('confessionNoBtn');
    const confessionNoPrompt = document.getElementById('confessionNoPrompt');
    const confessionContainer = document.querySelector('.page-container'); // Assuming page3 uses this class

    if (confessionYesBtn) {
        confessionYesBtn.addEventListener('click', () => {
            if (confessionContainer) {
                confessionContainer.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                confessionContainer.style.opacity = 0;
                confessionContainer.style.transform = 'translateY(-30px) scale(0.95)';
            }
            setTimeout(() => {
                window.location.href = 'page_yes_response.html'; // Leads to the final thank you page
            }, 800);
        });
    }

    if (confessionNoBtn) {
        let confessionClickCount = 0;
        confessionNoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            confessionClickCount++;

            if (confessionClickCount === 1) {
                confessionNoPrompt.classList.add('show');
                confessionNoBtn.classList.add('float-animation');
                confessionNoPrompt.textContent = 'Are you sure? &#128557;';
            } else if (confessionClickCount === 2) {
                confessionNoBtn.classList.add('float-animation');
                confessionNoPrompt.textContent = 'Please reconsider! &#128532;';
            } else {
                confessionNoBtn.classList.remove('float-animation');
                confessionNoPrompt.textContent = "I won't give up! &#128522; Let's go back and try again!";
                confessionNoPrompt.classList.add('show');

                setTimeout(() => {
                    if (confessionContainer) {
                        confessionContainer.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                        confessionContainer.style.opacity = 0;
                        confessionContainer.style.transform = 'translateY(-30px) scale(0.95)';
                    }
                    setTimeout(() => {
                        window.location.href = 'index.html'; // Go back to start
                    }, 800);
                }, 2000);
            }
            confessionNoBtn.addEventListener('animationend', () => {
                confessionNoBtn.classList.remove('float-animation');
            }, { once: true });
            setTimeout(() => {
                if (confessionClickCount === 1) {
                    confessionNoPrompt.classList.remove('show');
                }
            }, 3000);
        });
    }
});
