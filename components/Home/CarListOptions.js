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
	const { cabs } = useCabContext();
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
			setLoading(false);
			router.push("/booking-status");
		} catch (error) {
			console.error("Error adding booking:", error.message);
			setLoading(false);
		}
	};

	return (
		<div className="mt-5 p-3 overflow-auto h-[250px] lg:h-[400px] md:h-[350px]">
			{cabs.map((item, index) => {
				const exitTimeInMs = new Date(item.exitTime).getTime();
				const bookingTimeInMs = new Date(item.bookingTime).getTime();
				const currentTime = Date.now();
				const isCabAvailable =
					exitTimeInMs < currentTime ||
					currentTime + distance * 60000 > bookingTimeInMs;
				console.log(isCabAvailable, bookingTimeInMs, exitTimeInMs, currentTime);

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
				<div className="max-w-lg flex justify-between fixed bottom-5 bg-white p-3 shadow-xl w-full border-[1px] items-center">
					<h2>Expected Time: {distance} min</h2>
					<button
						onClick={handleBooking}
						className="p-3 bg-black text-white rounded-lg text-center"
					>
						Request {selectedCar}
					</button>
				</div>
			) : null}
		</div>
	);
}

export default CarListOptions;
