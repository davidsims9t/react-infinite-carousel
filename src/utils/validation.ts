import { ReactElement } from "react";

/**
 * Checks to see if props passed into checkCarouselProps are valid.
 * 
 * @param param0 direction and children
 * @returns boolean
 */
export const checkCarouselProps = ({ direction, children }: CarouselProps) => {
    if (![-1, 1].includes(direction)) {
        return new Error("Invalid direction. Direction must be either -1 (left) or 1 (right).");
    }

    const slides = children as ReactElement<{ src: string }>[];

    if (!Array.isArray(children) || !slides?.every(({ type }) => type !== "Slide")) {
        return new Error("Invalid children passed to carousel. Children must be Slide components.");
    }

    return false;
};