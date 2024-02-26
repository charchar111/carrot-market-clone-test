import dynamic from "next/dynamic";

console.log("dynamic down");

export default function TestSection() {
  console.log("dynamic render");
  return (
    <section>
      <p>test dynamic</p>
    </section>
  );
}
