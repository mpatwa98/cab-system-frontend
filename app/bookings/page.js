"use client";
import React, { useEffect, useState } from "react";
import { formatDateTime } from "@/utils/formatDate";

function Page() {
	const [loading, setLoading] = useState(false);
	const [errorCaught, setErrorCaught] = useState(false);
	const [allBookings, setAllBookings] = useState([]);

	useEffect(() => {
		const fetchAllBookings = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BASEURL}/bookings/all-bookings`
				);
				if (!response.ok) {
					throw new Error("Failed to fetch booking details");
				}
				const data = await response.json();
				setAllBookings(data);
				setLoading(false);
			} catch (error) {
				setErrorCaught(true);
				console.error("Error updating cabs:", error.message);
				setLoading(false);
			}
		};
		fetchAllBookings();
	}, []);

	return (
		<div>
			<div className="relative mt-5 mx-10 overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left text-gray-500">
					<thead className="text-xs text-gray-700 text-center uppercase bg-gray-50">
						<tr>
							<th scope="col" className="px-6 py-3">
								User Email
							</th>
							<th scope="col" className="px-6 py-3">
								Cab Type
							</th>
							<th scope="col" className="px-6 py-3">
								Source
							</th>
							<th scope="col" className="px-6 py-3">
								Destination
							</th>
							<th scope="col" className="px-6 py-3">
								Booking Time
							</th>
							<th scope="col" className="px-6 py-3">
								Exit Time
							</th>
							<th scope="col" className="px-6 py-3">
								Total Cost
							</th>
						</tr>
					</thead>
					<tbody>
						{loading ? (
							errorCaught ? (
								<tr>
									<td colSpan="5" className="text-center py-4">
										Error
									</td>
								</tr>
							) : (
								<tr>
									<td colSpan="5" className="text-center py-4">
										Loading...
									</td>
								</tr>
							)
						) : (
							allBookings.map((booking, key) => (
								<tr
									key={key}
									className="w-full bg-white text-center border-b hover:bg-gray-50"
								>
									<td className="px-6 py-4 flex justify-center items-center font-medium text-gray-900 whitespace-nowrap">
										{booking?.email}
									</td>
									<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
										{booking?.cabType}
									</td>
									<td className="px-6 py-4">{booking?.source}</td>
									<td className="px-6 py-4">{booking?.destination}</td>
									<td className="px-6 py-4">
										{formatDateTime(booking?.bookingTime)}
									</td>
									<td className="px-6 py-4">
										{formatDateTime(booking?.exitTime)}
									</td>
									<td className="px-6 py-4">{booking?.totalCost}</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Page;
