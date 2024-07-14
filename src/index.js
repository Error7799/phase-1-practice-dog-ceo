console.log('%c HI', 'color: firebrick')

// API URLs
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

// Function to fetch images and add them to the DOM
function fetchAndDisplayImages() {
  fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
      const images = data.message;
      const imageContainer = document.getElementById("dog-image-container");
      imageContainer.innerHTML = "";
      images.forEach(imageUrl => {
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        imgElement.alt = "Dog image";
        imageContainer.appendChild(imgElement);
      });
    })
    .catch(error => {
      console.error('Error fetching images:', error);
    });
}

// Function to fetch breeds and add them to the DOM
function fetchAndDisplayBreeds() {
  fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
      const breeds = data.message;
      const breedList = document.getElementById("dog-breeds");
      breedList.innerHTML = "";

      // Function to filter breeds based on the selected letter
      function filterBreeds(letter) {
        for (const breed in breeds) {
          if (breeds[breed].length > 0) {
            breeds[breed].forEach(subBreed => {
              if (subBreed.startsWith(letter)) {
                const breedItem = document.createElement("li");
                breedItem.textContent = `${subBreed} ${breed}`;
                breedList.appendChild(breedItem);
              }
            });
          } else {
            if (breed.startsWith(letter)) {
              const breedItem = document.createElement("li");
              breedItem.textContent = breed;
              breedList.appendChild(breedItem);
            }
          }
        }
      }

      // Initial display of all breeds
      filterBreeds(''); // Show all breeds initially

      // Event listener for dropdown change
      const breedDropdown = document.getElementById("breed-dropdown");
      breedDropdown.addEventListener("change", function() {
        const selectedLetter = this.value;
        breedList.innerHTML = ""; // Clear current list

        if (selectedLetter === 'all') {
          filterBreeds('');
        } else {
          filterBreeds(selectedLetter);
        }
      });
    })
    .catch(error => {
      console.error('Error fetching breeds:', error);
    });
}

// Call fetchAndDisplayImages() and fetchAndDisplayBreeds() when the page loads
window.addEventListener("load", () => {
  fetchAndDisplayImages();
  fetchAndDisplayBreeds();
});


