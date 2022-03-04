import useBookResults, { BookSearch } from "../utils/hooks/useBookResults";
import { renderHook } from "@testing-library/react-hooks";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Books from "../components/Books";
import { StaticRouter } from "react-router-dom/server";
import userEvent from "@testing-library/user-event";


test("sorting alphabtically upon user action", async () => {
 const x = render(
    <StaticRouter>
        <Books loading={false} updateLoader={() => true} />
    </StaticRouter>
    )

    userEvent.selectOptions(screen.getByLabelText('Sort'), 'alphabatical')
    expect(screen.getByText('Alphabetical').selected).toEqual(true);
});


test("sorting by published date upon user action", async () => {
    const x = render(
        <StaticRouter>
            <Books loading={false} updateLoader={() => true} />
        </StaticRouter>
    )

    userEvent.selectOptions(screen.getByLabelText('Sort'), 'published-date')
    expect(screen.getByText('Published Date').selected).toEqual(true);
});


