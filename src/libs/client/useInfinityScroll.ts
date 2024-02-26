import { useEffect, useState } from "react";

export function useInfinityScroll() {
  const [page, setPage] = useState<number>(1);

  const handleScroll = function () {
    if (
      Math.floor(document.documentElement.scrollHeight) ==
      Math.floor(document.documentElement.scrollTop + window.innerHeight + 1)
    )
      setPage((prev) => prev + 1);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { page, setPage };
}
