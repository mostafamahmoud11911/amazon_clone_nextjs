import Image from "next/image";
import FormatPrice from "./FormatPrice";
import { LuMinus, LuPlus } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  decreamentQuantity,
  deleteProduct,
  increaseQuantity,
} from "@/redux/nextSlice";

export default function CartProduct({ item }) {
  const dispatch = useDispatch();
  return (
    <div className="bg-gray-100 mx-auto rounded-lg gap-4">
      <Image
        className="object-cover"
        src={item.image}
        width={150}
        height={150}
        alt="cartimg"
      />
      <div className="p-10">
        <div className="flex flex-col gap-1 mb-5">
          <p className="text-lg font-semibold text-amazon_blue">{item.title}</p>
          <p className="text-sm text-gray-600">{item.description}</p>
          <p className="text-sm text-gray-600">
            Unit Price{" "}
            <span className="font-semibold text-amazon_blue">
              <FormatPrice amount={item.price} />
            </span>
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center justify-between border border-gray-300 px-4 py-1 rounded-full w-28 shadow-lg shadow-gray-300">
              <span
                onClick={() =>
                  dispatch(
                    increaseQuantity({
                      _id: item._id,
                      title: item.title,
                      image: item.image,
                      price: item.price,
                      oldPrice: item.oldPrice,
                      isNew: item.isNew,
                      category: item.category,
                      description: item.description,
                      brand: item.brand,
                      quantity: 1,
                    })
                  )
                }
                className="w-6 h-6 flex items-center justify-center bg-transparent rounded-full hover:bg-gray-300 decoration-purple-300 duration-300 cursor-pointer"
              >
                <LuPlus />
              </span>
              <span>{item.quantity}</span>
              <span
                onClick={() =>
                  dispatch(
                    decreamentQuantity({
                      _id: item._id,
                      title: item.title,
                      image: item.image,
                      price: item.price,
                      oldPrice: item.oldPrice,
                      isNew: item.isNew,
                      category: item.category,
                      description: item.description,
                      brand: item.brand,
                      quantity: 1,
                    })
                  )
                }
                className="w-6 h-6 flex items-center justify-center bg-transparent rounded-full hover:bg-gray-300 decoration-purple-300 duration-300 cursor-pointer"
              >
                <LuMinus />
              </span>
            </div>
            <div
              onClick={() => dispatch(deleteProduct(item._id))}
              className="flex items-center text-sm font-medium text-gray-400 hover:text-red-600 duration-300 cursor-pointer"
            >
              <IoMdClose className="mt-[2px]" /> <p>remove</p>
            </div>
          </div>
        </div>
        <div className="text-lg font-semibold text-amazon_blue">
          <FormatPrice amount={item.price * item.quantity} />
        </div>
      </div>
    </div>
  );
}
