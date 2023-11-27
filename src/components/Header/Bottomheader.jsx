"use client";
import { removeUser } from "@/redux/nextSlice";
import { signOut, useSession } from "next-auth/react";
import { LuMenu } from "react-icons/lu";
import { useDispatch } from "react-redux";
export default function Bottomheader() {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  function handleRemoveUser() {
    signOut();
    dispatch(removeUser());
  }
  
  return (
    <div className="w-full h-10 bg-amazon_light text-white px-4 text-sm flex items-center">
      <p className="flex items-center gap-1 h-8 border border-transparent hover:border-white cursor-pointer duration-300 px-2">
        <LuMenu className="text-xl" /> All
      </p>
      <p className="hidden md:inline-flex items-center h-8 border border-transparent hover:border-white cursor-pointer duration-300 px-2">
        Todays Deals
      </p>
      <p className="hidden md:inline-flex items-center h-8 border border-transparent hover:border-white cursor-pointer duration-300 px-2">
        Customer Service
      </p>

      <p className="hidden md:inline-flex items-center h-8 border border-transparent hover:border-white cursor-pointer duration-300 px-2">
        Registery
      </p>

      <p className="hidden md:inline-flex items-center h-8 border border-transparent hover:border-white cursor-pointer duration-300 px-2">
        Gift Cards
      </p>
      <p className="hidden md:inline-flex items-center h-8 border border-transparent hover:border-white cursor-pointer duration-300 px-2">
        Sell
      </p>
      {session?.user ? (
        <p
          onClick={handleRemoveUser}
          className="hidden md:inline-flex items-center h-8 border border-transparent hover:border-red-600 hover:text-red-600 text-amazon_yellow  cursor-pointer duration-300 px-2"
        >
          Sign Out
        </p>
      ) : (
        ""
      )}
    </div>
  );
}
