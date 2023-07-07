const Jimp = require("jimp");

function dataToPng(data, picName) {
  // Calculate the width and height of the image
  let width = Math.sqrt(data.length);
  let height = Math.sqrt(data.length);

  // Create a new image
  let image = new Jimp(width, height, function (err, image) {
    if (err) throw err;

    // Loop through every pixel in the image
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let value = data[y * width + x];
        let color = Jimp.rgbaToInt(value, value, value, 255); // Convert grayscale to RGBA

        image.setPixelColor(color, x, y);
      }
    }

    // Save the image
    image.write("pics/" + picName + "_output.png", (err) => {
      if (err) throw err;
      console.log("Image saved!");
    });
  });
}

module.exports = dataToPng;
