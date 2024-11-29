const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Game variables
let fruits = [];
let score = 0;
const fruitSizes = ["small", "medium", "large"]; // Define size progression
const fruitImages = {
    small: "fruit1.png", // Replace with actual images
    medium: "fruit2.png",
    large: "fruit3.png"
};

// Gravity speed
const gravity = 2;

// Touch to drop fruit
canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    dropFruit(x);
});

// Drop a new fruit at the specified x position
function dropFruit(x) {
    const fruit = {
        x: x - 25, // Center the fruit
        y: 0,
        size: getRandomFruitSize(),
        width: 50,
        height: 50,
        velocityY: gravity,
        resting: false
    };
    fruits.push(fruit);
}

// Get random fruit size
function getRandomFruitSize() {
    return fruitSizes[Math.floor(Math.random() * fruitSizes.length)];
}

// Update and draw fruits
function updateFruits() {
    for (let i = 0; i < fruits.length; i++) {
        const fruit = fruits[i];

        if (!fruit.resting) {
            fruit.y += fruit.velocityY; // Apply gravity

            // Stop the fruit if it hits the bottom or another fruit
            if (fruit.y + fruit.height >= canvas.height || isTouchingOtherFruit(fruit)) {
                fruit.y = Math.min(fruit.y, canvas.height - fruit.height);
                fruit.resting = true;

                // Check for merging
                for (let j = 0; j < fruits.length; j++) {
                    if (i !== j && isColliding(fruit, fruits[j]) && fruit.size === fruits[j].size) {
                        fruit.size = nextFruitSize(fruit.size);
                        fruits.splice(j, 1); // Remove the merged fruit
                        updateScore();
                        break;
                    }
                }
            }
        }
    }
}

// Draw fruits
function drawFruits() {
    fruits.forEach(fruit => {
        const img = new Image();
        img.src = fruitImages[fruit.size];
        ctx.drawImage(img, fruit.x, fruit.y, fruit.width, fruit.height);
    });
}

// Check collision between two fruits
function isColliding(fruit1, fruit2) {
    return (
        fruit1.x < fruit2.x + fruit2.width &&
        fruit1.x + fruit1.width > fruit2.x &&
        fruit1.y < fruit2.y + fruit2.height &&
        fruit1.y + fruit1.height > fruit2.y
    );
}

// Check if a fruit is touching another fruit below it
function isTouchingOtherFruit(fruit) {
    for (let otherFruit of fruits) {
        if (fruit !== otherFruit && 
            fruit.y + fruit.height <= otherFruit.y && 
            fruit.x < otherFruit.x + otherFruit.width &&
            fruit.x + fruit.width > otherFruit.x) {
            return true;
        }
    }
    return false;
}

// Get the next size in the fruit progression
function nextFruitSize(size) {
    const index = fruitSizes.indexOf(size);
    return fruitSizes[index + 1] || size; // Return the same size if it's the largest
}

// Update the score
function updateScore() {
    score += 10; // Add points for merging
    document.getElementById("score").innerText = `Score: ${score}`;
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    updateFruits();
    drawFruits();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
