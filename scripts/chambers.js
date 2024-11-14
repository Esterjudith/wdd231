const currentyear = document.getElementById("currentyear");
const today = new Date();
const lastModified = document.getElementById("lastModified");
const currentPath = window.location.pathname; //This is to highlight which page you are currently in
const hamButton = document.getElementById("menu");
const navigation = document.querySelector(".navigation");
const courses = document.getElementById("courses");


//Select all navigation links
const navLinks = document.querySelectorAll(".navigation a");

//Toggle for mobile menu
hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});


// Loop through each link and add the 'active' class to the matching link
navLinks.forEach(link => {
    if(link.getAttribute("href") === currentPath  ) {
        link.classList.add("active");
    }
});

currentyear.innerHTML = today.getFullYear()
lastModified.textContent = `Last modification: ${document.lastModified}`;