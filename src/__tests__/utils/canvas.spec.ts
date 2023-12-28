import { expect, test, vi } from "vitest";
import { animate, drawCanvas, drawCanvases, getDimensions, initCarousel } from "../../utils/canvas";
import { MutableRefObject, ReactElement } from "react";
import React from "react";

const loadImage = vi.fn();

vi.mock("../../utils/image", async (importOriginal) => {
    const ogImport = await importOriginal();
    return {
        ...ogImport,
        loadImage: async (url) => {
            loadImage(url);
            return new Image(url);
        }
    };
});

test("should draw canvas correctly", async () => {
    let width;
    let height;

    const drawImage = vi.fn();
    const getContext = vi.fn().mockImplementation(() => ({
        canvas: {
            width,
            height,
        },
        drawImage
    }));

    globalThis.document.createElement = vi.fn().mockImplementation(() => {
        return {
            getContext,
            toDataURL: () => {
                return 'test';
            }
        };
    });

    const img = new Image("http://placekitten.com/200/100");
    const canvas = await drawCanvas({
        canvasWidth: 1000,
        images: [
            img
        ],
        imgWidth: 200,
        imgHeight: 100,
        margin: 20
    });
    expect(getContext).toBeCalledWith('2d');
    expect(drawImage).toHaveBeenCalledWith(img, 0, 0, 200, 100);
    expect(loadImage).toHaveBeenCalledWith('test');
    expect(canvas).toEqual(new Image('test'));
});

test("should draw canvases correctly", async () => {
    let width;
    let height;

    const drawImage = vi.fn();
    const getContext = vi.fn().mockImplementation(() => ({
        canvas: {
            width,
            height,
        },
        drawImage
    }));

    globalThis.document.createElement = vi.fn().mockImplementation(() => {
        return {
            getContext,
            toDataURL: () => {
                return 'test';
            }
        };
    });

    const img = new Image("http://placekitten.com/200/100");
    const canvas = await drawCanvases({
        canvasWidth: 1000,
        images: [
            img
        ],
        imgWidth: 200,
        imgHeight: 100,
        margin: 20
    });
    expect(getContext).toBeCalledWith('2d');
    expect(drawImage).toHaveBeenCalledWith(img, 0, 0, 200, 100);
    expect(loadImage).toHaveBeenCalledWith('test');
    expect(canvas).toEqual({
        canvas1: new Image('test'),
        canvas2: new Image('test'),
    });
});

test("should calculate dimensions correctly", async () => {
    const dimensions = getDimensions({
        images: [
            new Image("http://www.placekitten.com/200/100"),
            new Image("http://www.placekitten.com/200/100")
        ],
        margin: 20,
        speed: 5,
        direction: -1
    });

    expect(dimensions).toEqual({
        imgWidth: 512,
        imgHeight: 0,
        canvasWidth: 1064,
        canvasWrapperWidth: 2128,
        velocity: -5
    });
});

test("should animate correctly", async () => {
    const velocity = 1;
    const clearRect = vi.fn();
    const drawImage = vi.fn();
    const frame = {
        current: null
    };

    globalThis.requestAnimationFrame = vi.fn();

    const wrapperCtx = {
        clearRect,
        drawImage
    } as unknown as CanvasRenderingContext2D;

    const canvas1 = new Image('test');
    const canvas2 = new Image('test2');

    animate({
        frame,
        velocity,
        wrapperCtx,
        direction: -1,
        canvasWrapperWidth: 1024,
        canvasWidth: 512,
        imgHeight: 200,
        canvas1,
        canvas2
    });

    expect(globalThis.requestAnimationFrame).toHaveBeenCalled();
    expect(clearRect).toHaveBeenCalledWith(0, 0, 1024, 200);
    expect(drawImage).toHaveBeenCalledWith(canvas1, 0, 0);
    expect(drawImage).toHaveBeenCalledWith(canvas2, 512, 0);
});

test.skip("initCarousel load images and animate canvas", async () => {
    const clearRect = vi.fn();
    const drawImage = vi.fn();
    let width;
    let height;
    let context;
    const getContext = (c) => {
        console.log("context ", c);
        context = c;
        return {
            canvas: {
                width,
                height
            }
        };
    };

    const frame = {
        current: null
    };
    const ref = {
        current: {
            getContext
        }
    } as unknown as MutableRefObject<HTMLCanvasElement>;

    globalThis.requestAnimationFrame = vi.fn();

    const children = [
        React.createElement('div', { src: 'test.jpg' }),
        React.createElement('div', { src: 'test2.jpg' })
    ] as unknown as ReactElement[];

    initCarousel({
        ref,
        frame,
        margin: 20,
        speed: 5,
        direction: -1,
        children
    });

    expect(context).toEqual("2d");
    // expect(globalThis.requestAnimationFrame).toHaveBeenCalled();
    // expect(clearRect).toHaveBeenCalledWith(0, 0, 1024, 200);
    // expect(drawImage).toHaveBeenCalledWith(canvas1, 0, 0);
    // expect(drawImage).toHaveBeenCalledWith(canvas2, 512, 0);
});