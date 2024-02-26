import { useRouter } from "next/router";
import { useEffect } from "react";

/**
 * url에서 특정한 쿼리스트링을 가지고 있지 않으면 해당 쿼리스트링을 추가하여 리다이렉트함
 * @param query 쿼리스트링 키
 * @param value 쿼리스트링 값
 */
export default function useIncludeQuery(query: string, value: string) {
  const router = useRouter();
  useEffect(() => {
    if (!router.query.page && !router.asPath.includes(`?${query}=`))
      router.replace(`${router.asPath}?${query}=${value}`);
  }, [router]);
}
