import Symbol from "./symbol.js";

export default class Reel {
  constructor(textures, x, y, symbolSize) {
    this.container = new PIXI.Container();
    this.container.x = x;
    this.container.y = y;
    this.textures = textures;
    this.symbols = [];
    this.position = 0;
    this.previousPosition = 0;
    this.symbolSize = symbolSize;

    for (let i = 0; i < 3; i++) {
      const texture = textures[Math.floor(Math.random() * textures.length)];
      const symbol = new Symbol(texture, symbolSize);
      symbol.setPosition(symbolSize / 2, i * symbolSize + symbolSize / 2);
      this.symbols.push(symbol);
      this.container.addChild(symbol.sprite);
    }
  }

  spin(targetPosition, time, callback) {
    const startTime = Date.now();
    const startPosition = this.position;

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const t = Math.min(elapsed / time, 1);

      this.position =
        startPosition +
        (targetPosition - startPosition) * createjs.Ease.getPowOut(3)(t);
      this.update();

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        this.previousPosition = targetPosition % this.symbols.length;
        if (callback) callback();
      }
    };

    animate();
  }

  update(final = false) {
    for (let i = 0; i < this.symbols.length; i++) {
      const symbol = this.symbols[i];
      const prevY = symbol.sprite.y;
      const newY =
        ((this.position + i) % this.symbols.length) * this.symbolSize +
        this.symbolSize / 2 -
        this.symbolSize;
      symbol.sprite.y = newY;

      if (final && newY >= 0 && newY < this.symbolSize * 3) {
        symbol.sprite.y = (i % this.symbols.length) * this.symbolSize;
      }

      if (symbol.sprite.y < 0 && prevY > this.symbolSize) {
        symbol.setTexture(
          this.textures[Math.floor(Math.random() * this.textures.length)]
        );
      }
    }
  }

  resize(symbolSize) {
    this.symbolSize = symbolSize;
    for (let i = 0; i < this.symbols.length; i++) {
      const symbol = this.symbols[i];
      symbol.setSize(symbolSize);
      symbol.setPosition(symbolSize / 2, i * symbolSize + symbolSize / 2);
    }
    this.update();
  }
}
