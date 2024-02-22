// cors-check.js

let response = await fetch('http://server-nodejs.cit.byui.edu:3000/');

if (response.ok) {
    let json = await response.json()
} else {
    alert("HTTP-Error: " + response.status);
}

fetch('http://server-nodejs.cit.byui.edu:3000/images/' + req.params.imageName)
  .then(response => {
    console.log('Response headers:', response.headers);
  })
  .catch(error => {
    console.error('Error fetching image:', error);
  });
