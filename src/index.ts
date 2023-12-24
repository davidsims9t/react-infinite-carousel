import React from "react";
import { loadImage } from "./utils/image";

const placeholderImg = "https://placehold.co/300x200";
const numImages = 10;
const imgWidth = 300;
const imgHeight = 200;
const offset = 20;
const canvasWidth = (numImages * imgWidth) + (offset * numImages);
const canvasWrapperWidth = canvasWidth * 2;
const canvasDelta = {0: 0, 1: 0};
const canvasPos = {0: 0, 1: 1};
const dir = -1;
const speed = 3;
const vel = dir * speed;
let frame;

async function loadCanvas(ref) {
  const img = await loadImage(placeholderImg);

  const ctx = ref.current.getContext("2d");
  ctx.canvas.width = canvasWidth * 2;
  ctx.canvas.height = imgHeight;

  const [img1, img2] = await Promise.all([
    drawCanvas(ctx, img),
    drawCanvas(ctx, img, 1)
  ]);
  
  animate(ctx, img1, img2);
}

async function drawCanvas(ctx, img, numCanvas = 0) {
  const canvas = document.createElement('canvas');
  const ctx2 = canvas.getContext('2d');
  ctx2.canvas.width = canvasWidth;
  ctx2.canvas.height = imgHeight;
  
  for (let i = 0; i < numImages; i++) {
    // The offset of the image e.g.
    // The first image for the first is (0 * 300) = 0
    // The second image for the first frame is (1 * 300) = 320
    const dx = (i * imgWidth) + (offset * i);
    ctx2.drawImage(img, dx, 0);
  }
  
  const ctxImg = await loadImage(canvas.toDataURL());
  
  return ctxImg;
}

const animate = (ctx, img1, img2) => {
  // console.log(img1, img2);
  ctx.clearRect(0, 0, canvasWrapperWidth, imgHeight);
  
  // Where to start drawing the canvas = (canvas 0 or 1 * 960) + (margin/offset * 0 or 1) + velocity
  const dx1 = (canvasPos[0] * canvasWidth) + canvasDelta[0];
  const dx2 = (canvasPos[1] * canvasWidth) + canvasDelta[1];
  
  // How fast to animate the images per frame e.g. 1 pixel per frame and the direction -1 or left and 1 for right
  canvasDelta[0] = (canvasDelta[0] + vel) % (canvasWidth * 2);
  canvasDelta[1] = (canvasDelta[1] + vel) % (canvasWidth * 2);
  
  ctx.drawImage(img1, dx1, 0);
  ctx.drawImage(img2, dx2, 0);

  frame = window.requestAnimationFrame(() => {
    // If the canvas has gone offscreen switch the canvas number so it's at the end of the visible canvas
    if (dx1 <= -canvasWidth) {
      canvasPos[0] = 1;
      canvasDelta[0] = 0;
    }
    
    animate(ctx, img1, img2);
  });
};

const App = () => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    if (!canvasRef) return;

    loadCanvas(canvasRef);
    
    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [canvasRef]);

  return (
    <div className="carousel-wrapper">
      <canvas ref={canvasRef} />
    </div>
  );
};

const dom = document.querySelector("#app");
const root = ReactDOM.createRoot(dom);
root.render(<App />);
