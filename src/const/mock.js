export const users = [
	{
		id: "d",
		name: "nome",
		surname: "cognome",
		age: 52,
		purchases: [1, 2],
	},
	{
		id: "b",
		name: "nome",
		surname: "cognome",
		age: 21,
		purchases: [1, 2, 3, 4],
	},
	{
		id: "c",
		name: "nome",
		surname: "cognome",
		age: 18,
		purchases: [1, 2,],
	},
	{
		id: "a",
		name: "nome",
		surname: "cognome",
		age: 52,
		purchases: [1, 2, 3, 4, 5],
	},
]

function returnThis(){return this}

export const products = [
	{
		price: 23.99,
		quantity: 12,
		buy: returnThis,
	},
	{
		price: 12.99,
		quantity: 12,
		buy: returnThis,
	},
	{
		price: 49.50,
		quantity: 12,
		buy: returnThis,
	},
	{
		price: 8.60,
		quantity: 12,
		buy: returnThis,
	},
]