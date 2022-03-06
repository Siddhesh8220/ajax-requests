class QueenAttack {
  constructor(a, b, c, d) {
    this.queenBlack = {
      x: a,
      y: b,
    };
    this.queenWhite = {
      x: c,
      y: d,
    };
  }
  canAttack() {
    if (this.queenBlack.x == this.queenWhite.x) {
      console.log("Can Attack");
      return;
    }

    if (this.queenWhite.y == this.queenBlack.y) {
      console.log("Can Attack");
      return;
    }

    if (
      Math.abs(this.queenBlack.x - this.queenWhite.x) ==
      Math.abs(this.queenWhite.y - this.queenBlack.y)
    ) {
      console.log("Can Attack");
      return;
    }

    console.log("Can't Attack");
    return false;
  }
}

const match = new QueenAttack(0, 0, 3, 1);
match.canAttack();
