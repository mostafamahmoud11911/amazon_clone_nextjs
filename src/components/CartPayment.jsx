import { SiMediamarkt } from "react-icons/si";
import FormatPrice from "./FormatPrice";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";

export default function CartPayment() {
  const { productData, userInfo } = useSelector((state) => state.next);
  const totalPrice = productData.reduce((x, y) => x + y.quantity * y.price, 0);
  const { data: session } = useSession();
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  async function handleCheckout() {
    const stripe = await stripePromise;
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: productData, email: session?.user?.email }),
    });

    const checkoutSession = await response.json();
    const result = await stripe?.redirectToCheckout({sessionId: checkoutSession.id});
    if(result.error){
      alert(result?.error.message)
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <span className="bg-green-600 rounded-full p-1 h-6 w-6 text-white text-sm flex items-center justify-center mt-1">
          <SiMediamarkt />
        </span>
        <p className="text-sm">
          Your order qualifies for FREE Shopping by Choosing this option at
          checkout. See details....
        </p>
      </div>
      <p className="flex justify-between items-center px-2 font-semibold">
        Total:{" "}
        <span className="font-bold text-xl">
          <FormatPrice amount={totalPrice} />
        </span>
      </p>
      {userInfo?.name === undefined || null ? (
        <div className="flex flex-col items-center">
          <button className="w-full h-10 text-sm font-semibold bg-amazon_blue bg-opacity-50 text-white rounded-lg cursor-not-allowed">
            Proceed to Buy
          </button>
          <p className="text-xs mt-1 text-red-500 font-semibold animate-bounce">
            Please login to continue
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <button
            onClick={()=>handleCheckout()}
            className="w-full h-10 text-sm font-semibold bg-amazon_blue bg-opacity-50 text-white rounded-lg"
          >
            Proceed to Buy
          </button>
        </div>
      )}
    </div>
  );
}
