export default class Symbol {
  constructor(texture, symbolSize) {
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.anchor.set(0.5);
    this.setSize(symbolSize);
  }

  setPosition(x, y) {
    this.sprite.x = x;
    this.sprite.y = y;
  }

  setTexture(texture) {
    this.sprite.texture = texture;
    this.setSize(this.symbolSize);
  }

  setSize(symbolSize) {
    this.symbolSize = symbolSize;
    const scale = Math.min(
      symbolSize / this.sprite.texture.width,
      symbolSize / this.sprite.texture.height
    );
    this.sprite.scale.set(scale, scale);
    this.sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  }
}
