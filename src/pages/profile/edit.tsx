import ButtonDefault from "@/components/button";
import Input from "@/components/input";
import { Layout } from "@/components/layouts";
import useMutation from "@/libs/client/useMutation";
import { makeStringCloudflareImageUrl } from "@/libs/client/utils";
import { IResponse, IcloudflareUrlSuccess, globalProps } from "@/libs/types";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";

interface FormEditProfile {
  email: string | null;
  phone: string | null;
  name: string;
  avatar: FileList;
}

export default function ProfileEdit({ user }: globalProps) {
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    watch,
    formState: { errors: formErrors },
  } = useForm<FormEditProfile>({ reValidateMode: "onSubmit" });

  const [avatarPreview, setAvatarPreview] = useState<string | undefined>();

  const [mutationProfile, { data, error, loading }] =
    useMutation<IResponse>("/api/users/me");

  // console.log("mudation", data, error, loading);
  const watchAvatar = watch("avatar");

  useEffect(() => {
    if (watchAvatar && watchAvatar.length > 0) {
      const item = watchAvatar.item(0);
      if (item) setAvatarPreview(URL.createObjectURL(item));
    }
  }, [watchAvatar]);

  useEffect(() => {
    if (data && !data?.ok)
      setError("root", { type: "validate", message: error });
  }, [data, error, setError]);

  // console.log("formerror", formErrors);

  const onValid: SubmitHandler<FormEditProfile> = async function ({
    name,
    email,
    phone,
    avatar,
  }) {
    if (loading) return;
    if (name.trim() == "")
      return setError("root", {
        type: "validate",
        message: "이름은 필수로 입력해야 합니다.",
      });

    if (email?.trim() == "" && phone?.trim() == "") {
      return setError("root", {
        type: "validate",
        message: "email과 phone 중 하나는 입력해야 합니다.",
      });
    }

    if (avatar && avatar.length > 0) {
      // cf url,
      //  cf url에 파일 업로드

      const cloudflareUrl: IcloudflareUrlSuccess = await (
        await fetch("/api/files")
      ).json();

      if (cloudflareUrl.error || !cloudflareUrl.uploadURL || !cloudflareUrl.id)
        return;

      const form = new FormData();
      form.append(
        "file",
        avatar[0],
        `${user.user?.id}-${email || phone}-${Date.now()}`,
      );

      const response = await (
        await fetch(cloudflareUrl.uploadURL, { method: "POST", body: form })
      ).json();

      console.log(response);
      mutationProfile({
        name,
        email,
        phone,
        avatarId: response.success
          ? response.result.id
          : user.user?.avatar || "",
      });
    } else {
      mutationProfile({
        name,
        email,
        phone,
      });
    }

    // mutationProfile({
    //   name: formData.name !== user.user?.name ? formData.name : undefined,
    //   email: formData.email !== user.user?.email ? formData.email : undefined,
    //   phone: formData.phone !== user.user?.phone ? formData.phone : undefined,
    // });
    // 업데이트 프로파일 데이터가 기존 프로파일과 동일할 시, 빈 문자열을 보내서 api 요청의 조기 취소 혹은 업데이트
  };
  const onInvalid = function (error: FieldErrors) {
    console.log(error);
  };

  useEffect(() => {
    if (user.user) {
      setValue("name", user.user?.name);
      if (user.user.email) setValue("email", user.user.email);
      if (user.user.phone) setValue("phone", user.user.phone || "");
      if (user.user.avatar)
        setAvatarPreview(
          makeStringCloudflareImageUrl({
            id: user.user.avatar,
            variant: "avatar",
          }),
        );
    }
  }, [user, setValue]);
  // form의 초기값 설정
  // session user 정보

  return (
    <Layout
      canGoBack
      user={!user.isLoading && user.user ? user.user : undefined}
    >
      <div className="px-4 py-10">
        <div className="head mb-10 flex items-center space-x-3">
          <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-500">
            {!avatarPreview ? null : (
              <img className="h-full object-fill" src={avatarPreview} alt="" />
            )}
          </div>
          <form className="">
            <label className="cursor-pointer ">
              <p className="rounded-lg  bg-orange-500 p-2 px-4 text-white opacity-80 transition-all hover:opacity-100">
                Change Profill
              </p>
              <input
                {...register("avatar")}
                type="file"
                className="hidden"
                accept="image/*"
              />
            </label>
          </form>
        </div>

        <form onSubmit={handleSubmit(onValid, onInvalid)}>
          <Input
            label="name"
            name="input-profile-edit-name"
            kind="text"
            placeholder="name"
            register={register("name", {
              required: "이름은 필수로 입력해야 합니다.",
            })}
          />

          <Input
            label="Email"
            name="input-profile-edit-email"
            kind="email"
            placeholder="abcd123@naver.com"
            register={register("email")}
          />

          <Input
            label="Phone Number"
            name="input-profile-edit-phone"
            kind="phone"
            placeholder="01012345678"
            register={register("phone")}
          />

          <p className="mb-2 text-center font-bold text-red-500">
            {error}
            {formErrors.name?.message}
            {formErrors.root?.message}
          </p>
          <ButtonDefault text={loading ? "loading..." : "Edit"} />
        </form>
      </div>
    </Layout>
  );
}
