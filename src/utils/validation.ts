import { ReactElement } from "react";
import { CarouselProps } from "../components/Carousel";

/**
 * Checks to see if props passed into checkCarouselProps are valid.
 * 
 * @param param0 direction and children
 * @returns boolean
 */
export const checkCarouselProps = ({ direction, children, speed, margin }: CarouselProps) => {
    if (![-1, 1].includes(direction)) {
        return new Error("Invalid direction. Direction must be either -1 (left) or 1 (right).");
    }

    if (!Number.isInteger(speed) || speed <= 0) {
        return new Error("Invalid speed. Speed must be greater than 0.");
    }

    if (!Number.isInteger(margin) || margin < 0) {
        return new Error("Invalid margin. Margin must be 0 or greater.");
    }

    const slides = children as ReactElement<{ src: string }>[];

    if (!Array.isArray(children) || !slides?.every(({ type }) => type !== "Slide")) {
        return new Error("Invalid children passed to carousel. Children must be Slide components.");
    }

    return false;
};