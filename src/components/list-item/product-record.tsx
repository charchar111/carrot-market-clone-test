import { IResponse, ProductWithCount } from "@/libs/types";
import { Record } from "@prisma/client";
import useSWR from "swr";
import Item from "./product";

interface RecordWithProduct extends Record {
  product: ProductWithCount;
}

interface IResponseSale extends IResponse {
  records: RecordWithProduct[];
}

interface ItemProductRecordProps {
  kind: "sale" | "purchase" | "favorite";
}

export default function ItemProductRecord({ kind }: ItemProductRecordProps) {
  const { data, isLoading } = useSWR<IResponseSale>(
    kind ? `/api/users/me/record?kind=${kind}` : null,
  );

  return (
    <div>
      {!data
        ? null
        : data?.records?.map((element, i) => (
            <Item
              key={i}
              title={element.product.name}
              price={element.product.price}
              id={element.product.id}
              heart={element.product._count.Records}
            ></Item>
          ))}
    </div>
  );
}
