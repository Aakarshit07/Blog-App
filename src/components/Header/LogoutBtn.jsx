import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout()
        .then(()=> {
            dispatch(logout())
        })
        // .catch((error) => console.log("Something Went Wrong While fetching current user: ", error.message));

    }

    return (
        <button 
            className="inline-block px-6 py-2 font-semibold duration-200 hover:bg-[#F7E1D7] rounded-full"
            onClick={logoutHandler}
        >
            Logout
        </button>
    )
}

export default LogoutBtn;