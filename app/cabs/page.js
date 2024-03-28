"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { useCabContext } from "@/context/cabContext";

function Page() {
	const { cabs, loading, errorCaught, setCabs, setLoading, setErrorCaught } =
		useCabContext();
	const [edit, setEdit] = useState(null);
	const [selectedCarId, setSelectedCarId] = useState(null);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const handleEdit = (key) => {
		setEdit(key);
		setSelectedCarId(key);
	};

	const onSubmit = async (inputData) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASEURL}/cabs/update-cab`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ selectedCarId, ...inputData }),
				}
			);
			if (!response.ok) {
				throw new Error("Failed to edit cab details");
			}
			const updatedCab = await response.json();
			setCabs((cabs) =>
				cabs.map((item) =>
					item._id === updatedCab["cab"]._id ? updatedCab["cab"] : item
				)
			);
			setEdit(null);
		} catch (error) {
			setErrorCaught(true);
			console.error("Error updating cabs:", error.message);
			setLoading(false);
		}
	};
	const handleCancel = () => {
		setEdit(null);
	};
	return (
		<div>
			<div className="relative mt-5 mx-10 overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left text-gray-500">
					<thead className="text-xs text-gray-700 text-center uppercase bg-gray-50">
						<tr>
							<th scope="col" className="px-6 py-3">
								Cab Type
							</th>
							<th scope="col" className="px-6 py-3">
								Cab Type Name
							</th>
							<th scope="col" className="px-6 py-3">
								Price Per Minute
							</th>
							<th scope="col" className="px-6 py-3">
								Booking Time
							</th>
							<th scope="col" className="px-6 py-3">
								Exit Time
							</th>
							<th scope="col" className="px-6 py-3">
								Action
							</th>
							<th scope="col" className="px-6 py-3">
								<span className="sr-only">Edit</span>
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
							cabs.map((cab, key) => (
								<tr
									key={key}
									className="w-full bg-white text-center border-b hover:bg-gray-50"
								>
									<td className="px-6 py-4 flex justify-center items-center font-medium text-gray-900 whitespace-nowrap">
										<Image src={cab?.image} width={100} height={100} alt="" />
									</td>
									<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
										{cab?.cabType}
									</td>
									<td className="px-6 py-4">{cab?.pricePerMinute}</td>
									<td className="px-6 py-4">{cab?.bookingTime}</td>
									<td className="px-6 py-4">{cab?.exitTime}</td>
									<td className="px-6 py-4">
										{edit != cab._id ? (
											<button
												onClick={() => handleEdit(cab._id)}
												className="font-medium text-blue-600 hover:underline"
											>
												Edit
											</button>
										) : (
											<div className="font-medium text-blue-600 hover:underline">
												<form
													className="flex justify-center items-center"
													onSubmit={handleSubmit(onSubmit)}
												>
													<Controller
														name="pricePerMinute"
														control={control}
														rules={{ required: true, pattern: /^[0-9]*$/ }}
														render={({ field }) => (
															<input
																{...field}
																type="text"
																className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
															/>
														)}
													/>
													{errors.pricePerMinute &&
														errors.pricePerMinute.type === "required" && (
															<span>This field is required</span>
														)}
													{errors.pricePerMinute &&
														errors.pricePerMinute.type === "pattern" && (
															<span>Only numbers are allowed</span>
														)}
													<button
														className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 focus:outline-none"
														type="submit"
													>
														Submit
													</button>
													<button
														onClick={handleCancel}
														className="ml-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
														type="reset"
													>
														Cancel
													</button>
												</form>
											</div>
										)}
									</td>
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
