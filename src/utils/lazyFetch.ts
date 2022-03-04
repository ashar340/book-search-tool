export const lazyFetch =
  <T extends unknown>(url: string) =>
  (): Promise<T> =>
    fetch(url)
      .then((res) => res.json())
      .catch((err) => null);
