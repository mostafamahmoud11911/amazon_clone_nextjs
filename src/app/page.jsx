import Banner from "@/components/Banner";
import Product from "@/components/Product";

const getData = async () => {
  const res = await fetch(`https://fakestoreapiserver.reactbd.com/tech`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default async function Home() {
  const product = await getData();

  return (
    <>
      <div className="max-w-screen-2xl mx-auto">
        <Banner />
        <div className="relative md:-mt-20 lgl:-mt-32 xl:-mt-60 z-20 mb-10">
          <Product product={product} />
        </div>
      </div>
    </>
  );
}
