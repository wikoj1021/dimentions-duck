import "./style.css";
import { startGeneration } from "./perlinNoise";
import { Duck } from "./Duck";
import { Grass } from "./Grass";

const app = document.getElementById("app");
const worldPath = document.getElementById("world") as unknown as SVGPathElement;
const duck = new Duck(app as HTMLDivElement);
const grass = new Grass(app as HTMLDivElement);

startGeneration(worldPath);
grass.init();
duck.init();
