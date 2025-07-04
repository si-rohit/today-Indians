'use client'
import AuthLayout from '@/components/AuthLayout';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import image1 from "@/public/images/login111.png";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegEye,FaRegEyeSlash  } from "react-icons/fa";
import { setUser, setUserFolders } from '@/app/redux/authSlice';

const Page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [invalidCredentials, setInvalidCredentials] = useState('');
    const [resetResponse, setResetResponse] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const turnstileRef = useRef(null);

    const { user } = useSelector(store => store.auth);
    // console.log(user);

    if (user) {
      router.push("/");
    }

    const reserRespo = localStorage.getItem('reserRespo');
    useEffect(() => {
      if (reserRespo) {
        setResetResponse("Your password has been reset successfully.");
        localStorage.removeItem('reserRespo');
      }
    }, [reserRespo]);

    // 0x4AAAAAABi-wRnnMG64Q4PaPSkn1kckgWA

    useEffect(() => {
      const script = document.createElement('script');
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      document.body.appendChild(script);
    }, []);
    const turnstileToken = document.querySelector('input[name="cf-turnstile-response"]')?.value;
    // if (!turnstileToken) {
    // setInvalidCredentials("Turnstile verification failed. Please try again.");
    //       return;
    //     }

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
        // console.log(data);
        localStorage.setItem('2sv', data["2sv"]);
        if (data === null) {
          setInvalidCredentials("Please check your credentials.");
          setLoading(false);
          setEmail("");
          setPassword("");      
        }
        else if (data.response === "error") {
          setInvalidCredentials("Please check your credentials.");
          setLoading(false);
          setEmail("");
          setPassword("");      
        }else if (data["2sv"] === "1") {
          try {
            const formData = new FormData();
            formData.append('resend', 1);
            formData.append('data', email);
            const resp = await fetch(`https://5341.general.pointer.8080-server.net/verify_otp?uid=${data.user_id}&channel=42`, {
              method: 'POST',
              headers: {
                'Authorization': '1',
              },
              body: formData
            });
            const data1 = await resp.json();
            // console.log(data1);
            if (data1.response === "error") {
              setInvalidCredentials("Invalid email or password.");
              setLoading(false);
              setEmail("");
              setPassword("");      
            }
            else{
              localStorage.setItem('email', email );
              localStorage.setItem('uid', data.user_id );
              router.push("/auth/otp-verification");
            }         
          } catch (error) {
            console.log(error);
          }    
        }else if (data.status === "1") {       
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

                if (userdata[0]?.user_id) {
                  dispatch(setUser(userdata[0]));

                  try {
                    const res = await fetch(`/api/find-Folder-by-id`, {
                      method: "POST",
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ name: userdata[0].user_id }),
                    });

                    const APIres = await res.json();

                    if (APIres.error) {
                      const createRes = await fetch(`/api/create-folder`, {
                        method: "POST",
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ folderName: `${userdata[0].user_id}` }),
                      });

                      const createdFolder = await createRes.json();
                      dispatch(setUserFolders(createdFolder.folder._id));
                    } else {
                      dispatch(setUserFolders(APIres.folder._id));
                    }

                    router.push("/");
                  } catch (err) {
                    console.error("Error while managing folder:", err);
                  }
                } else {
                  dispatch(setUser(null));
                }
              } catch (error) {
                console.error('Error fetching user data:', error);
              }
            };

            if (data?.user_id) {
              fetchUser();
            }
        }else{
          const formData = new FormData();
          formData.append('resend', 1);
          formData.append('data', email);
          const resp = await fetch(`https://5341.general.pointer.8080-server.net/verify_otp?uid=${data.user_id}&channel=42`, {
            method: 'POST',
            headers: {
              'Authorization': '1',
            },
            body: formData
          });
          const data1 = await resp.json();
          console.log(data1);
          if (data1.response === "error") {
            setInvalidCredentials("Please check your credentials.");
            setLoading(false);
            setEmail("");
            setPassword("");      
          }
          else{
            localStorage.setItem('email', email );
            localStorage.setItem('uid', data.user_id );
            router.push("/auth/otp-verification");
          }         
        }       
      };
  return (
    <AuthLayout title="Login" image={image1}>
      <h4 className='text-center text-gray-100'>Please login to your account</h4>
      <form onSubmit={handleLogin} className="space-y-4 relative mt-3 flex flex-col items-center justify-center mx-auto min-w-[200px] max-w-[300px]">
        <p className={`text-white -mt-2 text-[14px] w-full text-center ${resetResponse === '' ? 'hidden' : ''}`}>{resetResponse}</p>
        <p className={`text-red-500 mb-2 -mt-2 text-[14px] w-full text-center ${invalidCredentials === '' ? 'hidden' : ''}`}>{invalidCredentials}</p>
        <input
          type="text"
          placeholder="Email "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="Input"
          required
          onClick={() => setInvalidCredentials('')}
        />
        <div className='relative w-full'>
          <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="Input"
          required
          onClick={() => setInvalidCredentials('')}
        />
          {showPassword ? (
            <FaRegEye className={`absolute top-[31%] right-4 transform text-lg cursor-pointer ${password === '' ?'hidden':''}`} onClick={() => setShowPassword(false)} />
          ) : (
            <FaRegEyeSlash className={`absolute top-[31%] right-4 transform text-lg cursor-pointer ${password === '' ?'hidden':''}`} onClick={() => setShowPassword(true)} />
          )}
        </div>
        
        <div className='w-full flex items-center justify-center'>
          <div
            className="cf-turnstile "
            data-sitekey="0x4AAAAAABi-wbTsyIksD7gu"
            data-theme="dark" // or dark
            ref={turnstileRef}
            data-size="normal"
          />
        </div>

        <div className='w-full flex items-center text-white -mt-2'>
          <input
            type="checkbox"
            id="show-password"
            className="mr-2"
          />
          <label htmlFor="show-password">Remember me</label>
        </div>
        
        <button
          type="submit"
          disabled={password === '' || email === '' || turnstileToken === ''}
          className={`Button ${password === '' || email === '' || turnstileToken === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? <span className="loader"></span>: "Login"
            }
        </button>
        <div className="text-sm text-center text-gray-300">
          <Link href="/auth/forgot-password">Forgot Password?</Link>
        </div>
        <div className="text-sm text-center text-gray-300">
          <Link href="auth/register">Create new Account →</Link>
        </div>
      </form>
    </AuthLayout>
  )
}

export default Page