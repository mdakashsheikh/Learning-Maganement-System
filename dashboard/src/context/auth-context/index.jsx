import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, loginService, registerService } from "@/services";
import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext(null);


export default function AuthProvider({ children }) {
    
    const [signInFormData, setSignInFormData] = useState(initialSignInFormData)
    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData)
    const [auth, setAuth] = useState({
        authenticate: false,
        user: null
    })

    const handleRegisterUser = async(event) => {
        event.preventDefault();
        const data = await registerService(signUpFormData);
    }

    const handleLoginUser = async(event) => {
        event.preventDefault();
        const data = await loginService(signInFormData);

        if(data.success) {
            sessionStorage.setItem('accessToken', JSON.stringify(data.data.accessToken))
            setAuth({
                authenticate: true,
                user: data.data.user
            })
        } else {
            setAuth({
                authenticate: false,
                user: null
            })
        }
    }

    const checkAuthUser = async() => {
        const data = await checkAuthService();

        if(data.success) {
            setAuth({
                authenticate: true,
                user: data.data.user
            })
        } else {
            setAuth({
                authenticate: false,
                user: null
            })
        }
    }

    useEffect(() => {
        checkAuthUser()
    }, [])

    console.log(auth);
    

    return (
        <AuthContext.Provider 
            value={{
                signInFormData, 
                setSignInFormData,
                signUpFormData, 
                setSignUpFormData,
                handleRegisterUser,
                handleLoginUser
            }}
        >
            {children}
        </AuthContext.Provider>)
}