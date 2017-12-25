var img;  // Declare variable 'img'.
var gradient = false

function preload() {
  img = loadImage("img.jpg");
}
function setup() {
  colorMode(RGB)
  img.resize(1200,0)
  createCanvas(img.width, img.height);
  pixelDensity(1);
  // from = color(70, 70, 150);
  // to = color(254, 74, 74);
}

function draw() {
  image(img, 0, 0);
  loadPixels();

  if (gradient == true) {

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
  updatePixels();
}

function getDuotone(value) {
  value = value / 255;
  duotone = lerpColor(from, to, value);

  return duotone;
}

function reset() {
  gradient = false
}

function reverseColor() {
  var one = to
  var two = from

  to = two
  from = one
}

function changeColor(c) {
  gradient = true
  console.log("c: " + c)
  if (c == 'coralRedToLilac') {
    to = color(254, 74, 74)
    from = color(70, 70, 150)
  } else if (c == 'coralRedToCerulean') {
    to = color(254, 74, 74)
    from = color(1, 179, 254)
  } else if (c == 'ceruleanToLilac') {
    to = color(1, 179, 254)
    from = color(70, 70, 150)
  } else if (c == 'ceruleanToSeaGreen') {
    to = color(1, 179, 254)
    from = color(0, 106, 45)
  }
}

new Vue({
  el: '#app',
  data: {
    image: ''
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.image = '';
    }

  }
})
