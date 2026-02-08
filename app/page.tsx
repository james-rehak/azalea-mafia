"use client";
import { useState } from "react";
import { GiSpotedFlower } from "react-icons/gi";
import HhTimer from "./HhTimer";
import DrinkOrder from "./DrinkOrder";
import Loader from "./helpers/Loader"

const sections = [
	{
		key: "welcome",
		name: "Welcome",
		content: (
			<div className="w-full h-full flex flex-col justify-center items-center">
				<h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
					Welcome to the Azalea Mafia
				</h2>
				<p className="max-w-xl text-lg leading-8 text-zinc-700 text-center">
					From the streets of Tuscany Canterbury, Baltimore rises The Azalea
					Mafia. Small in number, unshakable in loyalty. Built on trust, history,
					and a bond that doesn’t need explaining. If you know, you know.
				</p>
			</div>
		),
	},
	{
		key: "timer",
		name: "Happy Hour",
		content: <HhTimer />,
	},
	{
		key: "drinks",
		name: "Drink Order",
		content: <DrinkOrder />,
	},
];

export default function Home() {
	const [order, setOrder] = useState(["welcome", "timer", "drinks"]);
	const [loading, setLoading] = useState(false);
	const [loaderKey, setLoaderKey] = useState(0);

	const handleSectionClick = (key: string) => {
		setLoaderKey((prev) => prev + 1);
		setLoading(true);

		setTimeout(() => {
			setLoading(false);
		}, 1500);

		if (order[0] === key) return;
		// Move clicked section to top, rotate others
		const newOrder = [key, ...order.filter((k) => k !== key)];
		setOrder(newOrder);
	};

	// Animation classes
	const animClass = "transition-all duration-700 ease-in-out";

	// Map section keys to their content
	const sectionMap = Object.fromEntries(sections.map((s) => [s.key, s]));

	return (
		<div className="flex min-h-screen flex-col bg-[#f3e7c9] font-sans">
			<div className="w-full px-4 md:px-12">
				<header className="w-full bg-green-800 py-4 px-8 flex items-center justify-between border-green-950 rounded-2xl shadow-neo-green ">
					<div className="flex items-center gap-3">
						<GiSpotedFlower className="h-8 w-8 text-pink-500" />
						<h1 className="text-2xl font-bold text-pink-500">Azalea Mafia</h1>
					</div>
					<div className="flex gap-6 text-pink-500 font-semibold">
						{sections.map((s) => (
							<span
								className="hover:text-pink-800 hover:cursor-pointer hover:italic transition-colors duration-300"
								key={s.key}
								onClick={() => handleSectionClick(s.key)}
							>
								{s.name}
							</span>
						))}
					</div>
				</header>
			</div>
			<main className="flex-1 flex items-center justify-center relative " style={{ minHeight: 600 }}>
				{/* Triangle layout for >915px */}
				<div className="relative mx-auto pyramid-layout w-250 h-175">
					{/* Top section */}
					<div className={`absolute left-1/2 top-0 -translate-x-1/2 ${animClass}`} style={{ width: 450, height: 315, zIndex: 2 }}>
						<div className="w-full h-full bg-amber-50 border border-green-950 rounded-2xl shadow-neo-green flex flex-col justify-center items-center p-8 overflow-auto ">
							{sectionMap[order[0]].content}
						</div>
					</div>
					{/* Bottom left */}
					<div className={`absolute left-0 bottom-0 ${animClass}`} style={{ width: 450, height: 315, zIndex: 1 }}>
						<div className="w-full h-full bg-amber-50 border border-green-950 rounded-2xl shadow-neo-green flex flex-col justify-center items-center p-6 overflow-auto ">
							{sectionMap[order[1]].content}
						</div>
					</div>
					{/* Bottom right */}
					<div className={`absolute right-0 bottom-0 ${animClass}`} style={{ width: 450, height: 315, zIndex: 1 }}>
						<div className="w-full h-full bg-amber-50 border border-green-950 rounded-2xl shadow-neo-green flex flex-col justify-center items-center p-6 overflow-auto ">
							{sectionMap[order[2]].content}
						</div>
					</div>
				</div>
				{/* Vertical layout for ≤915px */}
				<div className="vertical-layout flex-col gap-6 w-full max-w-md mx-auto pt-8" style={{ display: 'none' }}>
					{order.map((key) => (
						<div key={key} className="bg-amber-50 border border-green-950 rounded-2xl shadow-neo-green flex flex-col justify-center items-center p-6">
							{sectionMap[key].content}
						</div>
					))}
					<br />
				</div>

			</main>

			{ loading &&
				<Loader loaderKey={loaderKey} />
			}

			<style jsx>{`
  @media (max-width: 915px) {
    .pyramid-layout { display: none !important; }
    .vertical-layout { display: flex !important; }
  }
  @media (min-width: 916px) {
    .pyramid-layout { display: block !important; }
    .vertical-layout { display: none !important; }
  }
`}</style>
		</div>
	);
}
