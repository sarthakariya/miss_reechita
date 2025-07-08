// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // This script is now solely for the index.html page's background animations and button
    // The interactive "Yes/No" button logic has moved to script3.js for page3.html

    const body = document.body;

    // --- No longer generating particles/snowflakes from JS for this page ---
    // The background elements (waves, stars, particles) are handled purely by CSS animations now,
    // which is more performant and unique for the intro page.

    // The startJourneyBtn functionality is now inline in index.html to control transition

    // Ensure the body has the specific ID for index.html CSS styling
    body.id = 'intro-page-bg';
});
