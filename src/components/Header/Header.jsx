import { Container, Logo, LogoutBtn } from "../index"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";




function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate();

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true,
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Posts",
            slug: "/add-post",
            active: authStatus,
        },
    ]

    return (
        <header className="py-3 shadow bg-[#B0C4B1]"> 
            <Container >
                <nav className="flex justify-center items-center">
                    <div className="mr-4 ">
                        <Link to="/">
                            <Logo width="70px"/>
                        </Link>
                    </div>
                    <ul className="flex ml-auto">
                        {navItems.map((item) => 
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className="inline-block px-6 py-2 font-semibold text-[#023047] duration-200 hover:bg-[#F7E1D7] rounded-full"
                                    >{item.name}</button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header;