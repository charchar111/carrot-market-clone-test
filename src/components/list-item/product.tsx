import Link from "next/link";

interface ItemProps {
  title: string;
  children?: React.ReactNode;
  price: number;
  id: number;
  // comment: number;
  heart: number;
}

export default function Item({ children, title, price, id, heart }: ItemProps) {
  return (
    <div
      className=" row flex justify-between border-b-2 p-4 py-8 last:border-b-0"
      key={id}
    >
      <Link href={`/products/${id}`}>
        <div className="row__column1 flex cursor-pointer items-center space-x-2">
          <div className="img-wrapper aspect-square w-20 rounded-lg bg-gray-400" />
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-600">{title}</h3>
            {children}
            <span className="font-semibold">${price}</span>
          </div>
        </div>
      </Link>

      <div className="row__column2 flex items-end space-x-5">
        <div className="column2__icon1 flex items-center space-x-1 text-gray-500 ">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
          <span>{heart}</span>
        </div>
        {/* <div className="column2__icon2 flex items-center  space-x-1 text-gray-500">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            ></path>
          </svg>
          <span>{comment}</span>
        </div> */}
      </div>
    </div>
  );
}
