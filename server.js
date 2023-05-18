const Jimp = require('jimp');
const fs = require('fs');

// Define the range of parameters for each transformation
const transformationParams = {
  //   rotate: { minDegrees: 0, maxDegrees: 360 },
  //   flip: { horizontal: true, vertical: true },
  scale: { minScale: 0.5, maxScale: 1.5 },
  translate: { minX: -50, maxX: 50, minY: -50, maxY: 50 },
  noise: { minAmount: 0.1, maxAmount: 0.3 },
  // brightness: { minFactor: -0.5, maxFactor: 0.5 },
  // contrast: { minFactor: -0.5, maxFactor: 0.5 },
  // color: { minRed: -0.5, maxRed: 0.5, minGreen: -0.5, maxGreen: 0.5, minBlue: -0.5, maxBlue: 0.5 }
};

// Load the original image
for (let index = 0; index <= 1; index++) {
  Jimp.read(`./img/${index}.bmp`)
    .then(image => {
      // Create a directory to save the dataset
      if (!fs.existsSync('dataset')) {
        fs.mkdirSync('dataset');
      }

      // Generate 700 augmented images
      for (let i = 0; i < 500; i++) {
        const transformedImage = image.clone();

        // Apply random transformations
        Object.keys(transformationParams).forEach(transformationName => {
          const params = transformationParams[transformationName];
          const shouldApply = Math.random() < 0.5; // 50% chance of applying each transformation

          if (shouldApply) {
            if (transformationName === 'rotate') {
              const degrees = getRandomNumber(params.minDegrees, params.maxDegrees);
              transformedImage.rotate(degrees);
            } else if (transformationName === 'flip') {
              const horizontal = params.horizontal && Math.random() < 0.5;
              const vertical = params.vertical && Math.random() < 0.5;
              transformedImage.flip(horizontal, vertical);
            } else if (transformationName === 'scale') {
              const scale = getRandomNumber(params.minScale, params.maxScale);
              transformedImage.scale(scale);
            } else if (transformationName === 'translate') {
              const x = Math.max(getRandomNumber(params.minX, params.maxX), 0); // Ensure positive x value
              const y = Math.max(getRandomNumber(params.minY, params.maxY), 0); // Ensure positive y value
              transformedImage.crop(x, y, transformedImage.bitmap.width - x, transformedImage.bitmap.height - y);
            } else if (transformationName === 'noise') {
              const amount = getRandomNumber(params.minAmount, params.maxAmount);
              transformedImage.scan(0, 0, transformedImage.bitmap.width, transformedImage.bitmap.height, function (x, y, idx) {
                // Generate random noise values for each pixel channel
                const noiseR = Math.random() * amount * 255;
                const noiseG = Math.random() * amount * 255;
                const noiseB = Math.random() * amount * 255;
                this.bitmap.data[idx + 0] += noiseR;
                this.bitmap.data[idx + 1] += noiseG;
                this.bitmap.data[idx + 2] += noiseB;
              });
            } else if (transformationName === 'brightness') {
              const factor = getRandomNumber(params.minFactor, params.maxFactor);
              transformedImage.brightness(factor);
            } else if (transformationName === 'contrast') {
              const factor = getRandomNumber(params.minFactor, params.maxFactor);
              transformedImage.contrast(factor);
            }
            // else if (transformationName === 'color') {
            //   const red = getRandomNumber(params.minRed, params.maxRed);
            //   const green = getRandomNumber(params.minGreen, params.maxGreen);
            //   const blue = getRandomNumber(params.minBlue, params.maxBlue);
            //   transformedImage.color([
            //     { apply: 'red', params: [red] },
            //     { apply: 'green', params: [green] },
            //     { apply: 'blue', params: [blue] }
            //   ]);
            // }
          }
        });

        const transformedImageName = `dataset/c${index}/c${index}img${i}.bmp`;
        transformedImage.write(transformedImageName);
        console.log(`Saved ${transformedImageName}`);
      }
    })
    .catch(err => {
      console.error(err);
    });
}
// Helper function to generate a random number within a range
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
