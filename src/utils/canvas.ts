import { MutableRefObject } from "react";
import { getAvgImageHeight, getAvgImageWidth, getAvgImageWidthWindow, imagesSpanViewport, loadImage } from "./image";
import type { LoadImageResponse } from "./image";
import { CarouselProps } from "../components/Carousel";

const canvasDelta = { 0: 0, 1: 0 };

type LoadCanvasProps = CarouselProps & {
    ref: MutableRefObject<HTMLCanvasElement>;
    frame: MutableRefObject<number>;
};

type DrawCanvasesProps = Pick<LoadCanvasProps, "margin"> & Pick<ReturnType<typeof getDimensions>, "canvasWidth" | "imgWidth" | "imgHeight"> & {
    images: LoadImageResponse[];
};

type DimensionProps = Omit<CarouselProps, "children"> & {
    images: HTMLImageElement[];
};

type AnimateProps = Omit<LoadCanvasProps, "children" | "imgWidth" | "ref"> & Omit<ReturnType<typeof getDimensions>, "imgWidth"> & {
    wrapperCtx: CanvasRenderingContext2D;
    canvas1: HTMLImageElement;
    canvas2: HTMLImageElement;
};

/**
 * The function draws a canvas offscreen and detached from the DOM with all of our images drawn to it.
 * 
 * @param param0 Draw canvas props.
 * @returns The canvas loaded as an image element.
 */
export const drawCanvas = async ({
    canvasWidth,
    imgHeight,
    images,
    imgWidth,
    margin,
}: DrawCanvasesProps) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.canvas.width = canvasWidth;
    ctx.canvas.height = imgHeight;

    images.forEach((image, i) => {
        // The offset of the image e.g.
        // The first image for the first is (0 * 300) = 0
        // The second image for the first frame is (1 * 300) = 320
        const dx = (i * imgWidth) + (margin * i);
        // console.log(imgWidth);
        ctx.drawImage(image as HTMLImageElement, dx, 0, imgWidth, imgHeight);
    });

    const ctxImg = await loadImage(canvas.toDataURL());

    return ctxImg;
};

/**
 * Draws two canvases and sets the width and height of the wrapper canvas.
 * 
 * @param param0 Draw canvases props.
 * @returns The two identical canvases and the wrapper canvas.
 */
export const drawCanvases = async ({ images, margin, imgWidth, imgHeight, canvasWidth }: DrawCanvasesProps) => {
    try {
        const [canvas1, canvas2] = await Promise.all([
            drawCanvas({ canvasWidth, imgHeight, imgWidth, images, margin }),
            drawCanvas({ canvasWidth, imgHeight, imgWidth, images, margin })
        ]) as HTMLImageElement[];

        return { canvas1, canvas2 };
    } catch (err) {
        console.error(err);
        throw new Error("Failed to load canvas. Please file an GitHub issue with the console error and reproduction steps.");
    }
};

/**
 * Gets the dimension of the canvas width and canvas wrapper as well as the velocity of the carousel.
 * 
 * @param param0 dimension props
 * @returns canvas width, wrapper width, and velocity.
 */
export const getDimensions = ({ images, margin, speed, direction }: DimensionProps) => {
    const numImages = images.length;
    const imgWidth = imagesSpanViewport(images, margin) ? getAvgImageWidth(images) : getAvgImageWidthWindow(images, margin);
    const imgHeight = getAvgImageHeight(images);
    const canvasWidth = (numImages * imgWidth) + (margin * numImages);
    const canvasWrapperWidth = canvasWidth * 2;
    const velocity = speed * direction;

    return {
        canvasWidth,
        canvasWrapperWidth,
        velocity,
        imgWidth,
        imgHeight
    };
};

/**
 * Animates the canvas.
 * 
 * @param param0 animate props.
 */
export const animate = ({ frame, velocity, wrapperCtx, canvasWrapperWidth, canvasWidth, imgHeight, canvas1, canvas2, direction }: AnimateProps) => {
    wrapperCtx.clearRect(0, 0, canvasWrapperWidth, imgHeight);

    // The starting position of the second canvas e.g. if the canvas is going left-to-right the canvas should start at 960px otherwise -960px
    const dx2Pos = direction === -1 ? 1 : -1;

    // Where to start drawing the canvas = (canvas 0 or 1 * 960) + (margin * 0 or 1) + velocity
    const dx1 = canvasDelta[0];
    const dx2 = (dx2Pos * canvasWidth) + canvasDelta[1];

    // How fast to animate the images per frame e.g. 1 pixel per frame and the direction -1 or left and 1 for right
    canvasDelta[0] = (canvasDelta[0] + velocity) % canvasWidth;
    canvasDelta[1] = (canvasDelta[1] + velocity) % canvasWidth;

    wrapperCtx.drawImage(canvas1, dx1, 0);
    wrapperCtx.drawImage(canvas2, dx2, 0);

    frame.current = window.requestAnimationFrame(() => {
        animate({ frame, velocity, wrapperCtx, canvasWrapperWidth, imgHeight, canvas1, canvas2, canvasWidth, direction });
    });
};

/**
 * Inits the carousel.
 * 
 * @param param0 init canvas props
 */
export const initCarousel = async ({ ref, frame, margin, speed, direction, children }: LoadCanvasProps) => {
    // Load images
    const loadImages = children.map(({ props: { src } }) => {
        return loadImage(src);
    });

    // Resolve all image load promises
    try {
        const images = await Promise.all(loadImages) as HTMLImageElement[];

        const { canvasWidth, canvasWrapperWidth, velocity, imgWidth, imgHeight } = getDimensions({
            images,
            margin,
            speed,
            direction,
        });

        const wrapperCtx = ref.current.getContext("2d");
        wrapperCtx.canvas.width = canvasWrapperWidth;
        wrapperCtx.canvas.height = imgHeight;

        const { canvas1, canvas2 } = await drawCanvases({ images, imgWidth, imgHeight, canvasWidth, margin });

        animate({
            frame,
            wrapperCtx,
            canvas1,
            canvas2,
            imgHeight,
            velocity,
            canvasWrapperWidth,
            canvasWidth,
            direction
        });
    } catch (err) {
        console.error(err);
        return new Error("Failed to load images. Please check to ensure all your images are formatted correctly and loading as expected.");
    }
};