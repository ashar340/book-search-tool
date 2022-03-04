import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { customDateComparator } from "../mytypes";
import Pagination from "./Pagination";
import ImageWithFallback from "./ImageWithFallback";
import useBookResults from "../utils/hooks/useBookResults";

const BookWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding: 3rem 1rem;
  max-width: 80rem;
  @media (min-width: 640px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 2rem 2rem;
  }
`;

const Heading = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.025em;
`;

const BookList = styled.ul`
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: flex-start;
    gap: 3rem 2rem;
  }

  & > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(3rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(3rem * var(--tw-space-y-reverse));
  }
`;

const BookGrid = styled.div`
  @media (min-width: 640px) {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.5rem;
  }

  @media (min-width: 1024px) {
    gap: 2rem;
  }
`;

const BookCoverImageContainer = styled.div`
  height: 0;
  position: relative;
  @media (min-width: 640px) {
    padding-bottom: calc(var(--tw-aspect-h) / var(--tw-aspect-w) * 100%);
    --tw-aspect-w: 3;
    --tw-aspect-h: 4;
  }
  --tw-aspect-h: 2;
  --tw-aspect-w: 3;
  padding-bottom: calc(var(--tw-aspect-h) / 3 * 100%);
  & > * {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

const BookContainer = styled.div`
  @media (min-width: 640px) {
    grid-column: span 2 / span 2;
  }
`;

const BookPrimaryInfoContainer = styled.div`
  font-size: 1.125rem;
  line-height: 1.75rem;
  line-height: 1.5rem;
  font-weight: 500;
`;

const SortSelect = styled.select`
  display: block;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem;
  padding-right: 2.5rem;
  margin-top: 0.25rem;
  font-size: 1rem;
  line-height: 1.5rem;
  width: 100%;
  border-radius: 0.375rem;
  border-color: #d1d5db;
  border: 2px solid grey;

  @media (min-width: 640px) {
    font-size: 0.875rem;

    width: 100%;
    line-height: 1.25rem;
  }

  &:focus {
    outline: 0;
    border-color: #6366f1;
    --ring-color: #6366f1;
  }
`;

export default function Books({
  loading,
  updateLoader,
}: {
  loading: boolean;
  updateLoader: (x: boolean) => void;
}) {
  const [sortByPreference, setSortByPreference] = useState<string>("empty");
  let { searchTerm } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearchParams = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams]
  );

  const {
    loading: booksResponseAvailability,
    bookInfoResponses,
    error,
  } = useBookResults({
    limit: Number(currentSearchParams.limit),
    page: Number(currentSearchParams.page),
    term: searchTerm,
    fields: "isbn",
  });

  useEffect(() => {
    updateLoader(booksResponseAvailability);
  }, [booksResponseAvailability, updateLoader]);

  const handleChangePage = (newPage: number) => {
    setSearchParams({ ...currentSearchParams, page: newPage.toString() });
  };

  const handlePageLimitChange = (newLimit: number) => {
    setSearchParams({ limit: newLimit.toString() });
    handleChangePage(0);
  };

  const override = css`
    display: block;
    margin: 0 auto;
  `;

  const Error = () => (
    <h2
      style={{
        textAlign: "center",
        marginTop: "10rem",
        fontWeight: "500",
      }}
    >
      Error Code 503 - Open Library Server is down. Please try again later.
    </h2>
  );

  const BooksList = () => (
    <>
      <div data-testid="spinner">
        <ClipLoader css={override} loading={loading} size={150} />
      </div>
      {!loading && (
        <BookWrapper>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Heading data-testid="results-count-summary">
              Showing {bookInfoResponses?.results.length} Results of{" "}
              {bookInfoResponses?.numFound} total found
            </Heading>
            <div>
              <label
                htmlFor="sortby"
                style={{
                  display: "block",
                  color: "#374151",
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  fontWeight: "500",
                }}
              >
                Sort
              </label>
              <SortSelect
                data-testid="select"
                onChange={(e) => {
                  setSortByPreference(e.target.value);
                  switch (e.target.value) {
                    case "alphabatical":
                      bookInfoResponses?.results.sort((a, b) =>
                        a.title.localeCompare(b.title)
                      );
                      break;

                    case "published-date":
                      bookInfoResponses?.results.sort((a, b) =>
                        customDateComparator(
                          a.publishDates[0],
                          b.publishDates[0]
                        )
                      );
                      break;
                  }
                }}
                id="sortby"
                name="sortby"
                defaultValue={sortByPreference}
              >
                <option value="empty">None</option>
                <option data-testid="alphabetical-sort" value="alphabatical">
                  Alphabetical
                </option>
                <option value="published-date">Published Date</option>
              </SortSelect>
            </div>
          </div>
          <BookList role="list">
            {bookInfoResponses?.results.map((book, index: number) => (
              <li key={book.title.concat(index.toString())}>
                <BookGrid>
                  <BookCoverImageContainer>
                    <ImageWithFallback url={book?.imageUrl} />
                  </BookCoverImageContainer>
                  <BookContainer>
                    <div>
                      <BookPrimaryInfoContainer>
                        <h3 data-testid="book-title">{book?.title}</h3>
                        <p
                          style={{
                            color: "rgb(34 197 94)",
                          }}
                        >
                          Subtitle: {book?.subtitle}
                        </p>
                        <p
                          style={{
                            color: "rgb(147 51 234)",
                          }}
                        >
                          Author: {book?.authors[0]}
                        </p>
                      </BookPrimaryInfoContainer>
                      <div
                        style={{
                          fontSize: "1.125rem",
                          lineHeight: "1.75rem",
                        }}
                      >
                        <p
                          style={{
                            color: "rgb(147 51 234)",
                          }}
                        >
                          Pages: {book?.number_of_pages}
                        </p>

                        <p
                          style={{
                            color: "rgb(147 51 234)",
                          }}
                        >
                          Publish Date: {book?.publishDates[0]}
                        </p>

                        <p
                          style={{
                            color: "rgb(147 51 234)",
                          }}
                        >
                          Publisher: {book?.publishers[0]}
                        </p>
                      </div>
                    </div>
                  </BookContainer>
                </BookGrid>
              </li>
            ))}
          </BookList>
        </BookWrapper>
      )}
      {Number(bookInfoResponses?.numFound) >
        Number(currentSearchParams.limit) && (
        <Pagination
          totalResults={bookInfoResponses?.numFound || 0}
          currentPage={Number(currentSearchParams.page) || 1}
          pageLimit={Number(currentSearchParams.limit) || 10}
          onPageChange={handleChangePage}
          onPageLimitChange={handlePageLimitChange}
        />
      )}
    </>
  );

  return (
    <div style={{ backgroundColor: "rgb(255 255 255)" }}>
      {error ? <Error /> : <BooksList />}
    </div>
  );
}
