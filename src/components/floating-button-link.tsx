import { makeClassName } from "@/libs/client/utils";
import Link from "next/link";

interface floatingButtonProps {
  children: React.ReactNode;
  href: string;
  bottom?: string;
}

export default function FloatingButtonLink({
  children,
  href,
  bottom,
}: floatingButtonProps) {
  return (
    <div
      className={makeClassName(
        "pointer-events-none fixed inset-x-0",
        "bottom-[5rem]",
        "z-10 mx-auto flex max-w-lg justify-end",
      )}
      //  "pointer-events-none fixed inset-x-0 bottom-20 z-10 mx-auto flex max-w-lg justify-end"
    >
      <Link href={href}>
        <button className=" pointer-events-auto bottom-12 right-12 m-3 rounded-full bg-orange-400 p-4 text-white opacity-80 transition-all hover:bg-orange-500 hover:opacity-100">
          {children}
        </button>
      </Link>
    </div>
  );
}
