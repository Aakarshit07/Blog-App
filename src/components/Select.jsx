import React, { useId } from "react";

function Select({ 
    options,
    label,
    className, //if yougive className like this it set to null by default or you can se it to empty string
    ...props 
}, ref) {
    const id = useId();
    return (
       <div className="w-full"> 
        {label && <label htmlFor={id} className="" ></label>}
        <select
            {...props}
            id={id}
            ref={ref}
            className={`px-3 py-2  rounded-lg bg-white
             text-black outline-none focus:bg-gray-50 
             duration-200 border border-gray-100 w-full 
             ${className}`}
        >
            {/* check only if options has some value only then we will map it*/}
            {options?.map((option) => (
                <option key={option} value={option} >
                    {option}
                </option>
            )) }
        </select>
       </div> 
    )
}   


export default React.forwardRef(Select)