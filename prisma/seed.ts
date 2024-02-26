import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function seedStream(kind: string) {
  if (kind == "product")
    [...Array.from(Array(500).keys())].forEach(async (item) => {
      await client.product.create({
        data: {
          image: "",
          name: String(item),
          description: String(item),
          price: item,
          user: { connect: { id: 3 } },
        },
      });

      console.log(item);
    });

  if (kind == "stream")
    [...Array.from(Array(500).keys())].forEach(async (item) => {
      await client.stream.create({
        data: {
          name: String(item),
          description: String(item),
          price: item,
          user: { connect: { id: 3 } },
        },
      });
    });

  if (kind == "community")
    [...Array.from(Array(500).keys())].forEach(async (item) => {
      await client.post.create({
        data: {
          title: String(item),
          content: String(item),
          user: { connect: { id: 3 } },
        },
      });

      console.log(item);
    });
}

seedStream("community")
  .catch((e) => console.log("error", e))
  .finally(() => client.$disconnect());
