const gridButton = document.getElementById("grid");
const listButton = document.getElementById("list");
const display = document.querySelector("article");
const membersElement = document.getElementById("members");


gridButton.addEventListener('click', ()=> {
    display.classList.add('grid');
    display.classList.remove('list');
})

listButton.addEventListener('click', () => {
    display.classList.add('list');
    display.classList.remove('grid');
})

async function fetchMembersData() {
    const response = await fetch('data/members.json');
    const members = await response.json();
    console.log(members);

    members.forEach(member => {
        const section = document.createElement('section');
        section.classList.add('members');
        section.innerHTML = `
        <h2>${member.name}</h2>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">${member.website}</a>
        <img src="images/${member.image}" alt="${member.name} logo" width="200">
        `
        
        membersElement.append(section);
    })


}



// address
// description
// email
// image
// membershipLevel
// name
// phone
// website
fetchMembersData()





