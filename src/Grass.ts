export class Grass {
  parentNode: HTMLDivElement;
  constructor(parentNode: HTMLDivElement) {
    this.parentNode = parentNode;
  }

  init() {
    const grass = document.createElement("div");
    grass.classList.add("grass");

    this.parentNode.appendChild(grass);

    function generateRocks() {
      let randomTime = Math.random() * 4000;
      let rockPosition = 460;
      let rock = document.createElement("div");
      rock.classList.add("rock");
      grass.appendChild(rock);
      rock.style.left = rockPosition + "px";

      let timerId = setInterval(() => {
        rockPosition -= 10;
        rock.style.left = rockPosition + "px";
      }, 20);
      setTimeout(generateRocks, randomTime);
    }
    generateRocks();
  }
}
