import ButtonDefault from "@/components/button";
import Input from "@/components/input";
import { Layout } from "@/components/layouts";
import Textarea from "@/components/textarea";
import useMutation from "@/libs/client/useMutation";
import { IResponse, globalProps } from "@/libs/types";
import { Stream } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";

interface ICreateLive {
  price: string;
  description: string;
  name: string;
  // image: string;
}

interface IResponseLive extends IResponse {
  live: Stream;
}

export default function LivesCreate({
  user: { user, isLoading },
}: globalProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors: formError },
  } = useForm<ICreateLive>({ reValidateMode: "onSubmit" });

  const [mutationLive, { data, error, loading }] =
    useMutation<IResponseLive>("/api/lives");

  const onValid: SubmitHandler<ICreateLive> = function (formData) {
    console.log(formData);
    if (loading) return;

    mutationLive(formData);
  };
  const onInvalid = function (error: FieldErrors) {
    // console.log(error);
  };

  useEffect(() => {
    if (data && data?.ok) {
      router.push(`/lives/${data.live.id}`);
    }
  }, [data, router]);

  return (
    <Layout canGoBack user={!isLoading && user ? user : undefined}>
      <form
        className=" space-y-5 px-4"
        onSubmit={handleSubmit(onValid, onInvalid)}
      >
        <Input
          label="Name"
          kind="text"
          register={register("name", { required: "이름, 가격은 필수입니다." })}
        />
        <Input
          label="Price"
          kind="price"
          placeholder="0.00"
          register={register("price", {
            required: "이름, 가격은 필수입니다.",
            valueAsNumber: true,
          })}
        />
        <Textarea
          label="Description"
          rows={4}
          register={register("description")}
        />
        <p className="font-bold text-red-500">
          {formError.name?.message || formError.price?.message}
        </p>
        <ButtonDefault text="Go live" />
      </form>
    </Layout>
  );
}
