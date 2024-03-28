"use client";
import { useUserContext } from "@/context/UserContext";
import React, { useEffect } from "react";

function Page() {
	const { email } = useUserContext();

	useEffect(() => {
		console.log(email);
		const sendMail = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BASEURL}/send-email`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email }),
					}
				);
				if (!response.ok) {
					throw new Error("Failed to send mail");
				}
				const data = await response.json();
				console.log("Email sent successfully:", data);
			} catch (error) {
				console.error("Error sending mail:", error.message);
			}
		};
		sendMail();
	}, [email]);

	return (
		<div>
			<p>Confirm Booking {email}</p>
		</div>
	);
}

export default Page;
