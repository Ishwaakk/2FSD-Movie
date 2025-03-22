const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'moviesData.txt');

// Create a file
function createFile() {
    fs.writeFile(filePath, 'Movie List:\n', (err) => {
        if (err) throw err;
        console.log('File created successfully!');
    });
}

// Open (Conceptual - just checks if the file exists)
function openFile() {
    fs.open(filePath, 'r', (err, fd) => {
        if (err) {
            console.error('Error opening file:', err.message);
            return;
        }
        console.log('File opened successfully!');
        fs.close(fd, () => {});
    });
}

// Read from the file
function readFile() {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err.message);
            return;
        }
        console.log('File contents:\n', data);
    });
}

// Write to the file
function writeFile() {
    const movie = 'Ishwaak s FSD Works!! - Sci-Fi - Rating: 8.8\n';
    fs.appendFile(filePath, movie, (err) => {
        if (err) throw err;
        console.log('Movie data written to file!');
    });
}

function closeFile() {
    console.log('Files are automatically closed after operations in Node.js');
}

// Command line interface
const command = process.argv[2];

switch (command) {
    case 'create':
        createFile();
        break;
    case 'open':
        openFile();
        break;
    case 'read':
        readFile();
        break;
    case 'write':
        writeFile();
        break;
    case 'close':
        closeFile();
        break;
    default:
        console.log('Usage: node fileSystems.js [create|open|read|write|close]');
}
