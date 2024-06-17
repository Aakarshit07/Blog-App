import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components/index.js'; 
import { Outlet } from 'react-router-dom';


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login({userData}))
      } else {
        // if user is not logged in we called the activity so 
        // that our state get updated all the time 
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])


  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-[#F7E1D7]">
        <div className='w-full block'>
            <Header />
            <main>
              <Outlet />
            </main>
            <Footer />
        </div>
    </div>
  ) : null
}

export default App
