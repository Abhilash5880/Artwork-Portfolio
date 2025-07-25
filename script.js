// Get the current year for the footer copyright
const currentYearSpan = document.getElementById('current-year');
if (currentYearSpan) { // Check if the element exists to prevent errors
    currentYearSpan.textContent = new Date().getFullYear();
}

// Ensure all DOM content is loaded before running scripts that manipulate elements
document.addEventListener('DOMContentLoaded', () => {

    // --- Artwork Filtering Functionality ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const filterableGalleryGrid = document.getElementById('filterable-gallery-grid');

    // Check if gallery elements exist before proceeding with filtering logic
    if (filterButtons.length > 0 && galleryItems.length > 0 && filterableGalleryGrid) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const category = button.dataset.category;

                galleryItems.forEach(item => {
                    const itemCategory = item.dataset.category;

                    if (category === 'all' || itemCategory === category) {
                        item.style.display = 'block'; // Show the item
                    } else {
                        item.style.display = 'none'; // Hide the item
                    }
                });
            });
        });

        // Trigger a click on the 'All Artworks' button on initial load
        const allArtworksButton = document.querySelector('.filter-btn[data-category="all"]');
        if (allArtworksButton) {
            allArtworksButton.click();
        } else {
            galleryItems.forEach(item => item.style.display = 'block');
        }
    } else {
        console.warn("Could not find all necessary elements for gallery filtering. Skipping filtering logic.");
    }


    // --- Fixed Landing Page Interaction ---
    const scrollDownLink = document.querySelector('.scroll-down a');
    const heroSection = document.getElementById('hero');
    const mainContentWrapper = document.querySelector('.main-content-wrapper');
    const htmlElement = document.documentElement; // Represents the <html> tag
    const bodyElement = document.body; // Represents the <body> tag

    // Only set up the landing page logic if all required elements exist
    if (scrollDownLink && heroSection && mainContentWrapper && htmlElement && bodyElement) {
        scrollDownLink.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior (jumping directly)

            // Hide the hero section smoothly
            heroSection.style.opacity = '0'; // Start fade out
            heroSection.style.pointerEvents = 'none'; // Make it unclickable during transition

            // After hero fades, enable scrolling and show main content
            setTimeout(() => {
                heroSection.style.display = 'none'; // Fully hide after fade animation completes
                heroSection.remove(); // Optional: remove from DOM entirely after hidden to clean up

                // Enable scrolling on the entire page
                htmlElement.style.overflow = 'auto';
                bodyElement.style.overflow = 'auto'; // Ensure body overflow is also auto

                // Reveal the main content wrapper with its transition
                mainContentWrapper.classList.add('active');

                // Scroll to the top of the main content wrapper
                // Use a short delay for scroll to ensure content has rendered and transition started
                setTimeout(() => {
                    mainContentWrapper.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 50); // Small delay to ensure render
            }, 800); // This timeout (800ms) MUST match the transition duration set for heroSection's opacity in style.css
        });
    } else {
        console.warn("Could not find all necessary elements for fixed landing page. Ensuring content is visible by default.");
        // Fallback: If elements for fixed landing page are missing, ensure main content is visible and scrolling is enabled
        if (mainContentWrapper) {
            mainContentWrapper.classList.add('active'); // Directly activate main content
        }
        htmlElement.style.overflow = 'auto'; // Ensure scrolling is enabled
        bodyElement.style.overflow = 'auto'; // Ensure body scrolling is enabled
    }

}); // End of DOMContentLoaded