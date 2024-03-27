import Image from "next/image";
import React from "react";
import { HiUser } from "react-icons/hi";

function CarListItem({ car, distance }) {
	return (
		<div>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-5">
					<Image src={car.image} width={100} height={100} alt="car" />
					<div>
						<h2 className="font-semibold text-[18px] flex gap-3 items-center">
							{car.cabType}
							<span className="flex gap-1 font-normal text-[14px] items-center">
								<HiUser />
								{car.seats}
							</span>
						</h2>
						<p>{car.description}</p>
					</div>
				</div>
				<h2 className="text-[18px] font-semibold">
					${car.pricePerMinute.toFixed(2) * distance}
				</h2>
			</div>
		</div>
	);
}

export default CarListItem;
