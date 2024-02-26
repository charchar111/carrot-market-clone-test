import { makeClassName } from "@/libs/client/utils";

interface TextareaProps {
  label?: string;
  name?: string;
  height?: string;
  [key: string]: any;
}

export default function Textarea({
  label,
  height,
  register,
  ...rest
}: TextareaProps) {
  return (
    <>
      {!label ? (
        <textarea
          className={makeClassName(
            "mb-2",
            `h-${height ? [height] : 64}`,
            "w-full resize-none rounded-sm border-gray-200 shadow-sm",
          )}
          {...register}
          {...rest}
        />
      ) : (
        <label>
          {label}
          <textarea
            className={makeClassName(
              "mb-2",
              `h-${height ? [height] : 64}`,
              "w-full resize-none rounded-sm border-gray-200 shadow-sm",
            )}
            {...register}
            {...rest}
          />
        </label>
      )}
    </>
  );
}
