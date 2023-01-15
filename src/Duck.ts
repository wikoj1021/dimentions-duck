export class Duck {
  bornPlace: SVGPathElement;
  isJumping: boolean;
  bottom: number;
  initBottom: number;
  jumpHeight: number;
  constructor(bornPlace: SVGPathElement) {
    this.bornPlace = bornPlace;
    this.isJumping = false;
    this.bottom = -20;
    this.initBottom = -20;
    this.jumpHeight = 100;
  }

  createDuck() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("id", "Layer_1");
    svg.setAttribute("y", `${this.initBottom}`);
    svg.setAttribute("x", "-150px");
    svg.setAttribute("viewBox", "0 0 500 500");
    this.bornPlace.appendChild(svg);

    const g1 = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g1.setAttribute("stroke-width", "0");
    const g2 = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g2.setAttribute("stroke-linecap", "round");
    g2.setAttribute("stroke-linejoin", "round");
    const g3 = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svg.appendChild(g1);
    svg.appendChild(g2);
    svg.appendChild(g3);

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("id", "Layer_1");
    g.style.position = "absolute";
    g.style.transformOrigin = "50%";
    g.style.transform = "scale(0.1) matrix(-1, 0, 0, 1, 0, 0)";
    g3.appendChild(g);

    const path1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    path1.setAttribute("style", "fill:#B36F0F;");
    path1.setAttribute(
      "d",
      "M187.289,262.762c-8.178,0-14.808,6.63-14.808,14.81v77.403h-27.785c-6.82,0-12.349,5.529-12.349,12.349s5.529,12.349,12.349,12.349h45.053c6.82,0,12.349-5.529,12.349-12.349v-89.752C202.098,269.393,195.468,262.762,187.289,262.762z"
    );
    g.appendChild(path1);

    const path2 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    path2.setAttribute("style", "fill:#D98712;");
    path2.setAttribute(
      "d",
      "M249.866,262.762c-8.178,0-14.808,6.63-14.808,14.81v77.403h-27.785c-6.82,0-12.349,5.529-12.349,12.349s5.529,12.349,12.349,12.349h45.053c6.82,0,12.349-5.529,12.349-12.349v-89.752C264.675,269.393,258.045,262.762,249.866,262.762z"
    );
    g.appendChild(path2);

    const path3 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    path3.setAttribute("style", "fill:#FFB648;");
    path3.setAttribute(
      "d",
      "M342.656,131.671c-7.899,0-14.303,6.404-14.303,14.303v4.517c-15.239-13.679-35.378-22.008-57.467-22.008h-59.717v-39.35c0-37.521-27.244-68.662-63.024-74.769l1.265-1.265c2.577-2.578,2.577-6.755,0-9.333c-2.577-2.576-6.756-2.576-9.333,0l-4.854,4.853v-2.02c0-3.644-2.954-6.599-6.599-6.599c-3.644,0-6.599,2.955-6.599,6.599v7.841c-35.573,6.28-62.604,37.32-62.604,74.694v100.611c0,61.239,49.646,110.885,110.885,110.885h100.579c47.537,0,86.073-38.537,86.073-86.073v-68.582C356.959,138.075,350.555,131.671,342.656,131.671z"
    );
    g.appendChild(path3);

    const path4 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    path4.setAttribute("style", "fill:#FF9E16;");
    path4.setAttribute(
      "d",
      "M292.771,172.76c1.799,0,3.257,1.458,3.257,3.256l0.019,0.001c-1.713,45.831-39.409,82.462-85.659,82.462s-83.946-36.631-85.658-82.462l0.019-0.001c0-1.798,1.458-3.256,3.256-3.256L292.771,172.76L292.771,172.76z"
    );
    g.appendChild(path4);

    const path5 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    path5.setAttribute("style", "fill:#D98712;");
    path5.setAttribute(
      "d",
      "M105.839,92.885H45.5c-12.584,0-22.785,10.201-22.785,22.786c0,12.583,10.201,22.784,22.785,22.784 h60.339c12.583,0,22.786-10.201,22.786-22.784C128.624,103.086,118.422,92.885,105.839,92.885z"
    );
    g.appendChild(path5);

    const eye = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    eye.setAttribute("style", "fill:#333E48;");
    eye.setAttribute("cx", "131.681");
    eye.setAttribute("cy", "73.226");
    eye.setAttribute("r", "7.97");
    g.appendChild(eye);
  }

  jump(duckContainer: any) {
    if (this.isJumping) return;
    let upId = setInterval(() => {
      if (this.bottom === this.initBottom - this.jumpHeight) {
        clearInterval(upId);
        let timerDownId = setInterval(() => {
          this.bottom += 10;
          duckContainer.setAttribute("y", `${this.bottom}px`);
          if (this.bottom === this.initBottom) {
            clearInterval(timerDownId);
            this.isJumping = false;
          }
        }, 20);
      }
      this.isJumping = true;
      this.bottom -= 10;
      duckContainer.setAttribute("y", `${this.bottom}px`);
    }, 20);
  }
  init() {
    this.createDuck();
    const duckContainer = document.getElementById("Layer_1");

    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.code === "Space") {
        this.jump(duckContainer);
      }
    });
  }
}
