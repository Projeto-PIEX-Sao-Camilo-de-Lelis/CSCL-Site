import { useState } from "react";

export default function Field({type, placeholder, onChange}){
    return(
        <input type={type}
               placeholder={placeholder}    
               onChange={onChange}
               className={"h-[40px] bg-white text-black mb-3 text-center w-full rounded-2xl"}     
        />
    )
}