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
 * Gets the average image height from an array of images.
 * 
 * @param images Array of images
 * @returns number
 */
export const getAvgImageHeight = (images: HTMLImageElement[]) => {
    return images.reduce((sum, image) => {
        return sum + image.naturalHeight;
    }, 0) / images.length;
};

/**
 * Gets the average image width from an array of images.
 * 
 * @param images Array of images
 * @returns number
 */
export const getAvgImageWidth = (images: HTMLImageElement[]) => {
    return images.reduce((sum, image) => {
        return sum + image.naturalWidth;
    }, 0) / images.length;
};

/**
 * Returns a boolean if the images span the viewport width or not.
 * 
 * @param images array of images.
 * @param margin space between images
 * @returns number
 */
export const imagesSpanViewport = (images: HTMLImageElement[], margin: number = 20) => {
    return getTotalWidthFromImages(images, margin) >= window.innerWidth;
};

/**
 * Returns the total width of the all of the images with margin accounted for.
 * 
 * @param images array of images.
 * @param margin space between images
 * @returns number
 */
export const getTotalWidthFromImages = (images: HTMLImageElement[], margin: number = 20) => {
    return images.reduce((sum, image) => {
        return sum + image.naturalWidth + margin;
    }, 0);
};

/**
 * Gets the average image width given the width of the viewport.
 * 
 * @param images Array of images
 * @returns number
 */
export const getAvgImageWidthWindow = (images: HTMLImageElement[], margin: number = 20) => {
    return Math.ceil(window.innerWidth / images.length);
};