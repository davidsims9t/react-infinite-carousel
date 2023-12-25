import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import Slide from "../../components/Slide";

test("it should render as expected", async () => {
    const component = render(
        (
            <Slide src="http://www.google.com/" />
        )
    );

    expect(component).toMatchSnapshot();
});
