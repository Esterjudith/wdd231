const currentyear = document.getElementById("currentyear");
const today = new Date();
const lastModified = document.getElementById("lastModified");
const nav = document.getElementById("animated");
const hamburger = document.getElementById("myButton");

hamburger.addEventListener('click', ()=> {
    nav.classList.toggle('open');
    hamburger.classList.toggle('open');
})

currentyear.innerHTML = today.getFullYear()
lastModified.textContent = `Last modification: ${document.lastModified}`;