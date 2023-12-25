import { expect, test, vi } from "vitest";
import { drawCanvas, drawCanvases, getDimensions } from "../../utils/canvas";

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