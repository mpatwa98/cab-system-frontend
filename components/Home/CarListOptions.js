"use client";
import React, { useContext, useState } from "react";
import CarListItem from "./CarListItem";
import { useCabContext } from "@/context/cabContext";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

function CarListOptions({ distance }) {
	const [activeIndex, setActiveIndex] = useState(-1);
	const [selectedCar, setSelectedCar] = useState();
	const [amount, setAmount] = useState(0);
	const [loading, setLoading] = useState(false);
	const { cabs, revalidate, setRevalidate } = useCabContext();
	const { source } = useContext(SourceContext);
	const { destination } = useContext(DestinationContext);
	const { email } = useUserContext();

	const router = useRouter();

	const handleBooking = async () => {
		setLoading(true);
		try {
			const cabType = selectedCar;
			const exitTime = new Date(Date.now() + distance * 60000);
			const totalCost = amount;
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASEURL}/bookings/add-booking`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email,
						cabType,
						source,
						destination,
						exitTime,
						totalCost,
						distance,
					}),
				}
			);
			if (!response.ok) {
				throw new Error("Failed to add a booking");
			}
			const booking = await response.json();
			console.log(booking);

			const sendMail = async (booking) => {
				try {
					const response = await fetch(
						`${process.env.NEXT_PUBLIC_BASEURL}/send-email`,
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({ ...booking, distance }),
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
			await sendMail(booking);
			setLoading(false);
			setRevalidate(!revalidate);
			router.push("/booking-status");
		} catch (error) {
			console.error("Error adding booking:", error.message);
			setLoading(false);
		}
	};

	return (
		<div className="mt-5 overflow-auto">
			{cabs.map((item, index) => {
				const exitTimeInMs = new Date(item.exitTime).getTime();
				const bookingTimeInMs = new Date(item.bookingTime).getTime();
				const currentTime = Date.now();
				const isCabAvailable =
					exitTimeInMs < currentTime ||
					bookingTimeInMs > currentTime + distance * 60000;

				return (
					isCabAvailable && (
						<div
							key={index}
							onClick={() => {
								setActiveIndex(index);
								setSelectedCar(item.cabType);
								setAmount(item.pricePerMinute * distance);
							}}
							className={`cursor-pointer p-4 rounded-md border-black ${
								activeIndex == index ? "border-[3px]" : ""
							}`}
						>
							<CarListItem car={item} distance={distance} />
						</div>
					)
				);
			})}
			{selectedCar ? (
				<div className="flex max-w-[30.5rem] w-full justify-between items-center gap-2 fixed bottom-5 bg-white p-3 shadow-xl border-[1px]">
					<h2 className="">Expected Time: {distance} min</h2>
					<button
						onClick={handleBooking}
						className="p-3 bg-black text-white rounded-lg text-center"
					>
						{loading ? "Loading..." : `Request ${selectedCar}`}
					</button>
				</div>
			) : null}
		</div>
	);
}

export default CarListOptions;
