export class Duck {
  bornPlace: any;
  isJumping: boolean;
  bottom: number;
  constructor(bornPlace: any) {
    this.bornPlace = bornPlace;
    this.isJumping = false;
    this.bottom = 50;
  }

  jump(duckContainer: HTMLDivElement) {
    if (this.isJumping) return;
    let upId = setInterval(() => {
      if (this.bottom === 150) {
        clearInterval(upId);
        console.log(this.bottom);
        let timerDownId = setInterval(() => {
          this.bottom -= 10;
          duckContainer.style.bottom = this.bottom + "px";
          if (this.bottom === 50) {
            clearInterval(timerDownId);
            this.isJumping = false;
            console.log(this.bottom);
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
    duckContainer.style.bottom = this.bottom + "px";

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
