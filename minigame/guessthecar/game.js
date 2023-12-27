document.addEventListener('DOMContentLoaded', function () {
    // Fetch cars.json for images
    fetch('cars.json')
        .then(response => response.json())
        .then(cars => {
            // Call the function to set up the game with car data
            setupGame(cars);
        })
        .catch(error => console.error(error));
});

function setupGame(cars) {
    // Get the game container element
    const gameContainer = document.getElementById('gameContainer');
    // Get the score container element
    const scoreContainer = document.getElementById('scoreContainer');

    // Initialize score from score.json or set to 0 if not present
    let score = 0;

    // Update the score display
    function updateScore() {
        scoreContainer.textContent = `Cars Guessed: ${score}`;
    }

    // Function to display a new car image
    function displayCar() {
        // Get a random car from the cars array
        const randomCar = cars[Math.floor(Math.random() * cars.length)];

        // Create an image element and set its source
        const carImage = document.createElement('img');
        carImage.src = randomCar.images.frontQuarter; // You can choose any image property here

        // Clear the game container and append the new image
        gameContainer.innerHTML = '';
        gameContainer.appendChild(carImage);
    }

    // Event listener for the user's guess
    document.getElementById('guessForm').addEventListener('submit', function (event) {
        event.preventDefault();

        // Get the user's guess from the input field
        const userGuess = document.getElementById('userGuess').value.toLowerCase();

        // Get the current car's model from the displayed image
        const currentCar = getCurrentCarModel();
        if (currentCar === userGuess) {
            // User guessed correctly, increment the score
            score++;
            updateScore();
        }

        // Display a new car for the next guess
        displayCar();
    });

    // Function to get the model of the currently displayed car
    function getCurrentCarModel() {
        // Extract the car model from the image source URL
        const imageUrl = gameContainer.firstChild.src;
        const parts = imageUrl.split('/');
        const modelWithExtension = parts[parts.length - 1];
        // Remove the file extension to get the model name
        return modelWithExtension.split('.')[0];
    }

    // Initialize the game by displaying the first car
    displayCar();
    updateScore();
}
