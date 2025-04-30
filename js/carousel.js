function setupCarousel(carouselSelector, rotationInterval) {
    const carousel = $(carouselSelector);
    let currdeg = 0;
    let carouselTimer;
    let isDragging = false;
    let startX;

    // Rotate function
    function rotate(deg) {
        currdeg += deg;
        carousel.css({
            "-webkit-transform": "rotateY(" + currdeg + "deg)",
            "-moz-transform": "rotateY(" + currdeg + "deg)",
            "-o-transform": "rotateY(" + currdeg + "deg)",
            "transform": "rotateY(" + currdeg + "deg)"
        });
    }

    // Automatic carousel rotation
    function startCarousel() {
        carouselTimer = setInterval(() => rotate(-60), rotationInterval);
    }

    // Restart carousel rotation
    function resetCarousel() {
        clearInterval(carouselTimer);
        startCarousel();
    }

    // Start automatic rotation on load
    startCarousel();

    // Swipe/drag detection for manual rotation
    carousel.on("mousedown touchstart", function(e) {
        isDragging = true;
        startX = e.pageX || e.originalEvent.touches[0].pageX;
        carousel.css("cursor", "grabbing");
    });

    $(document).on("mousemove touchmove", function(e) {
        if (!isDragging) return;
        let x = e.pageX || e.originalEvent.touches[0].pageX;
        let diff = x - startX;

        // Check for significant swipe distance to rotate
        if (Math.abs(diff) > 50) {
            rotate(diff > 0 ? 60 : -60); // Rotate based on swipe direction
            startX = x; // Reset start point for continuous swipe
            resetCarousel(); // Restart the automatic rotation timer
        }
    });

    $(document).on("mouseup touchend", function() {
        isDragging = false;
        carousel.css("cursor", "grab");
    });
}
