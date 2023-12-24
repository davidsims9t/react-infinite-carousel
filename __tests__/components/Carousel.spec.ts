import { test } from "vitest";
import { render } from "@testing-library/react";
import Carousel from "../../src/components/Carousel";

test("it should render as expected", async () => {
    const images = [];
    const component = await render(
        <Carousel
            images=[]
            imgWidth={500}
            imgHeight={200}
        />
    );
});