import { useContext, useEffect, useState } from "react";
import { DestinationContext } from "@/context/DestinationContext";
import { SourceContext } from "@/context/SourceContext";
import { useUserContext } from "@/context/UserContext";
import Image from "next/image";

function InputItem({ type }) {
	const [value, setValue] = useState("");
	const [placeholder, setPlaceholder] = useState("");

	const { source, setSource } = useContext(SourceContext);
	const { destination, setDestination } = useContext(DestinationContext);
	const { email, setEmail } = useUserContext();

	useEffect(() => {
		setPlaceholder(
			type === "source"
				? "Pickup Location"
				: type === "email"
				? "Email"
				: "Dropoff Location"
		);
	}, [type]);

	const handleChange = (e) => {
		const newValue = e.target.value;
		setValue(newValue);

		if (type === "source") {
			setSource(newValue);
		} else if (type === "email") {
			setEmail(newValue);
		} else {
			setDestination(newValue);
		}
	};

	return (
		<div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
			<Image
				src={
					type === "source"
						? "/source.png"
						: type === "email"
						? "/user.png"
						: "/destination.png"
				}
				width={15}
				height={15}
				alt=""
			/>
			<input
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				className="bg-transparent w-full outline-none"
			/>
		</div>
	);
}

export default InputItem;
