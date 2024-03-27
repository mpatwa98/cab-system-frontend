"use client";
import SearchSection from "@/components/Home/SearchSection";
import { DestinationContext } from "@/context/DestinationContext";
import { SourceContext } from "@/context/SourceContext";
import { UserContext } from "@/context/UserContext";
import { useState } from "react";

export default function Home() {
	const [source, setSource] = useState();
	const [destination, setDestination] = useState();
	const [email, setEmail] = useState();

	return (
		<UserContext.Provider value={{ email, setEmail }}>
			<SourceContext.Provider value={{ source, setSource }}>
				<DestinationContext.Provider value={{ destination, setDestination }}>
					<div className="max-w-lg mx-auto mt-5">
						<SearchSection />
					</div>
				</DestinationContext.Provider>
			</SourceContext.Provider>
		</UserContext.Provider>
	);
}
