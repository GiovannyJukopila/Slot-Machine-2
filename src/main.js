import SlotMachine from "./slotMachine.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x000000,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
  });

  document.body.appendChild(app.view);

  const textures = [
    PIXI.Texture.from("images/cherry.png"),
    PIXI.Texture.from("images/banana.png"),
    PIXI.Texture.from("images/melon.png"),
  ];

  const symbolSize = Math.min(window.innerWidth, window.innerHeight) / 4;
  const reelWidth = symbolSize;

  const slotMachine = new SlotMachine(app, textures, symbolSize, reelWidth);

  const spinButton = document.createElement("button");
  spinButton.id = "spinButton";
  spinButton.innerText = "Spin";
  document.body.appendChild(spinButton);
  spinButton.addEventListener("click", () => slotMachine.spin());

  window.addEventListener("resize", () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    slotMachine.resize(Math.min(window.innerWidth, window.innerHeight) / 4);
  });
});
