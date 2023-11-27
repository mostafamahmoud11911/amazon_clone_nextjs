import { resetCart } from "@/redux/nextSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

export default function Success() {
    const dispatch = useDispatch()
    const state = useSelector((x)=>x.next);
    console.log(state)
  return (
    <div className="flex flex-col gap-2 items-center justify-center py-20">
      <h1 className="text-2xl text-hoverBg font-semibold">
        Thank you for shopping in next_amazon_yt
      </h1>
      <Link
        className="text-lg text-gray-500 hover:underline underline-offset-4 decoration-[1px] hover:text-blue-600 duration-300"
        href={"/"}
        onClick={()=>dispatch(resetCart())}
      >
        <p>Continue Shopping</p>
      </Link>
    </div>
  );
}
