"use client";
import FreeSpace from "@/components/Home/FreeSpace";
import RoadMap from "@/components/Home/RoadMap";
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
				<div className="max-w-lg mx-auto px-3 mt-5">
					<RoadMap />
					<SearchSection />
					<FreeSpace />
				</div>
			</DestinationContext.Provider>
		</SourceContext.Provider>
	);
}
