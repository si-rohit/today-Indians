'use client'
import AuthLayout from '@/components/AuthLayout';
import Link from 'next/link';
import React, { useState } from 'react'
import image1 from "@/public/images/login111.png";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setUserFolders } from '../redux/authSlice';
// import loginImg from "@/public/images/Log-in.png";

const Page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { user } = useSelector(store => store.auth);
    // console.log(user);

    if (user) {
      router.push("/");
    }

    const handleLogin = async(e) => {
        e.preventDefault();
        setLoading(true);
        const response = await fetch('https://5341.general.pointer.8080-server.net/login?id=42', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 1',
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (data.response === "error") {
          alert("Invalid email or password.");   
          setLoading(false);
          setEmail("");
          setPassword("");      
        }
        else{
          const fetchUser = async () => {
            try {
              const response = await fetch(`https://5341.general.pointer.8080-server.net/user?id=${data.user_id}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': '1',
                },
                body: JSON.stringify({ user: data.user_id }),
              });
              const userdata = await response.json();
              // console.log(userdata);
              if (userdata[0].user_id) {
                dispatch(setUser(userdata[0]));

                // find user folder
                const res = await fetch(`/api/find-User-by-name`, {
                  method:"POST",
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body:JSON.stringify({name:userdata[0].user_id})
                });
                const APIres = await res.json();
                // console.log(APIres);

                // create new folder if not exist
                if (APIres.error) {
                  const res = await fetch(`/api/create-folder`, {
                    method:"POST",
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({folderName:`${userdata[0].user_id}`})
                  });
                  const APIres = await res.json();
                  console.log(APIres);
                  dispatch(setUserFolders(APIres.folder._id));
                }else{
                  dispatch(setUserFolders(APIres.folderId));
                }
                router.push("/");
              }else{
                dispatch(setUser(null));
                alert("User not found");
              }
              
              // return userdata;
            } catch (error) {
              console.error('Error fetching data:', error);
            }

          }
          const userData = await fetchUser();
          // console.log(userData);
          // dispatch(setUser(userData));
          // router.push("/");
          
        }       
      };
  return (
    <AuthLayout title="Login" image={image1}>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-[#222] text-white hover:bg-[#111] group/button"
        >
          {loading ? <div className='flex items-center justify-center py-1 border border-[#222] group-hover/button:border-[#111]'>
                        <div className="loader">
                          <div className="box-load1"></div>
                          <div className="box-load2"></div>
                          <div className="box-load3"></div>
                        </div>
                      </div>: "Login"
            }
        </button>
        <div className="text-sm text-center text-gray-600">
          <Link href="/auth/forgot-password">Forgot Username / Password?</Link>
        </div>
        <div className="text-sm text-center text-gray-600">
          <Link href="auth/register">Create new Account →</Link>
        </div>
      </form>
    </AuthLayout>
  )
}

export default Page