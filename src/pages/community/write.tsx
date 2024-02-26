import ButtonDefault from "@/components/button";
import Input from "@/components/input";
import { Layout } from "@/components/layouts";
import Textarea from "@/components/textarea";
import useCoord from "@/libs/client/useCoords";
import useMutation from "@/libs/client/useMutation";
import {
  IFormCommunityWrite,
  IResponseCommunityWrite,
  globalProps,
} from "@/libs/types";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";

const Write: NextPage<globalProps> = ({ user: { isLoading, user } }) => {
  const { latitude, longitude } = useCoord();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormCommunityWrite>();

  const router = useRouter();

  const [mutationPost, { data, error, loading }] =
    useMutation<IResponseCommunityWrite>("/api/community/posts");

  const onValid: SubmitHandler<IFormCommunityWrite> = function (formData) {
    if (loading) return;
    if (data) return;
    mutationPost({ ...formData, latitude, longitude });
  };
  const onInvalid = function (error: FieldErrors) {
    console.log(error);
  };

  useEffect(() => {
    console.log(data);
    if (data?.ok) router.replace(`/community/${data.post?.id}`);
    // 성공 응답 시, 생성된 post로 이동
  }, [data, router]);

  return (
    <Layout
      canGoBack
      title="Write Post"
      user={!isLoading && user ? user : undefined}
    >
      <div className="px-3 py-10">
        <form
          className="flex flex-col space-y-4 "
          onSubmit={handleSubmit(onValid, onInvalid)}
        >
          <Input
            kind="text"
            placeholder="Write a title"
            register={register("title", { required: "required" })}
          />
          <Textarea
            rows={6}
            placeholder="Ask a question!"
            register={register("content", { required: "required" })}
          />
          <ButtonDefault text={loading ? "Loading..." : "Submit"} />
        </form>
      </div>
    </Layout>
  );
};

export default Write;
