import ButtonDefault from "@/components/button";
import Input from "@/components/input";
import { Layout } from "@/components/layouts";
import Textarea from "@/components/textarea";
import useMutation from "@/libs/client/useMutation";
import {
  IResponse,
  IcloudflareUploadResponse,
  IcloudflareUrlSuccess,
  globalProps,
} from "@/libs/types";
import { Product } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";

interface IUploadProduct {
  price: string;
  description: string;
  name: string;
  image?: FileList;
}

interface IResponseProduct extends IResponse {
  // ok
  product: Product;
}

export default function UploadDetail({
  user: { user, isLoading },
}: globalProps) {
  const [previewImage, setPreviewImage] = useState<string | undefined>();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: formError },
  } = useForm<IUploadProduct>();

  const [mutationProduct, { data, error, loading }] =
    useMutation<IResponseProduct>("/api/products");

  const onValid: SubmitHandler<IUploadProduct> = async function (formData) {
    console.log(formData);
    if (loading) return;

    // 이미지를 업로드하는 경우
    if (formData.image && formData.image.length > 0) {
      const response: IcloudflareUrlSuccess = await (
        await fetch("/api/files")
      ).json();
      if (response.ok && response.uploadURL) {
        const form = new FormData();
        form.append(
          "file",
          formData.image[0],
          `product-${user?.id}-${Date.now()}`,
        );
        const requestUpload: IcloudflareUploadResponse = await (
          await fetch(response.uploadURL, {
            method: "POST",
            body: form,
          })
        ).json();
        console.log(requestUpload);

        if (
          !requestUpload.success ||
          requestUpload.errors.length > 0 ||
          !requestUpload.result?.id
        )
          return;

        mutationProduct({ ...formData, image: requestUpload.result.id });
      } else {
        mutationProduct({ ...formData, image: undefined });
      }
    }
    // 이미지를 업로드하지 않는 경우
    else {
      mutationProduct({ ...formData, image: undefined });
    }
  };
  const onInvalid = function (error: FieldErrors) {
    console.log(error);
  };

  const watchInputImage = watch("image");
  useEffect(() => {
    let imageFileUrl: string | undefined;
    if (watchInputImage && watchInputImage?.length > 0) {
      imageFileUrl = URL.createObjectURL(watchInputImage[0]);
      setPreviewImage(imageFileUrl);
    }

    // setPreviewImage(URL.createObjectURL(watchInputImage[0]));

    return () => (imageFileUrl ? URL.revokeObjectURL(imageFileUrl) : undefined);
  }, [watchInputImage]);

  useEffect(() => {
    if (data?.ok) {
      router.replace(`/products/${data.product.id}`);
    }
  }, [data, router]);

  return (
    <Layout canGoBack user={!isLoading && user ? user : undefined}>
      <div className="px-4 py-16">
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
          {!previewImage ? null : (
            <div className="img-preview relative mb-4">
              <div className="absolute z-10 flex w-full justify-end ">
                <button
                  type="button"
                  className="rounded-bl-sm bg-gray-100 p-2 hover:bg-orange-200"
                  onClick={() => setPreviewImage(undefined)}
                >
                  <svg
                    className="h-5"
                    fill="none"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <img src={previewImage} alt="" />
            </div>
          )}

          <div className="form-image">
            <label className="mb-5 block w-full cursor-pointer border border-dashed border-gray-400 py-10 transition-all  hover:border-orange-400 hover:text-orange-400 ">
              <svg
                className="mx-auto h-12 w-12"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                {...register("image")}
              />
            </label>
          </div>
          <div>
            <Input
              label="Name"
              kind="text"
              placeholder="0.00"
              register={register("name", { required: true })}
            />
          </div>

          <div>
            <Input
              label="Price"
              kind="price"
              placeholder="0.00"
              register={register("price", { required: true })}
            />
          </div>
          <div>
            <Textarea
              label="Description"
              row="4"
              register={register("description", { required: true })}
            />
          </div>
          <ButtonDefault text={loading ? "loading..." : "Upload product"} />
        </form>
      </div>
    </Layout>
  );
}
