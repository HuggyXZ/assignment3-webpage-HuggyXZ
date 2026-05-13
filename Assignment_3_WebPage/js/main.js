// Image cycler for the home page
// Cycles through study images when the Next Image button is clicked

// List of image file paths and alt text for each image
const images = [
    { src: "assets/images/study1.jpg", alt: "Students studying in a library setting" },
    { src: "assets/images/study2.jpg", alt: "2 students taking notes while reading books" },
    { src: "assets/images/study3.jpg", alt: "A student doing home work" },
    { src: "assets/images/study4.jpg", alt: "A student doing home work on a couch" },
    { src: "assets/images/study5.jpg", alt: "A student studying for exam" },
    { src: "assets/images/study6.jpg", alt: "A student cheating on their phone during exam" }
];

// Get the image element and button from the page
const img = document.getElementById("studyImage");
const btn = document.getElementById("cycleBtn");

// Track which image is currently showing
let current = 0;

// When the button is clicked, move to the next image
btn.addEventListener("click", function() {
    // Loop back to the first image after the last one
    current = (current + 1) % images.length;
    img.src = images[current].src;
    img.alt = images[current].alt; // update alt text for accessibility
});