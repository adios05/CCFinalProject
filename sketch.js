let opening, second, backgroundImage, final, ship, blastOff;
let state = 0;
let score = 0;
let ufo, rocket;

function preload() {
  opening = loadImage("Start/opening.gif");
  second = loadImage("Start/second.gif");
  backgroundImage = loadImage("background/PaperSpaceBackground.png");
  ship = loadImage("movingTargets/UFOStuff.gif");
  blastOff = loadImage("movingTargets/BlastOff.gif");
  final = loadImage("Start/FinalScreen.gif");
}

function setup() {
 var canvas = createCanvas(700, 400);
  canvas.parent("sketch-holder");
  ufo = new UFO(random(width), random(height), random(1, 10));
  rocket = new Rocket(random(width), height, random(1, 10));
}

function draw() {
  switch (state) {
    case 0:
      image(opening, 0, 0, width, height);
      break;

    case 1:
      image(ship, 0, 0, width, height);
      break;

    case 2:
      image(second, 0, 0, width, height);
      break;

    case 3:
      image(blastOff, 0, 0, width, height);
      break;

    case 4:
      // Main gameplay
      background(255);
      backgroundImage.resize(700, 400);
      imageMode(CENTER);
      image(backgroundImage, width / 2, height / 2);

      
      ufo.update();
      ufo.display();

      rocket.update();
      rocket.display();

      // Display score
      displayScore();

      // Check if score reaches 50
      if (score >= 50) {
        state = 5; 
      }

      
      drawCursor();
      break;

    case 5:
      background(255);
      image(final, width/2, height/2, width, height);
      break;
  }
}

function keyPressed() {
  if (key == " ") {
    state++;
    if (state > 4) 
    {
      state = 4;
    }  
    }
    
    if (key == "s") 
    {
    saveCanvas("myCanvas", "png");
    }

}

function mousePressed() {
  
  if (state === 4) {
    ufo.clicked(mouseX, mouseY);
    rocket.clicked(mouseX, mouseY);
  }
}

function displayScore() {
  textSize(16);
  fill(0);
  noStroke();
  text(`Score: ${score}`, 10, 20);
}

function drawCursor() {
  fill(150);
  stroke(0);
  strokeWeight(3);
  circle(mouseX, mouseY, 20);
}

// UFO Class
class UFO {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.speed = speed;
    this.direction = random([-1, 1]);
  }

  update() {
    this.x += this.speed * this.direction;
    if (this.x > width + this.size / 2) {
      this.x = -this.size / 2;
    } else if (this.x < -this.size / 2) {
      this.x = width + this.size / 2;
    }
  }

  display() {
    stroke(0);
    strokeWeight(4);
    noFill();

    ellipse(this.x, this.y, this.size * 1.5, this.size); // UFO body
    ellipse(this.x, this.y - this.size / 4, this.size, this.size / 2); // Dome

    // Antennas
    line(
      this.x - 15,
      this.y - this.size / 2,
      this.x - 15,
      this.y - this.size / 2 - 20
    );
    line(
      this.x + 15,
      this.y - this.size / 2,
      this.x + 15,
      this.y - this.size / 2 - 20
    );

    // Antenna tips
    ellipse(this.x - 15, this.y - this.size / 2 - 20, 6, 6);
    ellipse(this.x + 15, this.y - this.size / 2 - 20, 6, 6);
  }

  clicked(mx, my) {
    if (dist(mx, my, this.x, this.y) < this.size / 2) {
      score++;
      this.x = random(width);
      this.y = random(height);
    }
  }
}

// Rocket Class
class Rocket {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.speed = speed;
  }

  update() {
    this.y -= this.speed;
    if (this.y < -this.size) {
      this.y = height + this.size;
    }
  }

  display() {
    stroke(0);
    strokeWeight(4);
    noFill();

    // Rocket body
    ellipse(this.x, this.y, this.size / 2, this.size * 1.5);

    // Rocket nose cone
    triangle(
      this.x - this.size / 4,
      this.y - this.size * 0.75,
      this.x + this.size / 4,
      this.y - this.size * 0.75,
      this.x,
      this.y - this.size
    );

    // Rocket fins
    triangle(
      this.x - this.size / 3,
      this.y + this.size / 2,
      this.x - this.size / 1.5,
      this.y + this.size,
      this.x - this.size / 3,
      this.y + this.size
    );

    triangle(
      this.x + this.size / 3,
      this.y + this.size / 2,
      this.x + this.size / 1.5,
      this.y + this.size,
      this.x + this.size / 3,
      this.y + this.size
    );

    // Rocket window
    ellipse(this.x, this.y - (this.size + 2) / 4, this.size / 4);
  }

  clicked(mx, my) {
    if (dist(mx, my, this.x, this.y) < this.size) {
      score++;
      this.x = random(width);
      this.y = height;
    }
  }
}
