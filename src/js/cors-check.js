// cors-check.js

fetch('http://server-nodejs.cit.byui.edu:3000/images/' + req.params.imageName)
  .then(response => {
    console.log('Response headers:', response.headers);
  })
  .catch(error => {
    console.error('Error fetching image:', error);
  });
