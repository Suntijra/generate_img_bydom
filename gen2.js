const { createCanvas, loadImage, registerFont, ImageData } = require('canvas');
const fs = require('fs');
const path = require('path');
const outputFolder = 'images';
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

// Register TH Sarabun New font
registerFont('./Sarun.ttf', { family: 'TH Sarabun New' });

function generateImages() {
    for (let i = 45; i <= 45; i++) {
      const character = String.fromCharCode(3585 + i); // Unicode code for 'ก' + i
      const characterFolder = path.join(outputFolder, `c${i}`);
      if (!fs.existsSync(characterFolder)) {
        fs.mkdirSync(characterFolder);
      }
      for (let j = 0; j < 5; j++) {
        const canvas = createCanvas(200, 300);
        const context = canvas.getContext('2d');
  
        context.clearRect(0, 0, canvas.width, canvas.height);
  
        // Generate random color for background
        const backgroundColor = getRandomColor();
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
  
        // Generate random color and font size for character
        const fontSize = getRandomFontSize();
        const textColor = '#FFFFFF'; // White color for text
        context.fillStyle = textColor;
        context.font = `${fontSize}px 'TH Sarabun New'`; // Use TH Sarabun New font
        context.textBaseline = 'middle';
        context.textAlign = 'center';
  
        // Calculate position for centering character
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const characterX = centerX + Math.random() * 10 - 5;
        const characterY = centerY + Math.random() * 10 - 5;
  
        context.fillText(character, characterX, characterY);
  
        // Convert image to threshold
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const thresholdData = convertToThreshold(imageData);
  
        // Save threshold image
        const outputFileName = path.join(characterFolder, `img_${j}.bmp`);
        saveImageData(outputFileName, thresholdData);
      }
    }
    generateImagesnum()
  }

  function generateImagesnum() {
    const character = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    for (let i = 0; i <= 9; i++) {
      // const character = String.fromCharCode(3585 + i); // Unicode code for 'ก' + i
      const characterFolder = path.join(outputFolder, `n${i}`);
      if (!fs.existsSync(characterFolder)) {
        fs.mkdirSync(characterFolder);
      }
      for (let j = 0; j < 5; j++) {
        const canvas = createCanvas(200, 300);
        const context = canvas.getContext('2d');
  
        context.clearRect(0, 0, canvas.width, canvas.height);
  
        // Generate random color for background
        const backgroundColor = getRandomColor();
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
  
        // Generate random color and font size for character
        const fontSize = getRandomFontSize();
        const textColor = '#FFFFFF'; // White color for text
        context.fillStyle = textColor;
        context.font = `${fontSize}px 'TH Sarabun New'`; // Use TH Sarabun New font
        context.textBaseline = 'middle';
        context.textAlign = 'center';
  
        // Calculate position for centering character
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const characterX = centerX + Math.random() * 10 - 5;
        const characterY = centerY + Math.random() * 10 - 5;
  
        context.fillText(character, characterX, characterY);
  
        // Convert image to threshold
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const thresholdData = convertToThreshold(imageData);
  
        // Save threshold image
        const outputFileName = path.join(characterFolder, `img_${j}.bmp`);
        saveImageData(outputFileName, thresholdData);
      }
    }
  }
  
  

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomFontSize() {
  return Math.floor(Math.random() * 126) + 50;
}

function convertToThreshold(imageData) {
    const thresholdData = new Uint8ClampedArray(imageData.data.length);
  
    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];
      const brightness = (r + g + b) / 3;
  
      if (brightness < 250) { // ปรับค่าความสว่างที่ใช้เป็น threshold
        thresholdData[i] = 0;
        thresholdData[i + 1] = 0;
        thresholdData[i + 2] = 0;
      } else {
        thresholdData[i] = 255;
        thresholdData[i + 1] = 255;
        thresholdData[i + 2] = 255;
      }
  
      thresholdData[i + 3] = 255;
    }
  
    return thresholdData;
  }
  

function saveImageData(outputFileName, imageData) {
  const canvas = createCanvas(200, 300);
  const context = canvas.getContext('2d');
  const newImageData = new ImageData(imageData, canvas.width, canvas.height);

  context.putImageData(newImageData, 0, 0);
  const dataURL = canvas.toDataURL('image/png');
  const base64Data = dataURL.replace(/^data:image\/png;base64,/, '');

  fs.writeFileSync(outputFileName, base64Data, 'base64');
}

generateImages();
