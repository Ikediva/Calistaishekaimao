const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Game variables
let fruits = [];
let score = 0;
const fruitImages = {
    1: "fruit1.png", // Smallest
    2: "fruit2.png",
    3: "fruit3.png",
    4: "fruit4.png",
    5: "fruit5.png"  // Largest
};

// Ground boundary (line above the score area)
const groundY = canvas.height - 100;

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
        size: getRandomFruitSize(), // Size is a number from 1 to 5
        width: 50,
        height: 50,
        velocityY: gravity,
        resting: false
    };
    fruits.push(fruit);
}

// Get random fruit size (from smallest to largest)
function getRandomFruitSize() {
    return Math.floor(Math.random() * 5) + 1; // Returns a size between 1 and 5
}

// Update and draw fruits
function updateFruits() {
    for (let i = 0; i < fruits.length; i++) {
        const fruit = fruits[i];

        if (!fruit.resting) {
            fruit.y += fruit.velocityY; // Apply gravity

            // Stop the fruit if it hits the ground
            if (fruit.y + fruit.height >= groundY) {
                fruit.y = groundY - fruit.height; // Align it to the ground
                fruit.resting = true; // Mark it as resting
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

// Draw the ground
function drawGround() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, groundY, canvas.width, 5); // Ground line
}

// Draw the score
function drawScore() {
    ctx.font = "24px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${score}`, 10, canvas.height - 50);
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    updateFruits();
    drawFruits();
    drawGround();
    drawScore();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
