/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import styled from "styled-components";

const PaginationContainer = styled.div`
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: #ffffff;
  border-top-width: 1px;
  border-color: #e5e7eb;

  @media (min-width: 640px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
`;

const MobilePaginator = styled.div`
  flex: 1 1 0%;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  @media (min-width: 640px) {
    display: flex;
    flex-direction: row;
  }
`;

const MobileLinkButton = styled.button`
  display: inline-flex;
  position: relative;
  padding: 0.5rem 1rem;
  background-color: #ffffff;
  color: #374151;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  border-radius: 0.375rem;
  border-width: 1px;
  border-color: #d1d5db;

  &:hover {
    background-color: #f9fafb;
  }
`;

const PaginatorSummary = styled.p`
  color: #374151;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: center;
`;

const MediumFontWeightSpan = styled.span`
  font-weight: 500;
`;

type PaginationProps = {
  totalResults: number;
  pageLimit: number;
  currentPage: number;
  onPageLimitChange: (newPageLimit: number) => void;
  onPageChange: (newPage: number) => void;
};

type PageStart = number;
type PageEnd = number;
type PageOffsetRange = [PageStart, PageEnd];

const calculatePageOffsetRange = (
  currentPage: number,
  pageLimit: number
): PageOffsetRange => [
  (currentPage - 1) * pageLimit + 1,
  currentPage * pageLimit,
];

export default function Pagination({
  totalResults,
  pageLimit,
  currentPage,
  onPageChange,
  onPageLimitChange,
}: PaginationProps) {
  const [pageStart, pageEnd] = calculatePageOffsetRange(currentPage, pageLimit);

  return (
    <PaginationContainer>
      <MobilePaginator>
        <div>
          <PaginatorSummary>
            Showing <MediumFontWeightSpan>{pageStart}</MediumFontWeightSpan> to{" "}
            <MediumFontWeightSpan>{pageEnd}</MediumFontWeightSpan> of{" "}
            <MediumFontWeightSpan>{totalResults}</MediumFontWeightSpan> results
          </PaginatorSummary>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          {currentPage >1 && <MobileLinkButton onClick={() => onPageChange(currentPage - 1)}>
            Previous
          </MobileLinkButton>}
          <MobileLinkButton onClick={() => onPageChange(currentPage + 1)}>
            Next
          </MobileLinkButton>
        </div>
      </MobilePaginator>
    </PaginationContainer>
  );
}
