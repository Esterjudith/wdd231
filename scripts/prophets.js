const url = "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";
const cards = document.querySelector('#cards');

async function getProphetData(url){
    const response = await fetch(url);
    
    if(response.ok){
        const data = await response.json();
        console.log(data.prophets);
        displayProphets(data.prophets);
    }
}

getProphetData(url);

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
     const card = document.createElement('section');
     const fullName = document.createElement('h2');
     const portrait = document.createElement('img');
     const dob = document.createElement('h3');
     const birthPlace = document.createElement('h3');
     fullName.textContent = `${prophet.name} ${prophet.lastname} - ${prophets.indexOf(prophet) + 1}th Latter-day President`
     dob.textContent = `Date of Birth: ${prophet.birthdate}`
     birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`
     portrait.setAttribute('src', prophet.imageurl);
     portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`)
     portrait.setAttribute('loading', 'lazy');
     portrait.setAttribute('width', '340');
     portrait.setAttribute('height', '440');

     card.appendChild(fullName);
     card.appendChild(dob);
     card.appendChild(birthPlace);
     card.appendChild(portrait);
     cards.appendChild(card);
    });
}