"use client";
import { useUserContext } from "@/context/UserContext";
import Link from "next/link";
import React from "react";

function Page() {
	const { email } = useUserContext();

	return (
		<div>
			<p className="text-center m-5 font-bold text-5xl">Booking Confirmed</p>
			<p className="text-center m-5 font-medium text-2xl">
				check your email: {email} for booking details
			</p>
			<div className="flex justify-center items-center">
				<Link
					href="/"
					className="p-3 max-w-[30.5rem] bg-black w-full text-center mt-5 text-white rounded-lg"
				>
					Go Back Home
				</Link>
			</div>
		</div>
	);
}

export default Page;
