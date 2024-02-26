import ButtonDefault from "@/components/button";
import { Layout } from "@/components/layouts";
import useMutation from "@/libs/client/useMutation";
import useUser from "@/libs/client/useUser";
import { makeStringCloudflareImageUrl } from "@/libs/client/utils";
import { IResponse, globalProps } from "@/libs/types";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";

interface ProductWithUser extends Product {
  user: { id: number; name: string };
}

interface IResponseProduct extends IResponse {
  product: ProductWithUser;
  relatedProducts: Product[] | undefined;
  isLiked: boolean;
}

export default function ItemDetail({
  user: { user, isLoading: isLoadingUser },
}: globalProps) {
  // const { user, isLoading: userIsLoading } = useUser();
  const router = useRouter();
  // console.log(router.query);
  // link로 이동 시 바로 존재, url 검색이나 새로고침 시 최초는 빔

  // const { mutate: unboundMutate } = useSWRConfig();
  const {
    data,
    mutate: boundMutate,
    isLoading,
  } = useSWR<IResponseProduct>(
    router.query.id ? `/api/products/${router.query?.id}` : null,
  );
  console.log(data);
  const [toggleFav] = useMutation(`/api/products/${router.query?.id}/favorite`);
  const onFavoriteClick = () => {
    if (isLoading) return;
    toggleFav({});
    if (!data) return;

    boundMutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
  };

  return (
    <Layout canGoBack user={!isLoadingUser && user ? user : undefined}>
      <div id="item-detail">
        <div className="detail__main p-3">
          <div className="mb-5 aspect-video w-full rounded-lg bg-gray-400">
            <div className="relative flex h-full items-center justify-center overflow-hidden">
              {!data?.product.image ? null : (
                <Image
                  className="w-full object-cover"
                  src={
                    makeStringCloudflareImageUrl({
                      id: data?.product.image,
                    })!
                  }
                  alt=""
                  fill={true}
                  // width={488}
                  // height={326}
                  // loading="lazy"
                ></Image>
              )}
            </div>
          </div>
          <Link href={`/users/profiles/${data?.product.user?.id}`}>
            <div className="profill mb-7 flex cursor-pointer items-center space-x-2 border-b-2 border-gray-100 pb-3 opacity-90 hover:opacity-100">
              <div className="aspect-square w-10  overflow-hidden rounded-full bg-gray-400 ">
                <Image
                  src={
                    makeStringCloudflareImageUrl({
                      id: user?.avatar,
                      variant: "avatar",
                    })!
                  }
                  alt=""
                  width={48}
                  height={48}
                  loading="lazy"
                />
              </div>
              <div>
                <p className="font-bold text-gray-900">
                  {data?.product?.user?.name}
                </p>
              </div>
            </div>
          </Link>

          <div className="">
            <h1 className="text-lg font-semibold text-gray-900">
              {data?.product?.name}
            </h1>
            <p className="mb-3 mt-1">${data?.product?.price}</p>
            <p className="mb-5">{data?.product?.description}</p>
            <div className="mb-5 flex space-x-3">
              <ButtonDefault text="Talk to seller" />

              <button
                onClick={onFavoriteClick}
                className="p-2 shadow-sm transition-all hover:bg-gray-100"
              >
                <svg
                  className="h-6 w-6 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill={data?.isLiked ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="detail__footer p-3">
          <h2 className="mb-3 text-lg font-semibold">Similar items</h2>
          <div className="grid grid-cols-2 gap-2 ">
            {data?.relatedProducts?.map((relatedProduct: any, i: number) => (
              <Link
                key={relatedProduct.id}
                href={`/products/${relatedProduct.id}`}
              >
                <div className="mb-2">
                  <div className="h-32 w-full rounded-lg bg-gray-300" />
                  <h3 className="mt-1 px-1 font-semibold text-gray-700">
                    {relatedProduct.name}
                  </h3>
                  <p className="px-1 text-sm font-semibold text-gray-600">
                    ${relatedProduct.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
