"use client";
import { useUserContext } from "@/context/UserContext";
import React, { useEffect } from "react";

function Page() {
	const { email } = useUserContext();

	return (
		<div>
			<p className="text-center m-5 font-bold text-5xl">Booking Confirmed</p>
		</div>
	);
}

export default Page;
