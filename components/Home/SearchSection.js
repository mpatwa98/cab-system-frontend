"use client";
import React, { useContext, useEffect, useState } from "react";
import InputItem from "./InputItem";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import CarListOptions from "./CarListOptions";

function SearchSection() {
	const { source } = useContext(SourceContext);
	const { destination } = useContext(DestinationContext);
	const [distance, setDistance] = useState(null);

	const graph = {
		A: { B: 5, C: 7 },
		B: { A: 5, D: 15, E: 20 },
		C: { A: 7, D: 5, E: 35 },
		D: { B: 15, C: 5, F: 20 },
		E: { B: 20, E: 35, F: 10 },
		F: { D: 20, E: 10 },
	};

	class PriorityQueue {
		constructor() {
			this.values = [];
		}

		enqueue(node, priority) {
			this.values.push({ node, priority });
			this.sort();
		}

		dequeue() {
			return this.values.shift();
		}

		sort() {
			this.values.sort((a, b) => a.priority - b.priority);
		}

		isEmpty() {
			return this.values.length === 0;
		}
	}

	const handleDistance = (graph, source, destination) => {
		console.log(source, destination);
		const distances = {};
		const visited = new Set();
		const pq = new PriorityQueue();

		for (let node in graph) {
			distances[node] = Infinity;
		}
		distances[source] = 0;

		pq.enqueue(source, 0);

		while (!pq.isEmpty()) {
			const { node: closestNode, priority: distance } = pq.dequeue();
			visited.add(closestNode);

			for (let neighbor in graph[closestNode]) {
				if (!visited.has(neighbor)) {
					const newDistance = distance + graph[closestNode][neighbor];

					if (newDistance < distances[neighbor]) {
						distances[neighbor] = newDistance;
						pq.enqueue(neighbor, newDistance);
					}
				}
			}
		}
		setDistance(distances[destination]);
	};

	return (
		<div>
			<div className="p-2 md:pd-5 border-[2px] rounded-xl">
				<p className="text-[20px] font-bold">Get a Ride</p>
				<InputItem type="email" />
				<InputItem type="source" />
				<InputItem type="destination" />
				<button
					onClick={() => handleDistance(graph, source, destination)}
					className="p-3 bg-black w-full mt-5 text-white rounded-lg"
				>
					Search
				</button>
			</div>
			{distance == null ? (
				<div></div>
			) : distance > 0 ? (
				<div className="w-full">
					<h2 className="text-[22px] font-bold">Choose a Ride</h2>
					<CarListOptions distance={distance} />
				</div>
			) : (
				<div>Error</div>
			)}
		</div>
	);
}

export default SearchSection;