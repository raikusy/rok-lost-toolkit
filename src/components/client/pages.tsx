"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

import React from "react";

const Pages = ({ total }: { total: number }) => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const pages = Math.ceil(total / 20);

  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious scroll={false} href={`?page=${page - 1}`} />
          </PaginationItem>
        )}
        {Array.from({ length: pages }).map((_, index) => {
          // Only render the first 3 pages, the last 3 pages, the current page, and the PaginationEllipsis
          if (pages > 10) {
            if (index < 3 || index >= pages - 3 || index === page - 1) {
              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    href={`?page=${index + 1}`}
                    isActive={page === index + 1}
                    scroll={false}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              );
            }
            // Render the PaginationEllipsis once after the first 3 pages and before the last 3 pages
            if (index === 3 || index === pages - 4) {
              return <PaginationEllipsis key={index} />;
            }
          } else {
            // If pages are 10 or less, render all pages
            return (
              <PaginationItem key={index}>
                <PaginationLink
                  href={`?page=${index + 1}`}
                  isActive={page === index + 1}
                  scroll={false}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            );
          }
        })}
        {page < pages && (
          <PaginationItem>
            <PaginationNext scroll={false} href={`?page=${page + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default Pages;
