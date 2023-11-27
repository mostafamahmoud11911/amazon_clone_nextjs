import logo from "@/images/logo.png";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="w-full h-20 bg-amazon_light text-gray-300 flex items-center justify-center">
      <Image src={logo} className="w-24" alt=""/>
    </div>
  );
}
