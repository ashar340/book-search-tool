import axios, { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PaginationResponse, SearchResponse } from "../../mytypes";
import { lazyFetch } from "../lazyFetch";

export type BookSearch = {
  limit: number;
  page: number;
  fields: string;
  term: string | undefined;
};

type BookSearchResult = {
  publishDates: string[];
  title: string | "UNKNOWN";
  subtitle: string | "UNKNOWN";
  number_of_pages: number | "UNKNOWN";
  publishers: string[] | ["UNKNOWN"];
  authors: string[] | ["UNKNOWN"];
  imageUrl: string;
};

type BookSearchResults = {
  numFound: number;
  results: BookSearchResult[];
};

type BookInfoResponse = Record<
  string,
  {
    records: BookRecord;
  }
>;

export interface BookRecord {
  isbns: string[];
  olids: string[];
  publishDates: string[];
  recordURL: string;
  data: Data;
  details: BookRecordDetails;
}

export interface Data {
  url: string;
  key: string;
  title: string;
  subtitle: string;
  authors: SubjectElement[];
  number_of_pages: number;
  identifiers: Identifiers;
  classifications: Classifications;
  publishers: Publisher[];
  publish_date: string;
  subjects: SubjectElement[];
}

export interface SubjectElement {
  url: string;
  name: string;
}

export interface Classifications {
  lc_classifications: string[];
}

export interface Identifiers {
  isbn_13: string[];
  openlibrary: string[];
}

export interface Publisher {
  name: string;
}

export interface BookRecordDetails {
  bib_key: string;
  info_url: string;
  preview: string;
  preview_url: string;
  details: DetailsDetails;
}

export interface DetailsDetails {
  publishers: string[];
  subtitle: string;
  last_modified: Created;
  source_records: string[];
  title: string;
  number_of_pages: number;
  isbn_13: string[];
  created: Created;
  languages: Type[];
  full_title: string;
  lc_classifications: string[];
  publish_date: string;
  key: string;
  authors: DetailsAuthor[];
  latest_revision: number;
  works: Type[];
  type: Type;
  subjects: string[];
  revision: number;
}

export interface DetailsAuthor {
  key: string;
  name: string;
}

export interface Created {
  type: string;
  value: Date;
}

export interface Type {
  key: string;
}

function handleErrors(response: any) {
  if (!response.ok) {
    throw Error(response.status.toString());
  }
  return response;
}

const isRejected = (
  input: PromiseSettledResult<unknown>
): input is PromiseRejectedResult => input.status === "rejected";

const isFulfilled = <T>(
  input: PromiseSettledResult<T>
): input is PromiseFulfilledResult<T> => {
  return input.status === "fulfilled" && input.value !== null;
};

const bookCoverImageBaseURL = "https://covers.openlibrary.org/b/isbn";
const searchUrl = "https://openlibrary.org/search.json";
const proxyURL = "https://limitless-depths-76691.herokuapp.com/";
const bookInfoBaseURL = "https://openlibrary.org/api/volumes/brief/isbn";

const getCoverImageUrl = (isbn: string, size: "S" | "M" | "L") =>
  `${bookCoverImageBaseURL}/${isbn}-${size}.jpg`;

const getURLWithSearchTerm = ({
  term,
  limit,
  page,
  fields,
}: BookSearch): string => {
  const url = new URL(searchUrl);
  url.searchParams.set("q", term || "The Great Gatsby");
  url.searchParams.set("limit", limit.toString());
  url.searchParams.set("page", page.toString());
  url.searchParams.set("fields", fields);

  return url.toString();
};

const getBookInfoURLWithIsbn = (isbn: string): string => {
  return `${proxyURL}${bookInfoBaseURL}/${isbn}.json`;
};

// Takes O(1) as opposed to O(n) with using Object.keys().length !== 0
const isObjEmpty = (obj: Object) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export default function useBookResults({
  limit,
  page,
  fields,
  term,
}: BookSearch) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [bookInfoResponses, setBookInfoResponses] =
    useState<BookSearchResults | null>(null);

  useEffect(() => {
    const responseFn = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(
          getURLWithSearchTerm({ limit, page, fields, term })
        ).then(handleErrors);

        const { numFound, docs }: SearchResponse = await res.json();

        const isbns = docs
          .filter((x) => !isObjEmpty(x))
          .flatMap((x) => x.isbn[0])
          .filter((isbn) => isbn != undefined);

        const bookCoverImageUrls = isbns.map((isbn) =>
          getCoverImageUrl(isbn, "M")
        );
        const bookInfoFetchers = isbns.map((isbn) =>
          lazyFetch<BookInfoResponse>(getBookInfoURLWithIsbn(isbn))
        );

        const bookInfoResponses: BookSearchResult[] = (
          await Promise.allSettled(
            bookInfoFetchers.map(
              (bookInfoLazyFetcher: () => Promise<BookInfoResponse>) =>
                bookInfoLazyFetcher()
            )
          )
        )
          .filter(isFulfilled)
          .flatMap((p, i: number) =>
            Object.values(p.value.records).map((record) => ({
              publishDates: record.publishDates || [],
              title: record.data.title || "UNKNOWN",
              subtitle: record.data.subtitle || "UNKNOWN",
              number_of_pages: record.data.number_of_pages || "UNKNOWN",
              publishers: record.data.publishers?.map(
                (publisher: any) => publisher.name
              ) || ["UNKNOWN"],
              authors: record.data.authors?.map((author) => author.name) || [
                "UNKNOWN",
              ],
              imageUrl: bookCoverImageUrls[i],
            }))
          );

        setLoading(false);

        setBookInfoResponses({ numFound, results: bookInfoResponses });
      } catch (e) {
        const error = e as any;
        setLoading(false);
        setBookInfoResponses(null);
        setError(true);
      }
    };

    if (term != null && typeof term == "string") responseFn();
  }, [fields, limit, page, term]);

  return { loading, bookInfoResponses, error };
}
