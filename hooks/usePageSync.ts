"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const usePageSync = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const queryPage = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(queryPage);

  useEffect(() => {
    if (currentPage !== queryPage) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("page", currentPage.toString());

      window.history.pushState({}, "", `${pathname}?${newParams.toString()}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage, queryPage, searchParams, pathname]);

  return { currentPage, setCurrentPage };
};
