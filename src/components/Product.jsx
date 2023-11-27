"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { HiShoppingCart } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import FormatPrice from "./FormatPrice";
import { useDispatch } from "react-redux";
import { addCart, addTofavorite, setAllProduct } from "@/redux/nextSlice";

export default function Product({ product }) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAllProduct(product));
  }, []);

  return (
    <div className="w-full px-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {product.map(
        ({
          _id,
          title,
          image,
          isNew,
          oldPrice,
          price,
          category,
          description,
          brand,
        }) => (
          <div
            key={_id}
            className="bg-white w-full overflow-hidden text-black p-4 border border-gray-300 rounded-lg group "
          >
            <div className="w-full h-[260px] relative">
              <Image
                src={image}
                width={300}
                height={300}
                className="w-full h-full object-cover scale-90 hover:scale-100 duration-300 transition-transform"
                alt=""
              />
              <div className="w-12 h-24 absolute bottom-10 right-0 border-[1px] border-gray-400 bg-white rounded-md flex flex-col justify-center items-center translate-x-20 group-hover:translate-x-0 duration-300 transition-transform">
                <span
                  onClick={() =>
                    dispatch(
                      addCart({
                        _id: _id,
                        title: title,
                        image: image,
                        price: price,
                        oldPrice: oldPrice,
                        isNew: isNew,
                        category: category,
                        description: description,
                        brand: brand,
                        quantity: 1,
                      })
                    )
                  }
                  className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300"
                >
                  <HiShoppingCart />
                </span>
                <span
                  onClick={() =>
                    dispatch(
                      addTofavorite({
                        _id: _id,
                        title: title,
                        image: image,
                        price: price,
                        oldPrice: oldPrice,
                        isNew: isNew,
                        category: category,
                        description: description,
                        brand: brand,
                        quantity: 1,
                      })
                    )
                  }
                  className="w-full h-full  flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300"
                >
                  <FaHeart />
                </span>
              </div>
              {isNew && (
                <p className="absolute top-0 right-0 text-amazon_blue font-medium text-xs tracking-wide animate-bounce">
                  !save <FormatPrice amount={oldPrice - price} />
                </p>
              )}
            </div>
            <hr />
            <div className="px-4 py-3 flex flex-col gap-1">
              <p className="text-xs text-gray-500 tracking-wide">{category}</p>
              <p className="text-base font-medium">{title}</p>
              <p className="flex items-center gap-2">
                <span className="line-through text-sm">
                  <FormatPrice amount={oldPrice} />
                </span>
                <span className="font-semibold text-amazon_blue">
                  <FormatPrice amount={price} />
                </span>
              </p>
              <p className="text-xs text-gray-600 text-justify">
                {description.substring(0, 120)}
              </p>
              <button
                onClick={() =>
                  dispatch(
                    addCart({
                      _id: _id,
                      title: title,
                      image: image,
                      price: price,
                      oldPrice: oldPrice,
                      isNew: isNew,
                      category: category,
                      description: description,
                      brand: brand,
                      quantity: 1,
                    })
                  )
                }
                className="h-10 bg-amazon_blue text-white font-medium rounded-md hover:bg-amazon_yellow hover:text-black duration-300 mt-2"
              >
                add to cart
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
