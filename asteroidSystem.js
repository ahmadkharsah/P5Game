class AsteroidSystem {
  constructor() {
    this.locations = [];
    this.velocities = [];
    this.accelerations = [];
    this.diams = [];
    this.asteroids = [];
  }

  run() {
    this.spawn();
    this.move();
    this.draw();
  }

  spawn() {
    if (random(1) < 0.01) {
      this.accelerations.push(createVector(0, random(0.1, 1)));
      this.velocities.push(createVector(0, 0));
      this.locations.push(createVector(random(width), 0));
      this.diams.push(random(30, 50));
      this.asteroids.push({
        location: this.locations[this.locations.length - 1],
        velocity: this.velocities[this.velocities.length - 1],
        acceleration: this.accelerations[this.accelerations.length - 1],
        diameter: this.diams[this.diams.length - 1]
      });
    }
  }

  move() {
    for (let i = 0; i < this.locations.length; i++) {
      this.velocities[i].add(this.accelerations[i]);
      this.locations[i].add(this.velocities[i]);
      this.accelerations[i].mult(0);
    }
  }

  applyForce(f) {
    for (let i = 0; i < this.locations.length; i++) {
      this.accelerations[i].add(f);
    }
  }

  draw() {
    noStroke();
    fill(200);
    let i = 0;
    while (i < this.locations.length) {
      const asteroid = this.asteroids[i];
      if(asteroid != null)
        ellipse(asteroid.location.x, asteroid.location.y, asteroid.diameter, asteroid.diameter);
      i++;
    }
  }

  calcGravity(centerOfMass) {
    for (let i = 0; i < this.locations.length; i++) {
      const asteroid = this.asteroids[i];
      const gravity = p5.Vector.sub(centerOfMass, asteroid.location);
      gravity.normalize();
      gravity.mult(0.001);
      this.applyForce(gravity);
    }
  }

  destroy(index) {
    this.asteroids.splice(index, 1);
    this.locations.splice(index, 1);
    this.velocities.splice(index, 1);
    this.accelerations.splice(index, 1);
    this.diams.splice(index, 1);
  }
}
