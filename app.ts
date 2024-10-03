import Game from "./Game";

window.onload = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const fps = document.getElementById("fps") as HTMLDivElement;
  const button = document.getElementById("start") as HTMLButtonElement;

  const game = new Game(canvas);
};
