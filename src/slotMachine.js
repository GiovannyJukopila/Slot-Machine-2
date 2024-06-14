import Reel from "./reel.js";

export default class SlotMachine {
  constructor(app, textures, symbolSize, reelWidth) {
    this.app = app;
    this.textures = textures;
    this.symbolSize = symbolSize;
    this.reelWidth = reelWidth;

    this.reels = [];
    this.reelContainer = new PIXI.Container();

    const middleRowBackground = new PIXI.Graphics();
    middleRowBackground.beginFill(0xff0000, 0.2);
    middleRowBackground.drawRect(
      0,
      this.symbolSize,
      this.reelWidth * 3,
      this.symbolSize
    );
    middleRowBackground.endFill();
    this.reelContainer.addChild(middleRowBackground);

    for (let i = 0; i < 3; i++) {
      const reel = new Reel(textures, i * reelWidth, 0, symbolSize);
      this.reelContainer.addChild(reel.container);
      this.reels.push(reel);
    }

    this.app.stage.addChild(this.reelContainer);

    this.reelContainer.x = (this.app.screen.width - this.reelWidth * 3) / 2;
    this.reelContainer.y = (this.app.screen.height - this.symbolSize * 3) / 2;
  }

  spin() {
    const extra = Math.floor(Math.random() * 3);
    for (let i = 0; i < this.reels.length; i++) {
      const reel = this.reels[i];
      const targetPosition = reel.position + 10 + extra;
      reel.spin(targetPosition, 2500, () => {
        if (i === this.reels.length - 1) {
          this.correctSymbolPosition(reel);
        }
      });
    }
  }

  correctSymbolPosition(reel) {
    for (let i = 0; i < reel.symbols.length; i++) {
      const symbol = reel.symbols[i];
      symbol.sprite.y =
        ((reel.position + i) % reel.symbols.length) * reel.symbolSize +
        reel.symbolSize / 2 -
        reel.symbolSize;
    }
  }

  resize(symbolSize) {
    this.symbolSize = symbolSize;
    this.reelWidth = symbolSize;
    for (let i = 0; i < this.reels.length; i++) {
      const reel = this.reels[i];
      reel.resize(symbolSize);
      reel.container.x = i * this.reelWidth;
    }
    this.reelContainer.x = (this.app.screen.width - this.reelWidth * 3) / 2;
    this.reelContainer.y = (this.app.screen.height - this.symbolSize * 3) / 2;

    this.reelContainer.children[0].clear();
    this.reelContainer.children[0].beginFill(0xff0000, 0.2);
    this.reelContainer.children[0].drawRect(
      0,
      this.symbolSize,
      this.reelWidth * 3,
      this.symbolSize
    );
    this.reelContainer.children[0].endFill();
  }
}
