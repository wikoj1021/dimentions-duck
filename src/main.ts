import "./style.css";
import { startGeneration } from "./perlinNoise";
import { Duck } from "./Duck";

const app = document.getElementById("app");
const worldPath = document.getElementById("world") as unknown as SVGPathElement;
const duck = new Duck(app);

startGeneration(worldPath);
duck.init();
