var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();

  spaceship.run();
  asteroids.run();

  drawEarth();

  checkCollisions(spaceship, asteroids); // function that checks collision between various elements
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  //draw earth
  fill(100,255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
// Checks collisions between all types of bodies
// Checks collisions between all types of bodies
function checkCollisions() {
  // Asteroid-earth collisions
  for (let i = 0; i < asteroids.asteroids.length; i++) {
    const asteroid = asteroids.asteroids[i];
    if (isInside(asteroid.location, createVector(asteroid.size, asteroid.size), earthLoc, earthSize)) {
      gameOver();
    }
  }

  // Spaceship-earth collision
  if (isInside(spaceship.location, createVector(spaceship.size, spaceship.size), earthLoc, earthSize)) {
    gameOver();
  }

  // Spaceship-asteroid collision
  for (let i = 0; i < asteroids.asteroids.length; i++) {
    const asteroid = asteroids.asteroids[i];
    if (isInside(spaceship.location, createVector(spaceship.size, spaceship.size), asteroid.location, createVector(asteroid.size, asteroid.size))) {
      gameOver();
    }
  }

  // Spaceship-atmosphere collision
  if (isInside(spaceship.location, createVector(spaceship.size, spaceship.size), atmosphereLoc, atmosphereSize)) {
    spaceship.setNearEarth();
  }

  // Bullet collisions
  const bullets = spaceship.bulletSys.bullets;
  for (let i = bullets.length - 1; i >= 0; i--) {
    const bullet = bullets[i];
    for (let j = asteroids.asteroids.length - 1; j >= 0; j--) {
      const asteroid = asteroids.asteroids[j];
      if (isInside(createVector(bullet.x,bullet.y), createVector(spaceship.bulletSys.diam, spaceship.bulletSys.diam), asteroid.location,asteroid.diameter)) {
        asteroids.asteroids.splice(j, 1);
        bullets.splice(i, 1);
        break;
      }
    }
  }
}
//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB){
  const distance = dist(locA.x, locA.y, locB.x, locB.y);
  const radiusA = sizeA.x / 2;
  const radiusB = sizeB.x / 2;

  if (distance < radiusA + radiusB) {
    return true; // Collision detected
    console.log(Crash);
  }
  return false; // No collisio
  console.log(safe);
}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2)
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}
