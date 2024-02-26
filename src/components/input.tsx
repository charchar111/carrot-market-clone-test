interface InputProps {
  kind?: "price" | "phone" | "email" | "chat" | "text";
  label?: string;
  name?: string;
  [key: string]: any;
}

export default function Input({
  kind = "text",
  label,
  name,
  register,
  ...rest
}: InputProps) {
  let inputPrice;
  let inputPhone;
  let inputEmail;
  let inputChat;
  let inputText;

  switch (kind) {
    case "chat":
      inputChat = (
        <>
          <input
            type="text"
            {...register}
            className=" w-full  rounded-md border-gray-400 pr-10 shadow-lg"
            {...rest}
          />
          <button className="absolute right-1 rounded-full bg-orange-400  px-2 pb-1 text-white">
            <span>&rarr;</span>
          </button>
        </>
      );
      break;
    case "text":
      inputText = (
        <input
          id={name ? name : undefined}
          type="text"
          className="mb-5 w-full appearance-none rounded-sm border-gray-200  p-2 placeholder-gray-400 shadow-sm  placeholder:text-gray-300 focus:border-orange-400 focus:ring-orange-400"
          placeholder="Write a title"
          {...register}
          {...rest}
        />
      );
      break;
    case "email":
      inputEmail = (
        <input
          id={name ? name : undefined}
          type="email"
          placeholder="abcd123@naver.com"
          className="mb-5 w-full appearance-none rounded-sm border-gray-200  p-2 placeholder-gray-400 shadow-sm  placeholder:text-gray-300 focus:border-orange-400 focus:ring-orange-400"
          {...register}
          {...rest}
        />
      );
      break;
    case "phone":
      inputPhone = (
        <div className="mb-5 flex w-full ">
          <span className="rounded-l-sm border border-r-0   bg-gray-100  p-2 text-gray-500 ">
            +82
          </span>
          <input
            id={name ? name : undefined}
            type="tel"
            className="w-full rounded-sm rounded-l-none border-gray-200 shadow-sm placeholder:text-gray-300 focus:border-orange-400 focus:ring-orange-400"
            {...register}
            placeholder="01012345678"
            {...rest}
          />
        </div>
      );
      break;

    case "price":
      inputPrice = (
        <div className="relative mb-5 flex items-center ">
          <span className="pointer-events-none absolute left-2 text-gray-500">
            $
          </span>

          <input
            type="text"
            className="w-full appearance-none rounded-sm border border-gray-200 px-3 py-2 pl-7 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            {...register}
            {...rest}
          />
          <span className=" pointer-events-none absolute right-5 text-gray-500">
            USD
          </span>
        </div>
      );
      break;
  }
  return (
    <>
      {!label ? (
        <>
          {inputChat ? inputChat : null}
          {inputText ? inputText : null}
          {inputEmail ? inputEmail : null}
          {inputPhone ? inputPhone : null}
          {inputPrice ? inputPrice : null}
        </>
      ) : (
        <label className="select-none">
          {label}
          {inputChat ? inputChat : null}
          {inputText ? inputText : null}
          {inputEmail ? inputEmail : null}
          {inputPhone ? inputPhone : null}
          {inputPrice ? inputPrice : null}
        </label>
      )}
    </>
  );
}
