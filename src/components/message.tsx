import { makeClassName } from "@/libs/client/utils";

interface MessageProps {
  id: number;
  text: string;
  reverse?: boolean;
  avatarUrl: string;
}

export default function Message({
  id,
  text,
  reverse = false,
  avatarUrl,
}: MessageProps) {
  return (
    <div
      className={makeClassName(
        "flex",
        reverse ? "flex-row-reverse" : "",
        "space-x-2",
        reverse ? "space-x-reverse" : "",
      )}
      key={id}
    >
      <div className="profill-img my-1 h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-400 " />
      <div className="w-[50%] rounded-md border p-2  shadow-sm">{text}</div>
    </div>
  );
}
