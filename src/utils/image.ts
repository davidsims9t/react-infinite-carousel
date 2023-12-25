export type LoadImageResponse = HTMLImageElement | string | Event;

/**
 * Loads an image offscreen and detached from the DOM.
 * 
 * @param img the URL of the image to load
 * @returns the loaded image DOM node
 */
export const loadImage = async (img: string): Promise<LoadImageResponse> => {
    const node = document.createElement("img");
    node.src = img;
    node.crossOrigin = '';

    const loaded: Promise<LoadImageResponse> = new Promise((resolve, reject) => {
        node.onload = () => {
            resolve(node);
        };

        node.onerror = (err) => {
            reject(err);
        };
    });

    return loaded;
};

/**
 * Scales images from their original size to the specific width and height.
 * 
 * @param width the width of the image
 * @param height the height of the image
 * @param maxWidth the max width of the image
 * @param maxHeight the max height of the image
 * @returns the scaled width and height of the image
 */
export const scale = (width: number, height: number, maxWidth: number, maxHeight: number) => {
    const ratio = Math.min(maxWidth / width, maxHeight / height);
    return { width: width * ratio, height: height * ratio };
};