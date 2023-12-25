import { useRef, useEffect, ReactElement } from "react";
import Error from "./Error";
import { initCarousel } from "../utils/canvas";
import { checkCarouselProps } from "../utils/validation";

const Carousel = ({ imgWidth, imgHeight, children, speed = 1, direction = -1, margin = 20 }: CarouselProps) => {
    const error = checkCarouselProps({ imgWidth, imgHeight, children, direction });
    if (error) {
        return <Error message={error.message} />;
    }

    const ref = useRef<HTMLCanvasElement>(null);
    const frame = useRef<number>(null);

    useEffect(() => {
        if (!ref) return;

        initCarousel({ ref, frame, children, imgWidth, imgHeight, direction, speed, margin });

        return () => {
            window.cancelAnimationFrame(frame.current);
        };
    }, [ref]);

    return (
        <div className="carousel-wrapper">
            <div className="carousel">
                <canvas ref={ref} />
                {children}
            </div>
        </div>
    );
};

export default Carousel;