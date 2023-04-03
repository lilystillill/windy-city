let particles = [];
const num = 1000;

const noiseScale = 0.01/2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i = 0; i < num; i ++) {
    particles.push(new Particle(random(width), random(height)));
  }
  
  stroke(255, 50);
  clear();
}

function draw() {
  background(0);
  for(let i = 0; i < num; i ++) {
    let p = particles[i];
    p.update();
    p.show();
    if(!onScreen(p.pos) && frameCount < 1000) {
      p.pos.x = random(width);
      p.pos.y = random(height);
    }
  }
}

function mouseReleased() {
  noiseSeed(millis());
}

function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 4;
    this.prevPos = this.pos.copy();
    this.color = color(random(20, 40), random(150, 255), random(200, 255), 100);
  }

  update() {
    let n = noise(this.pos.x * noiseScale, this.pos.y * noiseScale, frameCount * noiseScale * noiseScale);
    let angle = n * TAU;
    let direction = p5.Vector.fromAngle(angle);
    direction.mult(0.5);
    this.acc.add(direction);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.prevPos = this.pos.copy();
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    stroke(this.color);
    strokeWeight(2);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, 4, 4);
  }
}
