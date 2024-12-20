const currentURL = window.location.href;
console.log(currentURL);


const everything = currentURL.split("?");
console.log(everything)

let formData = everything[1].split('&')
console.log("formData:", formData)

function show(cup) {
    console.log(cup)
    formData.forEach((element) => {
        console.log(element)
        if(element.startsWith(cup)){
          result = element.split('=')[1].replace("%40", "@")
          // Check if the result looks like an ISO timestamp
          if (/^\d{4}-\d{2}-\d{2}T\d{2}%3A\d{2}%3A\d{2}\.\d{3}Z$/.test(result)) {
            // Decode the URL-encoded timestamp
            const decodedTimestamp = decodeURIComponent(result);
            
            // Create a Date object
            const date = new Date(decodedTimestamp);
            
            // Format the date in a more readable way
            result = date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true
            });
          }
        }
          
        
    })
    return(result)
  }

  const showInfo = document.querySelector('#results')

  showInfo.innerHTML = `
   <h1>Thank you for your request!</h1>
   <p>First Name: ${show('first')} ${show('last')}</p>
   <p>Email: ${show('email')} </p>
   <p>Phone Number: ${show('phone')} </p>   
  

  `
//(first name, last name, email, mobile number, business name, and current date timestamp from the hidden field)