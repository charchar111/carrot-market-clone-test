import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR, { BareFetcher } from "swr";
import { IResponseProfile } from "../types";
import { PublicConfiguration } from "swr/_internal";
import { globalFetcher } from "@/pages/_app";

export default function useUser() {
  const { data, isLoading } = useSWR<IResponseProfile>(
    "/api/users/me",
    globalFetcher,
  );

  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok && router.pathname !== "/enter")
      router.replace("/enter");
  }, [data, isLoading, router]);

  return { user: data?.profile, isLoading: isLoading };
}
