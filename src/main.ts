import "./style.css";
import {startGeneration} from "./perlinNoise";

const worldPath = document.getElementById("world") as unknown as SVGPathElement;

startGeneration(worldPath);