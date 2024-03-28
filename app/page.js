"use client";
import SearchSection from "@/components/Home/SearchSection";
import { DestinationContext } from "@/context/DestinationContext";
import { SourceContext } from "@/context/SourceContext";
import { useState } from "react";

export default function Home() {
	const [source, setSource] = useState();
	const [destination, setDestination] = useState();

	return (
		<SourceContext.Provider value={{ source, setSource }}>
			<DestinationContext.Provider value={{ destination, setDestination }}>
				<div className="max-w-lg mx-auto mt-5">
					<SearchSection />
				</div>
			</DestinationContext.Provider>
		</SourceContext.Provider>
	);
}
