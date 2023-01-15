import "./style.css";
import { startGeneration } from "./perlinNoise";
import { Duck } from "./Duck";

const map = document.getElementById("map") as unknown as SVGPathElement;
const worldPath = document.getElementById("world") as unknown as SVGPathElement;
const duck = new Duck(map as SVGPathElement);

startGeneration(worldPath);
duck.init();
