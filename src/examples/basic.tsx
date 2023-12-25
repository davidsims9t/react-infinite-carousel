import ReactDOM from "react-dom/client";
import Carousel from "../components/Carousel";
import Slide from "../components/Slide";

export const App = () => {    
    return (
        <>
            <div className="container">
                <h1>React Infinite Scrolling Carousel</h1>
                <p>
                    React Infinite Scrolling carousel displays a series of images scrolling either left or right infinitely.
                    It requires that you have enough images that fill the viewport width to work properly.
                </p>
            </div>
            <Carousel>
                <Slide src="https://placehold.co/300x200" />
                <Slide src="https://placehold.co/600x400" />
                <Slide src="https://placehold.co/300x200" />
                <Slide src="https://placehold.co/600x400" />
                <Slide src="https://placehold.co/300x200" />
            </Carousel>
        </>
    );
};

const container = document.querySelector('#app');
const root = ReactDOM.createRoot(container);
root.render(<App />);