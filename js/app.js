var img;  // Declare variable 'img'.

function preload() {
  img = loadImage("img/axel.jpg");
}
function setup() {
  colorMode(RGB)
  img.resize(600,0)
  createCanvas(img.width, img.height);
  pixelDensity(1);
  from = color(70, 70, 150);
  to = color(254, 74, 74);
}

function draw() {
  image(img, 0, 0);
  loadPixels();

  for(var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var index = (x + y * width) * 4;

      var gray = (pixels[index] + pixels[index+1] + pixels[index+2]) / 3;

      var duotone = getDuotone(gray)
      pixels[index] = duotone.levels[0];
      pixels[index+1] = duotone.levels[1];
      pixels[index+2] = duotone.levels[2];

    }
  }
  updatePixels();
}

function getDuotone(value) {

  value = value / 255;
  duotone = lerpColor(from, to, value);

  return duotone;
}

function changeColor(yellow) {
  to = color(254, 204, 2)
}
