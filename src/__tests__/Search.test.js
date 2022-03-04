import { expect, test } from "@jest/globals";
import { screen, render, fireEvent, getByRole } from "@testing-library/react";
import Search from "../components/Search";
import { StaticRouter } from "react-router-dom/server";
import { MemoryRouter, Router } from 'react-router-dom'
import App from "../App";
import { createMemoryHistory } from 'history'

test("On navigating to a valid search route should show loading spinner", async () => {
    const history = createMemoryHistory();
    history.push('/search/The%20Great%20Gatsby?page=1&limit=10');

    const x = render(
        <Router location={history.location} navigator={history}>
            <App />
        </Router>
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument()
});


it("show predefined error when no search input is present", () => {
    const x = render(<StaticRouter> <Search /> </StaticRouter>);
    const inputValue = "";

    fireEvent.change(screen.getByLabelText("Search"), { target: { value: inputValue } });
    fireEvent.submit(screen.getByTestId("search-form"));

    expect(screen.getByTestId("search-error")).toBeDefined();
});
