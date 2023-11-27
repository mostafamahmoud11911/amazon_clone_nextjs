"use client";
import CartPayment from "@/components/CartPayment";
import CartProduct from "@/components/CartProduct";
import ResetCart from "@/components/ResetCart";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Cart() {
  const { productData } = useSelector((state) => state.next);

  return (
    <div className="max-w-screen-2xl mx-auto px-6 flex flex-col gap-5 py-4">
      {productData.length > 0 ? (
        <>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center justify-between border-b-[1px] border-b-gray-400 pb-1">
              <p className="text-2xl font-semibold text-amazon_blue">
                Shopping cart
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {productData.map((item) => (
                <div key={item._id} className="pt-2 flex flex-col gap-2">
                  <CartProduct item={item} />
                </div>
              ))}
              <ResetCart />
            </div>
          </div>
          <div className="bg-white p-3 h-64 flex items-center justify-center rounded-lg">
            <CartPayment />
          </div>
        </>
      ) : (
        <div className="h-64 bg-white flex flex-col items-center justify-center rounded-lg shadow-lg py-5">
          <h1 className="text-lg font-medium">your cart is empty</h1>
          <Link href={"/"}>
            <div>go to shopping</div>
          </Link>
        </div>
      )}
    </div>
  );
}
