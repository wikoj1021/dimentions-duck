export class Duck {
  bornPlace: HTMLDivElement;
  isJumping: boolean;
  bottom: number;
  initBottom: number;
  jumpHeight: number;
  constructor(bornPlace: HTMLDivElement) {
    this.bornPlace = bornPlace;
    this.isJumping = false;
    this.bottom = 50;
    this.initBottom = 50;
    this.jumpHeight = 100;
  }

  jump(duckContainer: HTMLDivElement) {
    if (this.isJumping) return;
    let upId = setInterval(() => {
      if (this.bottom === this.initBottom + this.jumpHeight) {
        clearInterval(upId);
        let timerDownId = setInterval(() => {
          this.bottom -= 10;
          duckContainer.style.bottom = this.bottom + "px";
          if (this.bottom === this.initBottom) {
            clearInterval(timerDownId);
            this.isJumping = false;
          }
        }, 20);
      }
      this.isJumping = true;
      this.bottom += 10;
      duckContainer.style.bottom = this.bottom + "px";
    }, 20);
  }
  init() {
    const duckContainer = document.createElement("div");
    duckContainer.classList.add("duck-container");
    duckContainer.style.bottom = this.initBottom + "px";

    const duck = document.createElement("div");
    duck.classList.add("duck");

    this.bornPlace.appendChild(duckContainer);
    duckContainer.appendChild(duck);

    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.code === "Space") {
        this.jump(duckContainer);
      }
    });
  }
}
