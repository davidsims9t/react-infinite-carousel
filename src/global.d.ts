type CarouselProps = {
    imgWidth: number;
    imgHeight: number;
    children: ReactElement<{ src: string; }>[];
    margin?: number;
    speed?: number;
    direction?: -1 | 1;
};