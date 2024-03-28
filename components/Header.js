"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();
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

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<>
			{/* Mobile and Tablet */}
			<nav className="block fixed border-b-[4px] border-gray-200 top-0 z-50 w-full md:hidden bg-transparent">
				<div className="container mx-auto px-8">
					<div className="grid grid-cols-2 h-20 items-center">
						{/* Left Side */}
						<div>
							<Link href="/" className="text-2xl font-bold text-apple-white">
								<Image
									className="w-auto h-auto"
									src="/logo.png"
									width={64}
									height={22}
									alt="logo"
								/>
							</Link>
						</div>
						{/* Right Side */}
						<div className="flex justify-end z-50">
							<div className="relative">
								<button onClick={toggleMenu}>
									<Image
										className={`w-8 h-8 text-white`}
										width={32}
										height={32}
										src="/hamburger_menu.svg"
										alt="Open Menu Button"
									/>
								</button>
								<nav
									className={`fixed bg-white h-screen top-0 right-0 w-full shadow-md flex items-center px-8 duration-300 ${
										isMenuOpen ? "translate-x-0" : "translate-x-full"
									}`}
								>
									<button
										className="absolute top-6 right-6"
										onClick={toggleMenu}
									>
										<Image
											className="w-8 h-8 text-slate-800"
											width={20}
											height={20}
											src="/close_menu.svg"
											alt="Close Menu Button"
										/>
									</button>
									<ul>
										{headerMenu.map((item, i) => {
											return (
												<li key={i} className="my-5">
													<Link
														href={item.path}
														className="text-xl text-slate-800"
														onClick={toggleMenu}
													>
														{item.name}
													</Link>
													<hr className="h-px my-4 bg-gray-400 border-0" />
												</li>
											);
										})}
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</nav>

			{/* Desktop */}
			<header className="hidden fixed top-0 w-full md:block bg-transparent">
				<div className="container h-20 mx-auto px-8">
					<div className="flex h-20 items-center">
						<div className="">
							{/* Left Side */}
							<Link href="/">
								<Image src="/logo.png" width={50} height={50} alt="" />
							</Link>
						</div>
						{/* Right Side */}
						<div className="ml-auto">
							<ul className="flex justify-end">
								{headerMenu.map((link, i) => {
									return (
										<li key={i}>
											<Link
												href={link.path}
												className={`mx-4 flex gap-2 items-center justify-center hover:underline ${
													pathname === link.path ? "underline" : ""
												} underline-offset-8 decoration-black decoration-2`}
											>
												<Image src={link.icon} width={20} height={20} alt="" />
												<span>{link.name}</span>
											</Link>
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				</div>
			</header>
		</>
	);
}
