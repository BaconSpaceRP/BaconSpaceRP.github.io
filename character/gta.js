// gta.js

// JavaScript code for handling form submission
document.getElementById('characterForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Retrieve form values
  var characterName = document.getElementById('characterName').value;
  var gender = document.getElementById('gender').value;
  var age = document.getElementById('age').value;
  var hairstyle = document.getElementById('hairstyle').value;
  var clothing = document.getElementById('clothing').value;

  // Save character details to localStorage
  saveCharacterDetails(characterName, gender, age, hairstyle, clothing);

  // Display character details with badges
  displayCharacterDetails(characterName, gender, age, hairstyle, clothing);
});

// Function to save character details to localStorage
function saveCharacterDetails(name, gender, age, hairstyle, clothing) {
  var character = {
    name: name,
    gender: gender,
    age: age,
    hairstyle: hairstyle,
    clothing: clothing
    // Add more properties as needed
  };

  // Convert character object to JSON and store in localStorage
  localStorage.setItem('savedCharacter', JSON.stringify(character));
}

// Function to display character details with badges
function displayCharacterDetails(name, gender, age, hairstyle, clothing) {
  var characterDetails = `
    <h2 class="mt-3">Character Details</h2>
    <p><strong>Name:</strong> <span class="badge bg-primary">${name}</span></p>
    <p><strong>Gender:</strong> <span class="badge bg-primary">${gender}</span></p>
    <p><strong>Age:</strong> <span class="badge bg-secondary">${age}</span></p>
    <p><strong>Hairstyle:</strong> <span class="badge bg-success">${hairstyle}</span></p>
    <p><strong>Clothing:</strong> <span class="badge bg-warning text-dark">${clothing}</span></p>
    <!-- Add more details with badges -->
  `;

  document.getElementById('characterDetails').innerHTML = characterDetails;
}

// Function to load saved character details on page load
function loadSavedCharacterDetails() {
  var savedCharacter = localStorage.getItem('savedCharacter');

  if (savedCharacter) {
    // Parse JSON and display character details
    savedCharacter = JSON.parse(savedCharacter);
    displayCharacterDetails(
      savedCharacter.name,
      savedCharacter.gender,
      savedCharacter.age,
      savedCharacter.hairstyle,
      savedCharacter.clothing
      // Add more properties as needed
    );
  }
}

// Load saved character details on page load
loadSavedCharacterDetails();
