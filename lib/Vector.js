class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(other) {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  neg() {
    return new Vector(-this.x, -this.y);
  }

  sub(other) {
    return this.add(other.neg())
  }

  length() {
    return Math.hypot(this.x, this.y);
  }


  mult(scalar) {
    return new Vector(this.x * scalar, this.y * scalar)
  }

  unit() {
    return this.mult(1 / this.length())
  }

  rotate(a) {
    return new Vector(
      Math.cos(a) * this.x - Math.sin(a) * this.y,
      Math.sin(a) * this.x + Math.cos(a) * this.y
    );
  }
}

module.exports = Vector


