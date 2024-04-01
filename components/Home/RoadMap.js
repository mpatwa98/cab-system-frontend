import Image from "next/image";
import React from "react";

function RoadMap() {
	return (
		<div className="flex justify-center items-center mb-5">
			<Image src="/road_map.png" width={500} height={500} alt="" />
		</div>
	);
}

export default RoadMap;
