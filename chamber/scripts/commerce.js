const currentyear = document.getElementById("currentyear");
const today = new Date();
const lastModified = document.getElementById("lastModified");
const nav = document.getElementById("animated");
const hamburger = document.getElementById("myButton");
const currentTimestamp = new Date().toISOString();
const cards = document.getElementById('cards');

hamburger.addEventListener('click', ()=> {
    nav.classList.toggle('open');
    hamburger.classList.toggle('open');
})

currentyear.innerHTML = today.getFullYear()
lastModified.textContent = `Last modification: ${document.lastModified}`;

document.addEventListener('DOMContentLoaded', () => {
  const formTimestamp = document.getElementById("formTimestamp");
  if (formTimestamp) {
      formTimestamp.value = currentTimestamp;
  }
});


//Join page cards
const membershipLevelTitle = [
    "Non-profit Membership Level",
    "Bronze Membership Level", 
    "Silver Membership Level", 
    "Gold Membership Level"
]

function displayMembershipCards() {
    

    membershipLevelTitle.forEach(level => {
        const div = document.createElement('div');
        div.classList.add('card');
        const levelName = level.replace('Level', "").trim();
        div.innerHTML = `
        <h2>${level}</h2>
        <a href="#" class="open-dialog" data-level="${levelName}">Learn More</a>
        `  

        cards.appendChild(div);


    })

    cards.addEventListener('click', (e) => {
    if (e.target.classList.contains('open-dialog')) {
      e.preventDefault();
      const selectedLevel = e.target.getAttribute('data-level');
      displayDialog(selectedLevel);
    }
  });
}



const membershipLevels = [
    {
      name: "Non-profit Membership",
      benefits: [
        "Access to networking events",
        "Basic listing on the Chamber website",
        "Invitation to workshops and seminars",
        "Opportunities for community involvement"
      ]
    },
    {
      name: "Bronze Membership",
      benefits: [
        "All benefits of Non-profit membership",
        "Priority access to select Chamber events",
        "Discounted rates on event sponsorship",
        "Feature in the Chamber's monthly newsletter"
      ]
    },
    {
      name: "Silver Membership",
      benefits: [
        "All benefits of Bronze membership",
        "Access to exclusive networking groups",
        "Enhanced listing on the Chamber website",
        "Quarterly business spotlight in Chamber publications",
        "Free or discounted entry to workshops and training"
      ]
    },
    {
      name: "Gold Membership",
      benefits: [
        "All benefits of Silver membership",
        "Premier listing and logo placement on the Chamber website",
        "Top-tier sponsorship opportunities for events",
        "Personalized business consulting services",
        "Access to VIP members-only networking events",
        "Recognition at major Chamber events"
      ]
    }
  ];
  

  function displayDialog(selectedLevel) {
   const main = document.querySelector('main');
   const existingDialog = document.getElementById('modal');
   if(existingDialog) existingDialog.remove();

    const dialog = document.createElement('dialog');
    dialog.classList.add('modal');
    dialog.setAttribute('id', 'modal');
  
    // Find the selected level in the array
    const levelData = membershipLevels.find(level => level.name === selectedLevel);
  
    if (levelData) {   
      dialog.innerHTML = `        
          <h3>${levelData.name} Benefits</h3>
          <button class="close-modal" aria-label="Close modal">&times;</button>
          <ul>
            ${levelData.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
          </ul>
             
      `;
  
      // Add event listener to close button
      dialog.querySelector('.close-modal').addEventListener('click', () => {
        dialog.close();
        dialog.remove();
      });
  
      // Append dialog to body and show it
       main.appendChild(dialog);
      dialog.showModal();
    } else {
      console.error('Membership level not found');
    }
  }

  displayMembershipCards()


