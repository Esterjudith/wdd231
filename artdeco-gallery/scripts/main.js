const currentyear = document.getElementById("currentyear");
const today = new Date();
const lastModified = document.getElementById("lastModified");
const nav = document.getElementById("animated");
const hamburger = document.getElementById("myButton");

currentyear.innerHTML = today.getFullYear()
lastModified.textContent = `Last modification: ${document.lastModified}`;

// Ensure the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".designOne");
    const timestampInput = document.getElementById("formTimestamp");

    // Add timestamp to the form before submission
    form.addEventListener("submit", () => {
        const now = new Date().toISOString(); // Generate current timestamp in ISO format
        timestampInput.value = now; // Set the value of the hidden input field
    });
});

hamburger.addEventListener('click', ()=> {
    nav.classList.toggle('open');
    hamburger.classList.toggle('open');
})

document.addEventListener("DOMContentLoaded", () => {
    const carouselImages = [];
    let currentImageIndex = 0;

    const carouselImageElement = document.getElementById("carouselImage");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const cardContainer = document.getElementById("cardContainer");

    async function fetchGalleryData() {
        try {
            const response = await fetch("data/gallery.json");
            const data = await response.json();

            // Load carousel images
            carouselImages.push(...data.carouselImages);
            updateCarousel();

            // Load featured art cards
            populateCards(data.featuredArt);
        } catch (error) {
            console.error("Error fetching gallery data:", error);
        }
    }

    function updateCarousel() {
        carouselImageElement.src = carouselImages[currentImageIndex];
        carouselImageElement.alt = `Image ${currentImageIndex + 1}`;
    }

    prevBtn.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex - 1 + carouselImages.length) % carouselImages.length;
        updateCarousel();
    });

    nextBtn.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
        updateCarousel();
    });

    function populateCards(featuredArt) {
        featuredArt.forEach(art => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <img src="${art.image}" alt="${art.title}" class="card-image" width="640">
                <h3>${art.title}</h3>
                <p><strong>Artist:</strong> ${art.artist}</p>
                <p><strong>Date:</strong> ${art.date}</p>
                <p><strong>Price:</strong> ${art.price}</p>
            `;

            cardContainer.appendChild(card);
        });
    }

    fetchGalleryData();
});


