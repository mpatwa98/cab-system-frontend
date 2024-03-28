import { useForm } from "react-hook-form";
import Image from "next/image";

function EmailInputField() {
	const {
		register,
		formState: { errors },
		watch,
	} = useForm();

	const email = watch("email");

	return (
		<div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
			<Image src="/user.png" width={15} height={15} alt="" />
			<input
				type="email"
				placeholder="Email"
				{...register("email", {
					required: "Email is required",
					pattern: {
						value:
							/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
						message: "Please enter a valid email",
					},
				})}
				className="bg-transparent w-full outline-none"
				autoComplete="email"
				required
			/>
			{errors.email?.message && (
				<span className="text-green-500">
					{formState.errors.email?.message}
				</span>
			)}
		</div>
	);
}

export default EmailInputField;
