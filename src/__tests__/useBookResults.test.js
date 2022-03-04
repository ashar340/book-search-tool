import useBookResults, { BookSearch } from "../utils/hooks/useBookResults";

import { renderHook } from "@testing-library/react-hooks";

test("gives null when term is invalid", async () => {
  const search = {
    limit: 10,
    page: 1,
    fields: "isbn",
    term: undefined,
  };
  const { result } = renderHook(() => useBookResults(search));

  expect(result.current.loading).toBeFalsy();
  expect(result.current.bookInfoResponses).toBeNull();
});

test("gives valid results", async () => {
  const search = {
    limit: 10,
    page: 1,
    fields: "isbn",
    term: 'The Great Gatsby',
  };
  const { result, waitForNextUpdate } = renderHook(() => useBookResults(search));
  await waitForNextUpdate({timeout: 7000});
  expect(result.current.bookInfoResponses).toBeTruthy();
});
