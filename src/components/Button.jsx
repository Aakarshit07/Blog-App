function Button({ 
    children,
    type = "button",
    bgColor = "bg-[#90e0ef]",
    textColor = "text-black",
    className = "",
    ...props // used when user given anyother prop that we didnt defined 
}) {

    return (
        <button className={`px-4 py-2 rounded-lg ${bgColor} 
        ${textColor} ${className} hover:bg-[#caf0f8] `} {...props} type={type}>
            {children}
        </button>
    )
}

export default Button;