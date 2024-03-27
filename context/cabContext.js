"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const CabContext = createContext();

export const useCabContext = () => useContext(CabContext);

export const CabProvider = ({ children }) => {
	const [cabs, setCabs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [errorCaught, setErrorCaught] = useState(false);

	useEffect(() => {
		async function fetchCabs() {
			try {
				const response = await fetch(
					"http://localhost:8000/api/v1/cabs/all-cabs"
				);
				if (!response.ok) {
					throw new Error("Failed to fetch cab details");
				}
				const data = await response.json();
				console.log(data);
				setCabs(data);
				setLoading(false);
			} catch (error) {
				setErrorCaught(true);
				console.error("Error fetching cabs:", error.message);
				setLoading(false);
			}
		}
		fetchCabs();
	}, []);

	return (
		<CabContext.Provider
			value={{
				cabs,
				loading,
				errorCaught,
				setCabs,
				setLoading,
				setErrorCaught,
			}}
		>
			{children}
		</CabContext.Provider>
	);
};
