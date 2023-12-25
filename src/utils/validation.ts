import { ReactElement, ReactNode, isValidElement } from "react";
import { CarouselProps } from "../components/Carousel";

export const checkCarouselProps = ({ imgWidth, imgHeight, direction, children }: CarouselProps) => {
    if (!imgWidth) {
        return new Error( "Invalid image width.");
    }

    if (!imgHeight) {
        return new Error("Invalid image height.");
    }

    if (![-1, 1].includes(direction)) {
        return new Error("Invalid direction. Direction must be either -1 (left) or 1 (right).");
    }

    const slides = children as ReactElement<{ src: string }>[];

    if (!Array.isArray(children) || !slides?.every(({ type }) => type !== "Slide")) {
        return new Error("Invalid children passed to carousel. Children must be Slide components.");
    }

    return false;
};