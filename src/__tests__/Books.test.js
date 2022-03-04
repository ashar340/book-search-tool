import useBookResults, { BookSearch } from "../utils/hooks/useBookResults";
import { renderHook } from "@testing-library/react-hooks";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Books from "../components/Books";
import { StaticRouter } from "react-router-dom/server";
import userEvent from "@testing-library/user-event";


test("sorting alphabtically upon user action", async () => {
    const search = {
        limit: 10,
        page: 1,
        fields: "isbn",
        term: 'Shakesphere',
    };
    const { result, waitForNextUpdate } = renderHook(() => useBookResults(search));
    await waitForNextUpdate({ timeout: 7000 });

    const sortedExpectedResult = result.
        bookInfoResponses?.results.map(res => res.title).sort((a, b) =>
            a.localeCompare(b)
        );

    const x = render(<StaticRouter><Books loading={false} updateLoader={() => true} /></StaticRouter>)

    userEvent.selectOptions(screen.getByLabelText('Sort'), 'alphabatical')
    expect(screen.getByText('Alphabetical').selected).toEqual(true);

    const y = await waitFor(() => screen.getAllByTestId("book-title").map(res => res.textContent));

    expect(y).toEqual(sortedExpectedResult);
});


test("sorting by published date upon user action", async () => {
    const search = {
        limit: 10,
        page: 1,
        fields: "isbn",
        term: 'The Great Gatsby',
    };
    const { result, waitForNextUpdate } = renderHook(() => useBookResults(search));
    await waitForNextUpdate({ timeout: 7000 });
    expect(result.current.bookInfoResponses).toBeTruthy();
});


