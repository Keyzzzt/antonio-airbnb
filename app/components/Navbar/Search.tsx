"use client";
import { BiSearch } from "react-icons/bi";

export const Search = () => {
  return (
    <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md cursor-pointer transition">
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">Anywhere</div>
        <div className="flex-1 text-center hidden sm:block text-sm font-semibold px-6 border-x-[1px]">
          Any week
        </div>
        <div className="text-sm pl-6 pr-2 flex flex-row items-center gap-3">
          <div className="hidden sm:block font-semibold">Add Guests</div>
          <div className="p-2 bg-black rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};
