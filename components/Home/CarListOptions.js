import React, { useContext, useState } from "react";
import CarListItem from "./CarListItem";
import { useCabContext } from "@/context/cabContext";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

function CarListOptions({ distance }) {
	const [activeIndex, setActiveIndex] = useState();
	const [selectedCar, setSelectedCar] = useState();
	const [amount, setAmount] = useState(0);
	const [loading, setLoading] = useState(false);
	const { cabs } = useCabContext();
	const { source } = useContext(SourceContext);
	const { destination } = useContext(DestinationContext);
	const { email } = useContext(UserContext);

	const router = useRouter();

	const handleBooking = async () => {
		setLoading(true);
		try {
			const cabType = selectedCar;
			const exitTime = new Date(Date.now() + distance); // Calculate exit time
			const totalCost = amount;
			const response = await fetch(
				"http://localhost:8000/api/v1/bookings/add-booking",
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
						exitTime, // Include exit time in the request
						totalCost,
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
		<div className="mt-5 p-5 overflow-auto h-[500px]">
			{cabs.map((item, index) => (
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
			))}
			{selectedCar ? (
				<div className="max-w-lg flex justify-between fixed bottom-5 bg-white p-3 shadow-xl w-full border-[1px] items-center">
					<h2>Make Payment For</h2>
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
