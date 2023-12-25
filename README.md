# React Infinite Scrolling Carousel

A simple React-based infinite scrolling carousel that utilizes HTML Canvas.

## Installation

```
npm i react-infinite-carousel
```

## Utilization

```
import { Carousel, Slide } from "react-canvas-carousel";
import "react-canvas-carousel/carousel.css";

const MyComponent = () => {
    return (
        <Carousel direction={-1} speed={5} margin={20}>
            <Slide src="https://placehold.co/300x200" />
            <Slide src="https://placehold.co/600x400" />
            <Slide src="https://placehold.co/300x200" />
            <Slide src="https://placehold.co/600x400" />
            <Slide src="https://placehold.co/300x200" />
        </Carousel>
    );
};
```

### Options:

* Direction: Using -1 will make your slides move right to left and 1 will make slides move left to right. The default value is -1.
* Speed: How fast the slide will transition in pixels. A value of 5 will move the slides 5 pixels each frame. The default value is 5.
* Margin: The margin between the slides. Note if your slides don't span the entire viewport width the slides will use justified spacing. The default value is 20.

### Scaling

It's recommended you resize and crop your images before placing them into the carousel. The carousel will scale the images to the average width and height of the images.