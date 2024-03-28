import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
	const headerMenu = [
		{
			id: 1,
			name: "Ride",
			icon: "/taxi.png",
			path: "/",
		},
		{
			id: 2,
			name: "Cab Management",
			icon: "/cab_management.png",
			path: "/cabs",
		},
		{
			id: 3,
			name: "All Bookings",
			icon: "/bookings.png",
			path: "/bookings",
		},
	];
	return (
		<div className="p-5 pb-3 pl-10 border-b-[4px] border-gray-200 flex items-center justify-between">
			<div className="flex gap-24 items-center">
				<Link href="/">
					<Image src="/logo.png" width={50} height={50} alt="" />
				</Link>
				<div className="flex gap-6 items-center">
					{headerMenu.map((item, key) => (
						<Link
							href={item.path}
							key={key}
							className="flex gap-2 items-center"
						>
							<Image src={item.icon} width={17} height={17} alt="" />
							<h2 className="text-[14px] font-medium">{item.name}</h2>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
