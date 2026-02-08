"use client";
import { useDialog } from "@/app/helpers/DialogContext";

const drinks = [
	{ name: "Whiskey Sour", eggs: 1 },
	{ name: "Gimlet", eggs: 0 },
	{ name: "Old Fashion", eggs: 0 },
	{ name: "Pisco Sour", eggs: 2 },
	{ name: "Negroni", eggs: 0 },
	{ name: "Espresso Martini", eggs: 0 },
	{ name: "Eggnog", eggs: 3 },
	{ name: "Ramos Gin Fizz", eggs: 1 },
];

export default function DrinkOrder() {
	const openDialog = useDialog();
	return (
		<div className="flex flex-col items-center gap-6 overflow-y-auto max-h-96 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
			<h2
				className="text-3xl font-bold text-green-700 mb-6 text-center"
				title="Drink Order 🍸"
			>
				Submit Your Ticket!
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-md ">
				{drinks.map((drink) => (
					<button
						key={drink.name}
						className={`flex items-center justify-between px-4 py-3 rounded-lg border cursor-pointer ${
							drink.eggs
								? "bg-yellow-100 border-yellow-400"
								: "bg-white border-gray-300"
						} hover:bg-gray-50 transition-colors`}
						onClick={() => {
							openDialog(
								"Ticket Received!",
								`You have successfully submitted your ticket for a ${drink.name}.${
									drink.eggs > 0
										? ` Please remember to bring ${drink.eggs} egg${
												drink.eggs > 1 ? "s" : ""
										  } with you.`
										: " This drink contains no eggs."
								}`
							);
						}}
					>
						<span className="text-black">{drink.name}</span>
						{drink.eggs > 0 && (
							<span
								className="text-sm text-yellow-600 whitespace-nowrap "
								title={drink.eggs + (drink.eggs > 1 ? " eggs" : " egg")}
							>
								{Array.from({ length: drink.eggs }).map(() => "🥚")}
							</span>
						)}
						{drink.eggs === 0 && (
							<div
								className="text-sm w-5 h-5"
								title="This drink contains no eggs"
							/>
						)}
					</button>
				))}
			</div>
		</div>
	);
}
