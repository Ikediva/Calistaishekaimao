const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Game variables
let fruits = [];
let score = 0;
const fruitSizes = ["small", "medium", "large"]; // Define size progression
const fruitImages = [
    "fruit1.png", // Replace with your actual fruit images
    "fruit2.png",
    "fruit3.png",
    "fruit4.png",
    "fruit5.png"
];

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
        size: getRandomFruitSize(),
        width: 50,
        height: 50,
        image: getRandomFruitImage(),
        velocityY: gravity,
        resting: false
    };
    fruits.push(fruit);
}

// Get random fruit image
function getRandomFruitImage() {
    return fruitImages[Math.floor(Math.random() * fruitImages.length)];
}

// Get random fruit size (currently placeholder for different fruit behaviors)
function getRandomFruitSize() {
    return fruitSizes[Math.floor(Math.random() * fruitSizes.length)];
}

// Update and draw fruits
function updateFruits() {
    for (let i = 0; i < fruits.length; i++) {
        const fruit = fruits[i];

        if (!fruit.resting) {
            fruit.y += fruit.velocityY; // Apply gravity

            // Stop the fruit if it hits the ground
            if (fruit.y + fruit.height >= groundY) {
                fruit.y = groundY - fruit.height;
                fruit.resting = true;
            }
        }
    }
}

// Draw fruits
function drawFruits() {
    fruits.forEach(fruit => {
        const img = new Image();
        img.src = fruit.image;
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
