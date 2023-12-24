export type ImageProps = {
    src: string;
};

export type CarouselProps = {
    images: ImageProps[];
    imgWidth: number;
    imgHeight: number;
    margin?: number;
    direction?: -1 | 1;
};

const Carousel = ({ images, imgWidth }: CarouselProps) => {
    return (
        <div>
        </div>
    );
};

export default Carousel;