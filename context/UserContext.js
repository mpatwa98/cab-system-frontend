"use client";
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [email, setEmail] = useState("");

	return (
		<UserContext.Provider value={{ email, setEmail }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => useContext(UserContext);
