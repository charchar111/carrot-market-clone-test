import { CLOUDFLARE_CUSTOMER_SUBDOMAIN } from "@/libs/constant";
import { Stream } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface propsListItemLives {
  element: Stream;
}

export default function ListItemLives({ element }: propsListItemLives) {
  return (
    <div className="list__element  border-b-2 last:border-b-0 ">
      <Link href={`/lives/${element.id}`}>
        <div className="mt-5 px-4 pb-5">
          <div className="video relative mb-2 aspect-video rounded-lg bg-gray-400">
            <Image
              src={`https://${CLOUDFLARE_CUSTOMER_SUBDOMAIN}.cloudflarestream.com/${element?.streamId}/thumbnails/thumbnail.jpg?height=400`}
              alt=""
              fill={true}
            />
          </div>
        </div>
        <div className="info mb-4 px-6">
          <h2 className="text-lg font-semibold text-gray-800">
            {element.name}
          </h2>
        </div>
      </Link>
    </div>
  );
}
