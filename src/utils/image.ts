export const loadImage = async (img: string) => {
    const node = document.createElement("img");
    node.src = img;
    node.crossOrigin = '';

    const loaded = new Promise((resolve, reject) => {
        node.onload = () => {
            resolve(node);
        };

        node.onerror = (err) => {
            reject(err);
        };
    });

    return loaded;
};