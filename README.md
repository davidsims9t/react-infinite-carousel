# React Infinite Scrolling Carousel

A simple React-based infinite scrolling carousel that utilizes HTML Canvas.

## Installation

```
npm i react-infinite-carousel
```

## Utilization

```
import ReactCarousel from "react-infinite-carousel";

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