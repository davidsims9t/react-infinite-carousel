import { test, expect } from "vitest";
import { render, within } from "@testing-library/react";
import Carousel from "../../components/Carousel";
import Slide from "../../components/Slide";

test("it should render as expected", async () => {
    const component = render(
        (
            <Carousel>
                <Slide src="http://www.google.com/" />
                <Slide src="http://www.google.com/" />
            </Carousel>
        )
    );

    expect(component).toMatchSnapshot();
});

test("throws an error with invalid direction", async () => {
    const component = render(
        (
            // @ts-ignore
            <Carousel direction={5}>
                <Slide src="http://www.google.com/" />
                <Slide src="http://www.google.com/" />
            </Carousel>
        )
    );

    const error = await component.findAllByTestId('error');
    expect(error[0].textContent).toEqual('Invalid direction. Direction must be either -1 (left) or 1 (right).');
});

test("throws an error with invalid speed", async () => {
    const component = render(
        (
            // @ts-ignore
            <Carousel speed={"hello"}>
                <Slide src="http://www.google.com/" />
                <Slide src="http://www.google.com/" />
            </Carousel>
        )
    );

    const error = await component.findAllByTestId('error');
    expect(error[0].textContent).toEqual('Invalid speed. Speed must be greater than 0.');
});

test("throws an error with invalid margin", async () => {
    const component = render(
        (
            // @ts-ignore
            <Carousel margin={-5}>
                <Slide src="http://www.google.com/" />
                <Slide src="http://www.google.com/" />
            </Carousel>
        )
    );

    const error = await component.findAllByTestId('error');
    expect(error[0].textContent).toEqual('Invalid margin. Margin must be 0 or greater.');
});

test("throws an error when missing children", async () => {
    const component = render(
        (
            // @ts-ignore
            <Carousel>
            </Carousel>
        )
    );

    const error = await component.findAllByTestId('error');
    expect(error[0].textContent).toEqual('Invalid children passed to carousel. Children must be Slide components.');
});