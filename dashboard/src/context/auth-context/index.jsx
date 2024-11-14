import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { registerService } from "@/services";
import { createContext, useState } from "react";


export const AuthContext = createContext(null);


export default function AuthProvider({ children }) {
    
    const [signInFormData, setSignInFormData] = useState(initialSignInFormData)
    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData)

    const handleRegisterUser = async(event) => {
        event.preventDefault();
        const data = await registerService(signUpFormData);

        console.log('DATA->',data);
        
    }

    return (
        <AuthContext.Provider 
            value={{
                signInFormData, 
                setSignInFormData,
                signUpFormData, 
                setSignUpFormData,
                handleRegisterUser
            }}
        >
            {children}
        </AuthContext.Provider>)
}