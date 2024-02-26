import Input from "@/components/input";
import { Layout } from "@/components/layouts";
import Message from "@/components/message";
import { globalProps } from "@/libs/types";

export default function chatDetail({ user: { isLoading, user } }: globalProps) {
  return (
    <Layout canGoBack user={!isLoading && user ? user : undefined}>
      <div id="chat-detail" className="space-y-5 px-4 ">
        {[...Array(14)].map((_, i) => {
          if (i % 3 === 0)
            return (
              <Message
                id={i}
                text="Hi how much are you selling them for?"
                avatarUrl=""
              />
            );
          if (i % 3 === 1)
            return (
              <Message id={i} text="I want 20,000₩" reverse avatarUrl="" />
            );

          if (i % 3 === 2) return <Message id={i} text="미쳤어" avatarUrl="" />;
          return null;
        })}

        <div className="chat-input fixed inset-x-2  bottom-0 pb-5  ">
          <div className="relative mx-auto flex max-w-lg items-center justify-center  ">
            <Input kind="chat" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
