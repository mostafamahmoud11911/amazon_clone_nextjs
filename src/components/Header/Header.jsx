"use client";
import logo from "@/images/logo.png";
import Image from "next/image";
import cartIcon from "@/images/cartIcon.png";
import { SlLocationPin } from "react-icons/sl";
import { HiOutlineSearch } from "react-icons/hi";
import { BiCaretDown } from "react-icons/bi";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { addUser } from "@/redux/nextSlice";
import SearchProduct from "../SearchProduct";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allData, setAllData] = useState([]);
  const { productData, favoriteData, allProducts , userInfo } = useSelector((x) => x.next);
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    setAllData(allProducts);
  }, [allProducts]);
  useEffect(() => {
    dispatch(
      addUser({
        name: session?.user?.name,
        email: session?.user?.email,
        img: session?.user?.image,
      })
    );
  }, [session]);



  // search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = allData.filter((item) =>
      item.title.toLocaleLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  return (
    <div className="w-full h-20 bg-amazon_blue text-lightText sticky top-0 z-50">
      <div className="h-full w-full mx-auto flex items-center justify-between gap-1 mdl:gap-3 px-4">
        <Link
          href={"/"}
          className="border border-transparent cursor-pointer hover:border-white flex items-center justify-center h-[70%] duration-300"
        >
          <Image src={logo} className="w-28 object-cover mt-1" alt="" />
        </Link>
        <div className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 items-center justify-center h-[70%] hidden xl:inline-flex gap-1">
          <SlLocationPin />
          <div className="text-xs">
            <p>Deliver to</p>
            <p className="text-white font-bold uppercase">USA</p>
          </div>
        </div>
        <div className="flex-1 h-10 hidden md:inline-flex items-center justify-between relative">
          <input
            className="w-full h-full rounded-md px-2 placeholder:text-sm text-black border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow"
            type="text"
            onChange={handleSearch}
            value={searchQuery}
            placeholder="search next amazon product"
          />
          <span className="w-12 h-full bg-amazon_yellow text-black text-2xl flex items-center justify-center absolute right-0 rounded-tr-md rounded-br-md">
            <HiOutlineSearch />
          </span>
          {searchQuery && (
            <div className="absolute left-0 top-12 w-full mx-auto max-h-96 bg-gray-200 rounded-lg overflow-y-scroll cursor-pointer text-black">
              {filteredProducts.length > 0 ? (
                <>
                  {searchQuery &&
                    filteredProducts.map((item) => (
                      <Link
                        key={item._id}
                        className="w-full border-b-[1px] border-b-gray-400 flex items-center gap-4"
                        href={{
                          pathname: `${item._id}`,
                          query: {
                            _id: item._id,
                            brand: item.brand,
                            category: item.category,
                            description: item.description,
                            image: item.image,
                            isNew: item.isNew,
                            oldPrice: item.oldPrice,
                            price: item.price,
                            title: item.title,
                          },
                        }}
                        onClick={() => setSearchQuery("")}
                      >
                        <SearchProduct item={item} />
                      </Link>
                    ))}
                </>
              ) : (
                <div className="bg-gray-50 flex items-center justify-center py-10 rounded-lg shadow-lg">
                  <p className="text-xl font-semibold animate-bounce">
                    Nothing is matches with your search keywords. Please try
                    again!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        {session ? (
          <div
            onClick={() => signIn("google")}
            className="text-sm text-gray-100 flex flex-col justify-center border border-transparent duration-300 h-[70%] cursor-pointer hover:border-white"
          >
            <p>Hello, {userInfo?.name}</p>
          </div>
        ) : (
          <div
            onClick={() => signIn("google")}
            className="text-sm text-gray-100 flex flex-col justify-center border border-transparent duration-300 h-[70%] cursor-pointer hover:border-white"
          >
            <p>Hello, sign in</p>
            <p className="flex items-center font-bold">
              Account & Lists{" "}
              <span>
                <BiCaretDown />
              </span>
            </p>
          </div>
        )}
        <Link href={'/favorite'} className="text-sm text-gray-100 flex flex-col justify-center border border-transparent relative duration-300 h-[70%] cursor-pointer hover:border-white">
          <p>Marked</p>
          <p className="text-white font-bold">& Favorite</p>
          {favoriteData.length > 0 && (
            <span className="absolute right-1 top-2 w-4 h-4 border-[1px] border-gray-400 text-xs text-amazon_yellow flex justify-center items-center">
              {favoriteData.length}
            </span>
          )}
        </Link>
        <Link
          href={`/cart`}
          className="flex items-center px-2 border border-transparent duration-300 h-[70%] cursor-pointer hover:border-white relative"
        >
          <Image src={cartIcon} className="w-auto h-8" alt="cartImg" />
          <p className="text-xs text-white font-white font-bold mt-3">Cart</p>
          <span className="absolute text-amazon_yellow top-2 left-[30px]  text-sm">
            {productData ? productData.length : 0}
          </span>
        </Link>
      </div>
    </div>
  );
}
