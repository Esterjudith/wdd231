document.addEventListener("DOMContentLoaded", () => {
    const artistContainer = document.getElementById("artistContainer");
    const modal = document.querySelector('dialog');
    const closeButton = document.querySelector(".close-btn");
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
            if(art === artworks[0]){
                art.title = "Polka dots";
                card.innerHTML = `
                <img src="${art.image}" alt="${art.title || 'Artwork'}" class="card-image" loading="lazy">
                <h3>${art.title || "Untitled"}</h3>
            `; 
            }else if (art === artworks[1]){
                art.title = "Streets";
                card.innerHTML = `
                <img src="${art.image}" alt="${art.title || 'Artwork'}" class="card-image" loading="lazy">
                <h3>${art.title || "Untitled"}</h3>
            `; 
            } else if (art === artworks[2]){
                art.title = "Grayscale";
                card.innerHTML = `
                <img src="${art.image}" alt="${art.title || 'Artwork'}" class="card-image" loading="lazy">
                <h3>${art.title || "Untitled"}</h3>
            `; 
            }else {
                card.innerHTML = `
                <img src="${art.image}" alt="${art.title || 'Artwork'}" class="card-image" loading="lazy">
                <h3>${art.title || "Untitled"}</h3>
            `;
            }
            
            card.addEventListener("click", () => openModal(art, artworks));
            artistContainer.appendChild(card);
        });
    }

    const polkaDots = {
        title: "Polka dots",
        artist: "Engin Akyurt",
        price: "$1500",
        description: "Low black and white hue picture"
    }

    const streets = {
        title: "Streets",
        artist: "Alice Donovan Rouse",
        price: "$850",
        description: "Colorful print art"
    }

    const grayscale = {
        title: "Grayscale",
        artist: "Maxim Hopman",
        price: "$2800",
        description: "Infinit black and white"
    }

    function openModal(art, artworks) {
        
        const card = event.currentTarget;
       const cardRect = card.getBoundingClientRect();
       const scrollTop = document.documentElement.scrollTop;
        if(art === artworks[0]){
            modalImage.src = art.image;
            modalTitle.textContent = polkaDots.title || "Untitled";
            modalArtist.textContent = polkaDots.artist;
            modalDate.textContent = polkaDots.price || "$1500"
            modalDescription.textContent = polkaDots.description || "No description available."; 
        } else if (art === artworks[1]){
            modalImage.src = art.image;
            modalTitle.textContent = streets.title || "Untitled";
            modalArtist.textContent = streets.artist;
            modalDate.textContent = streets.price || "$1500"
            modalDescription.textContent = streets.description || "No description available.";
        } else if (art === artworks[2]){
            modalImage.src = art.image;
            modalTitle.textContent = grayscale.title || "Untitled";
            modalArtist.textContent = grayscale.artist;
            modalDate.textContent = grayscale.price || "$1500"
            modalDescription.textContent = grayscale.description || "No description available.";
        }else {
            modalImage.src = art.image;
            modalTitle.textContent = art.title || "Untitled";
            modalArtist.textContent = art.artist;
            modalDate.textContent = art.price || "$1500"
            modalDescription.textContent = art.description || "No description available.";
        }
        modal.style.position = "absolute";
        modal.style.top = `${cardRect.top + scrollTop}px`;
        modal.style.left = `${cardRect.left}px`;
        modal.style.display = "block";
    }

    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
       
    });

    // Allow closing the modal by clicking outside its content
   

    fetchArtists();
});
