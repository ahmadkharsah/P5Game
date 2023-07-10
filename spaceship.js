class Spaceship {

  constructor(){
    this.velocity = createVector(0, 0);
    this.location = createVector(width/2, height/2);
    this.acceleration = createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 50;
  }

  run(){
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }

  draw() {
    fill(124,90,78);
  
    // Draw spaceship body
    triangle(
      this.location.x - this.size / 2, this.location.y + this.size / 2,
      this.location.x + this.size / 2, this.location.y + this.size / 2,
      this.location.x, this.location.y - this.size / 2
    );
  
    // Calculate jet thruster positions
    const leftThrusterPos = createVector(
      this.location.x - this.size / 2,
      this.location.y + this.size / 2
    );
    const rightThrusterPos = createVector(
      this.location.x + this.size / 2,
      this.location.y + this.size / 2
    );
  
    // Determine which thruster to activate based on spaceship movement
    const leftThrusterActive = this.velocity.x > 0;
    const rightThrusterActive = this.velocity.x < 0;
  
    // Draw left thruster
    if (leftThrusterActive) {
      fill(255, 0, 0); // Red color
      triangle(
        leftThrusterPos.x, leftThrusterPos.y,
        leftThrusterPos.x - 10, leftThrusterPos.y + 15,
        leftThrusterPos.x + 10, leftThrusterPos.y + 15
      );
    }
  
    // Draw right thruster
    if (rightThrusterActive) {
      fill(255, 0, 0); // Red color
      triangle(
        rightThrusterPos.x, rightThrusterPos.y,
        rightThrusterPos.x - 10, rightThrusterPos.y + 15,
        rightThrusterPos.x + 10, rightThrusterPos.y + 15
      );
    }
  }
  move(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVelocity);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(f){
    this.acceleration.add(f);
  }

  interaction(){
    if (keyIsDown(LEFT_ARROW)){
      this.applyForce(createVector(-0.1, 0));
    }
    if (keyIsDown(RIGHT_ARROW)){
      this.applyForce(createVector(0.1, 0));
    }
    if (keyIsDown(UP_ARROW)){
      this.applyForce(createVector(0, -0.1));
    }
    if (keyIsDown(DOWN_ARROW)){
      this.applyForce(createVector(0, 0.1));
    }
  }

  fire(){
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  edges(){
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }

  setNearEarth() {
    const gravity = createVector(0, 0.05);
    this.applyForce(gravity);
  
    const friction = this.velocity.copy();
    friction.mult(-0.03);
    this.applyForce(friction);
  }
}