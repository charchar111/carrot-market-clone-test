import { Layout } from "@/components/layouts";
import { globalProps } from "@/libs/types";
import type { NextPage } from "next";
import Link from "next/link";

const Chats: NextPage<globalProps> = ({ user: { isLoading, user } }) => {
  return (
    <Layout title="채팅" hasTabBar user={!isLoading && user ? user : undefined}>
      <div className=" divide-y-8 bg-gray-50 p-2">
        {[...Array(10)].map((_, i) => (
          <Link href={`chats/${i}`} key={i}>
            <div className="profill mb-3 flex w-full cursor-pointer items-center space-x-3 border-gray-100 bg-white px-4  pb-2  pt-4 shadow-sm ">
              <div className="h-10 w-10 rounded-full bg-slate-300" />
              <div>
                <p className="text-sm font-medium text-gray-700">Steve Jebs</p>
                <p className="text-xs font-medium text-gray-500">
                  {`hello see you tommorow in the restaurant at 2pm :)`}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
