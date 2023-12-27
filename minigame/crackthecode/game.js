document.addEventListener('DOMContentLoaded', function () {
    // Function to generate a secret code using the random number API
    async function generateSecretCode() {
        try {
            const response = await fetch('http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000');
            const data = await response.json();
            return data[0];
        } catch (error) {
            console.error('Error fetching the secret code:', error);
            return '123'; // Replace with your default secret code
        }
    }

    // Get the form, score container, and feedback elements
    const form = document.getElementById('scoreForm');
    const scoreContainer = document.getElementById('scoreContainer');
    const feedbackContainer = document.getElementById('feedbackContainer');

    // Event listener for the form submission
    form.addEventListener('submit', async function (event) {
        // Prevent the default form submission
        event.preventDefault();

        // Get the player's name and score from the form
        const playerName = document.getElementById('playerName').value;
        const playerScore = document.getElementById('playerScore').value;

        // Generate the secret code
        const secretCode = await generateSecretCode();

        // Create a new score object
        const newScore = {
            name: playerName,
            score: playerScore,
            secretCode: secretCode
        };

        // Fetch existing scores from score.json
        fetch('score.json')
            .then(response => response.json())
            .then(scores => {
                // Add the new score to the scores array
                scores.push(newScore);

                // Save the updated scores back to score.json
                saveScores(scores);

                // Display the scores
                displayScores(scores);

                // Provide feedback based on the secret code
                provideFeedback(secretCode);
            })
            .catch(error => console.error(error));
    });

    // Function to save scores to score.json
    function saveScores(scores) {
        // Convert the scores array to JSON and write it to score.json
        const jsonString = JSON.stringify(scores);
        fetch('score.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonString
        });
    }

    // Function to display scores
    function displayScores(scores) {
        // Clear the existing content
        scoreContainer.innerHTML = '';

        // Create HTML for each score and append it to the container
        scores.forEach(score => {
            const scoreItem = document.createElement('div');
            scoreItem.innerHTML = `<p>Name: ${score.name}, Score: ${score.score}, Secret Code: ${score.secretCode}</p>`;
            scoreContainer.appendChild(scoreItem);
        });
    }

    // Function to provide feedback based on the secret code
    function provideFeedback(secretCode) {
        // Clear the existing content
        feedbackContainer.innerHTML = '';

        // Check if the secret code meets a specific condition (e.g., between 500 and 700)
        if (secretCode >= 500 && secretCode <= 700) {
            feedbackContainer.innerHTML = '<p class="text-success">Great job! You cracked the code!</p>';
        } else {
            feedbackContainer.innerHTML = '<p class="text-danger">Sorry, better luck next time!</p>';
        }
    }

    // Fetch and display scores when the page loads
    fetch('score.json')
        .then(response => response.json())
        .then(scores => displayScores(scores))
        .catch(error => console.error(error));
});
