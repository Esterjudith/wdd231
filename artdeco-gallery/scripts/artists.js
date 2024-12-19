document.addEventListener("DOMContentLoaded", () => {
    const artistContainer = document.getElementById("artistContainer");
    const modal = document.querySelector('dialog');
    const closeModal = modal.querySelector(".close-btn");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalArtist = document.getElementById("modalArtist");
    const modalDate = document.getElementById("modalDate");
    const modalPrice = document.getElementById("modalPrice");
    const modalDescription = document.getElementById("modalDescription");

    async function fetchArtists() {
        try {
            const response = await fetch("data/gallery.json");
            const data = await response.json();

            const allArt = [
                ...data.carouselImages.map(image => ({ image, title: "Artwork", artist: "Unknown" })),
                ...data.featuredArt
            ];

            renderArtistCards(allArt);
        } catch (error) {
            console.error("Error fetching artists:", error);
        }
    }

    function renderArtistCards(artworks) {
        artworks.forEach(art => {
            const card = document.createElement("div");
            card.classList.add("artist-card");
            card.innerHTML = `
                <img src="${art.image}" alt="${art.title || 'Artwork'}" class="card-image" loading="lazy">
                <h3>${art.title || "Untitled"}</h3>
            `;
            card.addEventListener("click", () => openModal(art));
            artistContainer.appendChild(card);
        });
    }

    function openModal(art) {
        modalImage.src = art.image;
        modalTitle.textContent = art.title || "Untitled";
        modalArtist.textContent = `Artist: ${art.artist || "Unknown"}`;
        modalDate.textContent = art.date ? `Date: ${art.date}` : "04/15/2021";
        modalPrice.textContent = art.price ? `Price: ${art.price}` : "$1500";
        modalDescription.textContent = art.description || "No description available.";

        modal.showModal(); // Open the modal
    }

    closeModal.addEventListener("click", () => {
        modal.close(); 
        console.log("working")
    });

    // Allow closing the modal by clicking outside its content
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.close();
        }
    });

    fetchArtists();
});
