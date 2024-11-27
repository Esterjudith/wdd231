const currentTemp = document.getElementById('current-temp');
const weatherIcon = document.getElementById('weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = "https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&appid=d6c5f20657a021715ad019f70466378b&units=imperial"  

async function apiFetch() {
 try {
    const response = await fetch(url);
    if(response.ok) {
        const data = await response.json()
        console.log(data);
        displayResults(data);
    } else {
        throw new Error(await response.text());
    }

 } catch(error) {
    console.error(error);
 } 
}

apiFetch();

function displayResults(data){
    currentTemp.textContent = data.main.temp;
    const iconsrc = `https://openweathermap.org/img/w/10d.png`
    const desc = data.weather[0].description
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc)
    captionDesc.innerHTML = desc;
  
}
