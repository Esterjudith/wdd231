async function loadImages() {
    try {
      const response = await fetch('data/imagesData.json'); 
      const data = await response.json();
  
      const imageContainer = document.getElementById('image-container');
  
      data.forEach(image => {
        const imageWrapper = document.createElement('div'); 
  
        // Create the image element
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;       
  
        // Create the caption element
        const caption = document.createElement('figcaption');
        caption.textContent = image.caption;
  
        // Append image and caption to the wrapper
        imageWrapper.appendChild(img);
        imageWrapper.appendChild(caption);
  
        // Append the wrapper to the container
        imageContainer.appendChild(imageWrapper);
      });
    } catch (error) {
      console.error('Error loading images data:', error);
    }
  }
  
  // Call the loadImages function when the page is loaded
  document.addEventListener('DOMContentLoaded', loadImages);

  // Function to calculate the time difference in days
function calculateDaysSinceLastVisit(lastVisitDate) {
    const currentDate = new Date();
    const lastVisit = new Date(lastVisitDate);
    const timeDifference = currentDate - lastVisit; // time in milliseconds
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24)); // convert to whole days
    return daysDifference;
  }
  
  // Function to display the message based on the last visit
  function displayVisitMessage() {
    const visitMessageElement = document.getElementById('visit-message');
    
    const lastVisit = localStorage.getItem('lastVisit'); 
    
    const currentDate = new Date().toISOString(); 
    
    // If it's the first visit
    if (!lastVisit) {
      visitMessageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
      const daysSinceLastVisit = calculateDaysSinceLastVisit(lastVisit);
      
      // If last visit was less than a day ago
      if (daysSinceLastVisit < 1) {
        visitMessageElement.textContent = "Back so soon! Awesome!";
      } else {
        // If last visit was more than a day ago, show the number of days
        visitMessageElement.textContent = `You last visited ${daysSinceLastVisit} ${daysSinceLastVisit === 1 ? 'day' : 'days'} ago.`;
      }
    }
  }
  
  // Call the displayVisitMessage function when the page is loaded
  document.addEventListener('DOMContentLoaded', displayVisitMessage);