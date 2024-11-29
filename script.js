const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Background color
ctx.fillStyle = "pink";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Placeholder Fruit images (for debugging)
const fruits = [
    "https://via.placeholder.com/50", // Replace this with fruit1.png later
    "https://via.placeholder.com/50", // Replace this with fruit2.png later
    "https://via.placeholder.com/50", // Replace this with fruit3.png later
    "https://via.placeholder.com/50", // Replace this with fruit4.png later
    "https://via.placeholder.com/50"  // Replace this with fruit5.png later
];

const fruitObjects = [];
const fruitSize = 50;

// Generate random fruit positions
function createFruit() {
    const fruit = {
        x: Math.random() * (canvas.width - fruitSize),
        y: -fruitSize,
        size: fruitSize,
        image: fruits[Math.floor(Math.random() * fruits.length)],
        speed: Math.random() * 2 + 1
    };
    fruitObjects.push(fruit);
}

// Draw fruit
function drawFruit() {
    fruitObjects.forEach((fruit, index) => {
        const img = new Image();
        img.src = fruit.image;
        img.onload = () => {
            ctx.drawImage(img, fruit.x, fruit.y, fruit.size, fruit.size);
        };
        fruit.y += fruit.speed;

        // Remove fruit if it goes out of bounds
        if (fruit.y > canvas.height) {
            fruitObjects.splice(index, 1);
        }
    });
}

// Game loop
function gameLoop() {
    ctx.fillStyle = "pink";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawFruit();

    requestAnimationFrame(gameLoop);
}

// Debug log to confirm script is loaded
console.log("Script loaded successfully!");

// Start the game
setInterval(createFruit, 1000); // Add a new fruit every second
gameLoop();
