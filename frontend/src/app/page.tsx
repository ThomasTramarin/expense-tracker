export const dynamic = "force-dynamic";

const getData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/test`);
  const data = await res.json();
  return data;
};

export default async function Home() {
  const data = await getData();

  return <div className="bg-gray-500">Test message: {data.message}</div>;
}
