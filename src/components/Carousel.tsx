import { useRef, useEffect, ReactElement } from "react";
import Error from "./Error";
import { initCarousel } from "../utils/canvas";
import { checkCarouselProps } from "../utils/validation";
import "./carousel.css";

export type CarouselProps = {
    children: ReactElement<{ src: string; }>[];
    margin?: number;
    speed?: number;
    direction?: -1 | 1;
};

const Carousel = ({ children, speed = 5, direction = -1, margin = 20 }: CarouselProps) => {
    const error = checkCarouselProps({ children, direction, speed, margin });
    if (error) {
        return <Error message={error.message} />;
    }

    const ref = useRef<HTMLCanvasElement>(null);
    const frame = useRef<number>(null);

    useEffect(() => {
        if (!ref) return;

        initCarousel({ ref, frame, children, direction, speed, margin });

        return () => {
            window.cancelAnimationFrame(frame.current);
        };
    }, [ref]);

    return (
        <div className="carousel-wrapper">
            <div data-testid="carousel" className="carousel">
                <canvas ref={ref} />
                {children}
            </div>
        </div>
    );
};

export default Carousel;