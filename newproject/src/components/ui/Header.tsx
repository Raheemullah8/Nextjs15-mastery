import React from "react";
import { Input } from "./input";
import AuthHeader from "@/components/AuthHeader";


const Header = async () => {


  return (
    <div className="bg-gray-800 text-white p-4 flex flex-col sm:flex-row sm:justify-between items-center gap-4 w-full">
      {/* Logo */}
      <div className="text-3xl font-bold">Discus</div>

      {/* Search Input */}
      <div className="w-full sm:w-1/2">
        <Input type="text" placeholder="Search..." className="w-full" />
      </div>

     
     <AuthHeader/>
    </div>
  );
};

export default Header;
