const current = document.querySelector("#current");
const forcast = document.getElementById("forcast");
const weatherIcon = document.getElementById("weather-icon");



const url = "https://api.openweathermap.org/data/2.5/weather?lat=42.36&lon=-71.06&appid=d6c5f20657a021715ad019f70466378b&units=imperial"  

const urlForcast = "https://api.openweathermap.org/data/2.5/forecast?lat=42.36&lon=-71.06&appid=d6c5f20657a021715ad019f70466378b&units=imperial"

async function apiFetch() {
 try {
    const response1 = await fetch(url);
    const response2 = await fetch(urlForcast);
    
    if (response1.ok && response2.ok) {
        const data1 = await response1.json();
        console.log(data1);
        displayResults(data1); 

        const data2 = await response2.json();
        console.log(data2);
        displayForcast(data1, data2);
    }
        
    
   
 } catch(error) {
    console.error(error);
 } 
}

apiFetch();

function displayResults(data){
    const ul = document.createElement("ul");
    const temLi = document.createElement("li")
    temLi.innerHTML = `<strong>${data.main.temp}&deg</strong>F`  

    const descLi = document.createElement("li")
    let description = data.weather[0].description; 
    let capitalizeddesc = description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    descLi.innerHTML = capitalizeddesc;

    const highLi = document.createElement("li");
    highLi.innerHTML = `High: ${data.main.temp_max}&deg`

    const lowLi = document.createElement("li")
    lowLi.innerHTML = `Low: ${data.main.temp_min}&deg`

    const humidityLi = document.createElement("li")
    humidityLi.innerHTML = `Humidity: ${data.main.humidity}%`
    
    ul.appendChild(temLi);
    ul.appendChild(descLi);
    ul.appendChild(highLi);
    ul.appendChild(lowLi);
    ul.appendChild(humidityLi);
    
    current.innerHTML = '';
    current.appendChild(ul);  
    const iconsrc = `https://openweathermap.org/img/w/10d.png`
    const desc = data.weather[0].description
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc)
    
  
}

function displayForcast(data1, data2){
    const ul = document.createElement("ul");
    const todayLi = document.createElement("li");

    todayLi.innerHTML = `Today: <strong>${data1.main.temp}&degF</strong>`;
    ul.appendChild(todayLi);

    const mondayLi = document.createElement("li");
    mondayLi.innerHTML = `Monday: <strong>${data2.list[5].main.temp}&degF</strong>`;
    ul.appendChild(mondayLi);

    const tuesdayLi = document.createElement("li");
    tuesdayLi.innerHTML = `Tuesday: <strong>${data2.list[13].main.temp}&degF</strong>`;
    ul.appendChild(tuesdayLi);
    
    forcast.appendChild(ul);

}

async function fetchMembersData() {
    const response = await fetch('data/members.json');
    const members = await response.json();
    console.log(members);

    // Filter members with Gold or Silver membership levels
    const eligibleMembers = members.filter(member => 
        member.membershipLevel === 1 || member.membershipLevel === 2
    );

    // Randomly select 2 or 3 members
    const selectedMembers = [];
    const numberOfSpotlights = Math.floor(Math.random() * 2) + 2; // 2 or 3
    while (selectedMembers.length < numberOfSpotlights && eligibleMembers.length > 0) {
        const randomIndex = Math.floor(Math.random() * eligibleMembers.length);
        selectedMembers.push(eligibleMembers.splice(randomIndex, 1)[0]);
    }

    // Display selected members in the spotlight section
    const spotlight = document.getElementById("spotlight");
    spotlight.innerHTML = ''; // Clear previous content

    selectedMembers.forEach(member => {
        const section = document.createElement('section');
        section.classList.add('member');
        section.innerHTML = `
            <h2>${member.name}</h2>
            <img src="images/${member.image}" alt="${member.name} logo" width="200">
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        spotlight.append(section);
    });
}
fetchMembersData()