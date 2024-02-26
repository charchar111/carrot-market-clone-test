import { pagination } from "@/libs/client/utils";
import { ITEM_PER_PAGE, PAGE_BUTTON_COUNT } from "@/libs/constant";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface PaginationProps {
  countTotal: number | undefined;
  query?: string;
  pathname?: string;
}

export default function Pagination({
  countTotal,
  query = "page",
  pathname = undefined,
}: PaginationProps) {
  const countTotalPage = pagination.countTotalPage(countTotal, ITEM_PER_PAGE);
  const router = useRouter();

  const [pageDirection, setPageDirection] = useState<
    "left" | "right" | undefined
  >();

  const [pageState, setPageState] = useState<number>(0);

  useEffect(() => {
    if (router.query.page) {
      const parsedPage = Math.floor(
        (+router.query.page.toString() - 0.1) / PAGE_BUTTON_COUNT,
      );
      setPageState(parsedPage);
    }
  }, [router]);

  const changePageState = function (event: any, direction: string) {
    if (direction !== "left" && direction !== "right") return;
    setPageDirection(direction);
    setPageState((prev) =>
      direction == "right" ? prev + 1 : prev === 0 ? 0 : prev - 1,
    );
  };

  useEffect(() => {
    const newPage = pagination.calculateQueryStringPage({
      pageDirection,
      pageState,
      queryStringPage: router.query.page,
      pageButtonCount: PAGE_BUTTON_COUNT,
    });

    setPageDirection(undefined);
    if (newPage) router.push(`${router.pathname}?${query}=${newPage}`);
    // if (newPage) router.push(`/lives?page=${newPage}`);
  }, [pageState, router, pageDirection]);

  return (
    <section className="pagination px-16 ">
      <div className="mb-5 grid grid-cols-12  grid-rows-1 rounded-md  border  border-gray-300 text-gray-600 shadow-[0_0px_7px_0px_rgba(0,0,0,0.07)]">
        <div
          className="direction-prev border- flex cursor-pointer items-center justify-center border-r border-gray-300"
          onClick={(event) => changePageState(event, "left")}
        >
          <span className="relative top-[1px]">
            <svg
              data-slot="icon"
              fill="none"
              strokeWidth="1.5"
              className="h-[19px]"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              ></path>
            </svg>
          </span>
        </div>
        {Array.from(Array(PAGE_BUTTON_COUNT).keys()).map((element, index) => {
          const pageElement = pageState * PAGE_BUTTON_COUNT + element + 1;
          if (!countTotalPage || pageElement > countTotalPage) return;

          return (
            <Link
              href={`${router.pathname}?${query}=${
                pageState * PAGE_BUTTON_COUNT + index + 1
              }`}
              // href={`/lives?page=${pageState * PAGE_BUTTON_COUNT + index + 1}`}
              key={index}
            >
              <div
                className={`flex cursor-pointer justify-center border-r border-gray-300 p-1 ${
                  router.query.page?.toString() == String(pageElement)
                    ? "bg-orange-500 text-white"
                    : ""
                } `}
              >
                <span>{pageElement}</span>
              </div>
            </Link>
          );
        })}
        {countTotalPage &&
        pageState * PAGE_BUTTON_COUNT + PAGE_BUTTON_COUNT >
          countTotalPage ? null : (
          <div
            className="direction-right flex cursor-pointer items-center justify-center"
            onClick={(event) => changePageState(event, "right")}
            data-
          >
            <span className="relative top-[1px]">
              <svg
                data-slot="icon"
                fill="none"
                className="h-[19px]"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                ></path>
              </svg>
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
