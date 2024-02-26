interface ButtonDefaultProps {
  text: string | null;
}

export default function ButtonDefault({ text }: ButtonDefaultProps) {
  return (
    <button className="w-full rounded-sm bg-orange-400 p-2 px-4 text-white transition-all hover:bg-orange-500">
      {text}
    </button>
  );
}
