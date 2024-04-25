export class CanvasTemplate {
  constructor(canvas, background, imageSrc, caption, ctaText) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.background = background;
      this.caption = caption;
      this.ctaText = ctaText;

      this.image = new Image();
      if (imageSrc) {
          this.image.src = imageSrc;
          this.image.onload = () => {
              this.draw(); 
          };
      }
  }

  draw() {
      this.clearCanvas();
      this.drawBackground();
      if (this.image.complete) {
          this.drawImage();
      }
      this.drawText();
      this.drawCTA();
  }

  clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackground() {
      this.ctx.fillStyle = this.background;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  drawImage() {
    const padding = 20; 
    const imageAvailableWidth = this.canvas.width - 2 * padding;
    const imageAvailableHeight = this.canvas.height * 0.7 - 2 * padding;
    const imageRatio = this.image.naturalWidth / this.image.naturalHeight;

 
    let imageWidth, imageHeight;
    if (this.image.naturalWidth > this.image.naturalHeight) {
        imageWidth = imageAvailableWidth;
        imageHeight = imageWidth / imageRatio;
    } else {
        imageHeight = imageAvailableHeight;
        imageWidth = imageHeight * imageRatio;
    }

    if (imageWidth > imageAvailableWidth) {
        imageWidth = imageAvailableWidth;
        imageHeight = imageWidth / imageRatio;
    }
    if (imageHeight > imageAvailableHeight) {
        imageHeight = imageAvailableHeight;
        imageWidth = imageHeight * imageRatio;
    }

    const imageX = padding + (imageAvailableWidth - imageWidth) / 2; 
    const imageY = padding; 
    this.ctx.drawImage(this.image, imageX, imageY, imageWidth, imageHeight);
}

  drawText() {
      const margin = 40;
      const maxWidth = this.canvas.width / 2; 
      const textX = margin;
      const textY = this.canvas.height * 0.7 + 50; 
      this.ctx.fillStyle = "#000";
      this.ctx.font = "24px Arial";
      this.wrapText(this.caption, textX, textY, maxWidth, 28); 
  }

  wrapText(text, x, y, maxWidth, lineHeight) {
      const words = text.split(' ');
      let line = '';

      for (let n = 0; n < words.length; n++) {
          let testLine = line + words[n] + ' ';
          let metrics = this.ctx.measureText(testLine);
          let testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
              this.ctx.fillText(line, x, y);
              line = words[n] + ' ';
              y += lineHeight; 
          } else {
              line = testLine;
          }
      }
      this.ctx.fillText(line, x, y); 
  }

  drawCTA() {
      const buttonWidth = 200;
      const buttonHeight = 50;
      const horizontalMargin = 40;
      const buttonX = this.canvas.width - buttonWidth - horizontalMargin; 
      const buttonY = this.canvas.height * 0.7 + 50; 
      this.ctx.fillStyle = "#FFF";
      this.ctx.beginPath();
      this.ctx.moveTo(buttonX + 10, buttonY); 
      this.ctx.arcTo(buttonX + buttonWidth, buttonY, buttonX + buttonWidth, buttonY + buttonHeight, 10);
      this.ctx.arcTo(buttonX + buttonWidth, buttonY + buttonHeight, buttonX, buttonY + buttonHeight, 10);
      this.ctx.arcTo(buttonX, buttonY + buttonHeight, buttonX, buttonY, 10);
      this.ctx.arcTo(buttonX, buttonY, buttonX + buttonWidth, buttonY, 10);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.fillStyle = "#000";
      this.ctx.font = "20px Arial";
      const ctaTextWidth = this.ctx.measureText(this.ctaText).width;
      const textX = buttonX + (buttonWidth - ctaTextWidth) / 2; 
      const textY = buttonY + 35; 
      this.ctx.fillText(this.ctaText, textX, textY);
  }
}
