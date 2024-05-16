'use client'
import { createContext, useContext, useState } from "react";
const UserContext = createContext<any>(undefined);

export function UserContextProvider({ children }: {
    children: React.ReactNode;
}) {
    const [UserToken, setUserToken] = useState(null);
    const [userData, setuserData] = useState(null);
    return (
        <UserContext.Provider
            value={{ UserToken, setUserToken, setuserData, userData }}
        >
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    return useContext(UserContext);
}