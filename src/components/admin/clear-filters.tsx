"use client";

import { useSearchParams } from "next/navigation";

import { PAGES } from "@/config/pages";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function ClearFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const clearFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("page");
    params.delete("search");
    params.delete("limit");
    params.delete("public");
    params.delete("deleted");
    router.push(`${PAGES.ADMIN_ALL_TEMPLATES}?${params.toString()}`);
  };
  return (
    <Button variant="outline" onClick={clearFilters}>
      Clear Filters
    </Button>
  );
}
