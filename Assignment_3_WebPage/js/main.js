// Image cycler for the home page
// Cycles through study images when the Next Image button is clicked

// List of image file paths to cycle through
const images = ["assets/images/study1.jpg", "assets/images/study2.jpg", "assets/images/study3.jpg"];

// Get the image element and button from the page
const img = document.getElementById("studyImage");
const btn = document.getElementById("cycleBtn");

// Track which image is currently showing
let current = 0;

// When the button is clicked, move to the next image
btn.onclick = function() {
    // Loop back to the first image after the last one
    current = (current + 1) % images.length;
    img.src = images[current];
}