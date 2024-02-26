// tailwind css의 동적 할당을 위한 함수
export function makeClassName(...classNames: string[]) {
  return classNames.join(" ");
}

export function makeStringCloudflareImageUrl({
  id,
  variant = "public",
}: {
  id: string | undefined | null;
  variant?: string;
}) {
  if (!id) return undefined;
  return `https://imagedelivery.net/GbvPRB54A3f6yFO0BUCnmA/${id}/${variant}`;
}

export const pagination = {
  // 수동 페이지네이션에서 필요한 최대 페이지 버튼을  계산
  countTotalPage: function (
    countTotal: number | undefined,
    itemPerPage: number,
  ) {
    const countTotalPage =
      countTotal === undefined
        ? undefined
        : countTotal % itemPerPage === 0
          ? Math.floor(countTotal / itemPerPage)
          : Math.floor(countTotal / itemPerPage) + 1;

    return countTotalPage;
  },

  // 수동 페이지네이션에서 화살표 클릭 시 쿼리스트링 page 값을 계산
  calculateQueryStringPage: function ({
    pageDirection,
    pageState,
    queryStringPage,
    pageButtonCount,
  }: {
    pageDirection: "left" | "right" | undefined;
    pageState: number;
    queryStringPage: string | string[] | undefined;
    pageButtonCount: number;
  }) {
    let newPage;

    switch (pageDirection) {
      case "right":
        newPage = pageState * pageButtonCount + 1;
        break;
      case "left":
        if (pageState !== 0) {
          newPage = pageState * pageButtonCount + pageButtonCount;
          break;
        }
        if (pageState === 0) {
          newPage =
            queryStringPage && +queryStringPage > pageButtonCount + 1
              ? pageButtonCount
              : 1;
          break;
        }
        newPage = undefined;
        break;
    }

    return newPage;
  },
};
