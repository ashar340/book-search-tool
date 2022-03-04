import { expect, test } from "@jest/globals";
import { screen, render } from "@testing-library/react";
import ImageWithFallback from "../components/ImageWithFallback";

test("fallback  image is shown when image resoulution is below minimum", async () => {
  const { container, getByAltText } = render(<ImageWithFallback url="https://covers.openlibrary.org/b/isbn/3642805167-M.jpg" />);

  const img = screen.getByAltText("book cover");

  setTimeout(() => expect(img).toHaveAttribute('src', 'https://readersend.com/wp-content/uploads/2018/04/book-sample_preview-1.png'), 1000);
});

test("I can view a list of books matching or related to the user-submitted title", async () => {
  
})
