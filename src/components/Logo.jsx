import logo from "../assets/logo.png";
function Logo({ width="100px" }) { //{width = "100px"}
    return (
        <div width={width} className="p-2 w-24">
            <img src={logo} alt="Logo" />
        </div>
    )
}

export default Logo;