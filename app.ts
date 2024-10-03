import { s } from "vite/dist/node/types.d-aGj9QkWt";
import Game from "./Game";

window.onload = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const fps = document.getElementById("fps") as HTMLDivElement;
  const button = document.getElementById("start") as HTMLButtonElement;
  const score = document.getElementById("score") as HTMLDivElement;

  const game = new Game(canvas, score, fps);
};
