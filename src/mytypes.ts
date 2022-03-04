export type Book = {
  title: string;
  book_cover: string;
  author: string;
  published_date: Date;
};

export type PaginationResponse = {
  numFound: number;
  start: number;
};

type Languages = "/languages/eng";

const getCoverImageUrl = (isbn: string, size: "S" | "M" | "L") =>
  `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`;

export type BookDataResponse = {
  publishDates: string[];
  data: {
    title: string;
    subtitle: string;
    number_of_pages: number;
    publishers: { name: string }[];
    authors: {
      name: string;
    }[];
    publish_date: string;
  };
  details: {
    details: {
      languages: { key: string }[];
    };
  };
};

export type Document = {
  isbn: string[];
};

export type SearchResponse = PaginationResponse & {
  docs: Document[];
};

export type MyBookDataResponse = {
  publishDates: string[];
  title: string;
  subtitle: string;
  number_of_pages: number;
  publishers: { name: string }[];
  authors: {
    name: string;
  }[];
};

type ComparatorFn<T> = (a: T, b: T) => number;

// considerably faster then a - b
const localeComparator: ComparatorFn<string> = (a: string, b: string) =>
  a.localeCompare(b);
const dateComparator: ComparatorFn<Date> = (a: Date, b: Date) =>
  a.getTime() - b.getTime();
const numberComparator: ComparatorFn<number> = (a: number, b: number) => a - b;

const sortBy =
  <T>(comparator: ComparatorFn<T>) =>
  (items: T[]) =>
    items.sort(comparator).slice();

const sortDates = sortBy(dateComparator);
const sortStrings = sortBy(localeComparator);
const sortNumbers = sortBy(numberComparator);

const isDate = (date: any) => date instanceof Date && !isNaN(date.valueOf());

export const customDateComparator = (d1: any, d2: any) => {
  // both dates
  if (isDate(new Date(d1)) && isDate(new Date(d2))) {
    return dateComparator(new Date(d1), new Date(d2));
  }

  // both numbers
  if (Number(d1) && Number(d2)) {
    return numberComparator(Number(d1), Number(d2));
  }
  // first number
  if (Number(d1) && isDate(new Date(d2))) {
    return numberComparator(Number(d1), Number(d2.getFullYear()));
  } // second number
  else if (Number(d2) && isDate(new Date(d1))) {
    return numberComparator(Number(d1.getFullYear()), Number(d2));
  }

  return 0;
};

export const sortByPublishedDate = sortBy(customDateComparator);