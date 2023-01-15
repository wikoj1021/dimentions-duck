import "./style.css";
import { startGeneration } from "./perlinNoise";
import { Portal } from "./Portal";

const map = document.getElementById("map") as unknown as SVGPathElement;
const worldPath = document.getElementById("world") as unknown as SVGPathElement;
const portal = new Portal(map);

startGeneration(worldPath);
portal.init();
