// Parse the URL for form data
const currentURL = window.location.href;
const everything = currentURL.split("?");
let formData = everything[1]?.split("&");

if (formData) {
    // Initialize an object to store form data
    const formValues = {};

    // Iterate over form data and save to localStorage
    formData.forEach((element) => {
        const [key, value] = element.split("=");
        if (key && value) {
            let decodedValue = decodeURIComponent(value.replace(/\+/g, " "));
            if (key === "timestamp") {
                // Decode timestamp and format it
                const date = new Date(decodedValue);
                decodedValue = date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                });
            }
            formValues[key] = decodedValue;
        }
    });

    // Save the form values to localStorage
    localStorage.setItem("formSubmission", JSON.stringify(formValues));

    // Display form data on the page
    const showInfo = document.querySelector("#results");
    if (showInfo) {
        showInfo.innerHTML = `
            <h1>Thank you for your request!</h1>
            <p>First Name: ${formValues.first || "N/A"}</p>
            <p>Last Name: ${formValues.last || "N/A"}</p>
            <p>Email: ${formValues.email || "N/A"}</p>
            <p>Phone Number: ${formValues.phone || "N/A"}</p>
            <p>Date Submitted: ${formValues.timestamp || "N/A"}</p>
            <p>Artist or Artwork of Interest: ${formValues.description || "None specified"}</p>
        `;
    }
}
