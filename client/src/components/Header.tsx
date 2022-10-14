// import { useEffect, useRef, useState } from "react";

// import styles from "../styles/global"


export interface IHeader {}

const Header: React.FC<IHeader> = () => {
  return (
    <div className="container mx-auto">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
            <h1 className="cursor-pointer font-bold text-4xl text-black">Graph Blog</h1>
        </div>
        <div className="hidden md:float-left md:contents">
          <h1 className="text-blue-700">Hi</h1>
        </div>
      </div>
    </div>
  )
}

export default Header;