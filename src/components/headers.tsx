import Link from "next/link";
import { useRouter } from "next/router";

interface HeaderProps {
  title?: string;
  canGoBack?: boolean;
}

export const Header = function ({ title, canGoBack }: HeaderProps) {
  const router = useRouter();
  const onClickRouterBack = () => router.back();
  return (
    <header className=" fixed top-0 w-full  max-w-lg  border-b bg-white font-medium">
      <div className="title flex justify-center p-2 text-lg text-gray-600">
        {title ? (
          <span className="w-full only:text-center">{title}</span>
        ) : null}
        {canGoBack ? (
          <span className="flex w-[20%] cursor-pointer justify-end opacity-80 only:w-full hover:opacity-100">
            <svg
              onClick={onClickRouterBack}
              className=" h-6 w-6 "
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        ) : null}
      </div>
    </header>
  );
};
