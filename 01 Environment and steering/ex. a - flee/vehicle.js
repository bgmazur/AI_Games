class Vehicle {
    constructor(x, y) {
      this.acceleration = createVector(0, 0);
      this.velocity = createVector(0, -2);
      this.position = createVector(x, y);
      this.r = 6;
      this.maxspeed = 2;
      this.maxforce = 0.1;

      this.wanderTheta = PI/2;
    }
  
    // Method to update location
    update() {
      // Update velocity
      this.velocity.add(this.acceleration);
      // Limit speed
      this.velocity.limit(this.maxspeed);
      this.position.add(this.velocity);
      // Reset accelerationelertion to 0 each cycle
      this.acceleration.mult(0);
    }
  
    applyForce(force) {
      // We could add mass here if we want A = F / M
      this.acceleration.add(force);
    }
  
    // A method that calculates a steering force towards a target
    // STEER = DESIRED MINUS VELOCITY
    wanderInsideArea(target) {
      let d = 40;
      let avoidanceRadius = 120;
      let desired = null;
    
      let mouseVector = p5.Vector.sub(this.position, target);
      
      if(mouseVector.mag() < avoidanceRadius){
        this.flee(mouseVector)
      }
  
      if (this.position.x < d) {
        desired = createVector(this.maxspeed, this.velocity.y);
      } else if (this.position.x > width - d) {
        desired = createVector(-this.maxspeed, this.velocity.y);
      }
  
      if (this.position.y < d) {
        desired = createVector(this.velocity.x, this.maxspeed);
      } else if (this.position.y > height - d) {
        desired = createVector(this.velocity.x, -this.maxspeed);
      }
  
      if (desired !== null) {
        desired.normalize();
        desired.mult(this.maxspeed);
        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);
        this.applyForce(steer);
      }
    }

    flee(mouseVector){
      mouseVector.setMag(this.maxspeed);

      var steer = p5.Vector.sub(mouseVector, this.velocity);
      steer.limit(this.maxforce);
  
      this.applyForce(steer);
    }
  
    display() {
      // Draw a triangle rotated in the direction of velocity
      let theta = this.velocity.heading() + PI / 2;
      fill(127);
      stroke(200);
      strokeWeight(1);
      push();
      translate(this.position.x, this.position.y);
      rotate(theta);
      beginShape();
      vertex(0, -this.r * 2);
      vertex(-this.r, this.r * 2);
      vertex(this.r, this.r * 2);
      endShape(CLOSE);
      pop();
    }
  }
  