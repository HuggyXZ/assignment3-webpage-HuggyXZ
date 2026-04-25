// Image cycler for the home page
// Cycles through study images when the Next Image button is clicked

// List of image file paths to cycle through
var images = ["assets/images/study1.jpg", "assets/images/study2.jpg", "assets/images/study3.jpg"];

// Track which image is currently showing
var current = 0;

// Get the image element and button from the page
var img = document.getElementById("studyImage");
var btn = document.getElementById("cycleBtn");

// When the button is clicked, move to the next image
btn.onclick = function() {
    current = current + 1;
    img.src = images[current];
}