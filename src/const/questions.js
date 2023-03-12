import { sameArray } from "../helpers/arrays"
import { products, users } from "./mock"

export const tests = [
	{
		id: "3d159149-38e9-4b62-84e6-07cd7de5a81d",
		title: "Domanda di prova",
		description: "Prova a fare la domanda di prova",
		test: value => (value === "prova")
	},
	{
		id: "c254185f-5878-499e-bd6b-b6e068a5b196",
		title: "Prova eval",
		description: "Creare una classe Poppo con proprietà pippo",
		import: true,
		test: async module =>
		{
			const a = new module.Poppo()
			return a.hasOwnProperty("pippo")
		}
	},
]

export const arrays = [
	{
		id: "4e5bdbbb-5aa5-44f6-8017-b92a1e92a3cd",
		title: "Filter function",
		description: `
Scrivere una funzione chiamata 'filter' che dato un array di utenti nella forma
SNIPPET
ritorni solo quelli con meno di 22 anni che hanno fatto almeno 4 acquisti. Senza usare while, for o forEach`,
		snippets: [
			`
				{
					id: "4e5bdbbb-5aa5-44f6-8017-b92a1e92a3cd",
					name: "nome",
					surname: "cognome",
					age: 52,
					purchases: [/*list*/],
				}
			`,
		],
		import: true,
		test: async module =>
		{
			const rightFilter = users.filter(u => u.age < 22 && u.purchases.length >= 4)
			const guestFilter = module.filter(users)
			const sameUsers = rightFilter.map(u => guestFilter.find(ug => ug.id === u.id) !== undefined)
			return sameUsers && guestFilter.length === rightFilter.length
		}
	},
	{
		id: "d9bc5974-5901-45f0-9d8b-ed689985de8b",
		title: "Sort function",
		description: "Dato lo stesso array della domanda precedente scrivere la funzione 'sort' che lo ordina in modo decrescente per numero di acquisti, in caso di parità prima i più giovani prima",
		import: true,
		test: module =>
		{
			const scoreCalc = (u) => (u.purchases.length * 1000 + (1000 - u.age))
			const myArray = [...users]
			const guestArray = [...users]
			const mySort = myArray.sort((u1, u2) => (scoreCalc(u2) - scoreCalc(u1)))
			const guestSort = module.sort(guestArray)
			return sameArray(mySort, guestSort, (a1, a2) => a1.id === a2.id)
		},
	},
	{
		id: "1ca70719-c4b0-4cef-b318-c1fc60f6db15",
		title: "Map function",
		description: "Dato lo stesso array della prima domanda scrivere la funzione 'map' che ritorna un nuovo array dove per ogni elemento è presente il numero di acquisti medi all'anno. Si suppone che abbiano iniziato a comprare a 18 anni",
		import: true,
		test: module =>
		{
			const myMap = users.map(u => (u.purchases.length / Math.min(1, u.age - 18)))
			const guestMap = module.map(users)
			return sameArray(myMap, guestMap, (a1, a2) => a1 === a2)
		},
	},
	{
		id: "65dd2a83-1ec1-41e2-8a45-ea208e1d1c04",
		title: "Reduce function",
		description: "Usa la funzione di reduce per creare 3 funzioni: 'filter', 'sort', 'map' che replichino quelle native. Il formato deve essere tuafunzione(array, funzione) => array. Non si possono usare le funzione native degli array",
		import: true,
		test: module =>
		{
			const testArray = [5, 3, 7, 8, 1, 2, 9, 0, 4, 6]
			const simpEquality = (n1, n2) => n1 === n2
			const f = n => n%2
			const s = (n1, n2) => (n2 - n1)
			const m = n => n * 2 - 1

			const f1 = testArray.filter(f)
			const f2 = module.filter(testArray, f)
			if(!sameArray(f1, f2, simpEquality)) return false

			const s1 = [...testArray].sort(s)
			const s2 = module.sort([...testArray], s)
			if(!sameArray(s1, s2, simpEquality)) return false

			const m1 = testArray.map(m)
			const m2 = module.map(testArray, m)
			if(!sameArray(m1, m2, simpEquality)) return false

			return true
		},
	},
]

export const typeCoercion = [
	{
		id: "256be9b9-5e22-4f66-8420-174a4ce7acbd",
		title: 'Somma di string e number. Indica le stringhe con ""',
		description: "Scrivi il risultato dell'espressione SNIPPET",
		snippets: [
			'"5" + 5'
		],
		test: (value) =>
		{
			const res = "5" + 5
			return value.replaceAll('"', "") === res && Number.isNaN(parseInt(value))
		}
	},
	{
		id: "f7c5dbbc-ffc2-4cb0-ad20-dbdaf2a7f77d",
		title: 'Somma di string e number. Indica le stringhe con ""',
		description: "Scrivi il risultato dell'espressione SNIPPET",
		snippets: [
			'5 + "5"'
		],
		test: (value) =>
		{
			const res = 5 + "5"
			return value.replaceAll('"', "") === res && Number.isNaN(parseInt(value))
		}
	},
	{
		id: "7969696e-7f02-4cb8-9b4e-bf9adf6f65c7",
		title: 'Divisione di string e number. Indica le stringhe con ""',
		description: "Scrivi il risultato dell'espressione SNIPPET",
		snippets: [
			'"50" / 5'
		],
		test: (value) =>
		{
			const res = "50" / 5
			return parseFloat(value) === res
		}
	},
	{
		id: "d2df6908-7e3a-4fe5-a88c-7e6fbd914c7c",
		title: 'Comparazione stringa e numero',
		description: "Scrivi il risultato dell'espressione SNIPPET",
		snippets: [
			'5 == "5"'
		],
		test: (value) =>
		{
			const res = 5 == "5"
			return res ===  (value === "true")
		}
	},
	{
		id: "e340f32d-b51b-4434-9d97-b87dc9709c39",
		title: 'Comparazione stringa e numero',
		description: "Scrivi il risultato dell'espressione SNIPPET",
		snippets: [
			'5 === "5"'
		],
		test: (value) =>
		{
			const res = 5 === "5"
			return res ===  (value === "true")
		}
	},
	{
		id: "9e80f6c5-d28b-4358-862f-0c62d08f8149",
		title: 'Array e conversione implicita',
		description: "Scrivi il risultato dell'espressione SNIPPET",
		snippets: [
			'!!(![] + 1)'
		],
		test: (value) =>
		{
			// const res = !!(![] + 1)
			return value === "true"
		}
	},
	{
		id: "d0789e52-f738-4e33-a55b-8c5265305f78",
		title: 'Array e conversione implicita',
		description: "Scrivi il risultato dell'espressione SNIPPET",
		snippets: [
			'!!(![] + 2)'
		],
		test: (value) =>
		{
			// const res = !!(![] + 2)
			return value === "true"
		}
	},
	{
		id: "0b55f765-3bce-4874-9820-d6299152e0bd",
		title: 'Numeri e stringhe',
		description: "Scrivi il risultato dell'espressione SNIPPET",
		snippets: [
			'3 + +"3"'
		],
		test: (value) =>
		{
			const res = 3 + +"3"
			return parseFloat(value) === res
		}
	},
	{
		id: "735dd6c0-e5f6-48cb-870f-7b43949504ab",
		title: "Qualche utilizzo 'pratico'",
		description: "Scrivi la stringa 'falafel' usando solo i caratteri ! [ ] ( ) + e le cifre",
		snippets: [
			'3 + +"3"'
		],
		test: (value) =>
		{
			const res = "falafel"
			const escapedInput = value.replaceAll(/[^!\[\]\+\(\)0-9]/g, "")
			return eval(escapedInput) === res
		}
	},
]

export const objectCreation = [
	{
		id: "6d6a7e89-42c6-4542-a40e-17bc6b543c9d",
		title: "Oggetti senza classi",
		description: "In Javascript gli oggetti non hanno bisogno di un tipo associato, possono essere istanziati e basta. Usando la sintassi SNIPPET Crea un oggetto, chiamato 'prodotto', con le proprietà 'price' e 'quantity'",
		snippets: [
			"export var prodotto = "
		],
		import: true,
		test: (module) =>
		{
			const obj = module.prodotto
			return obj.hasOwnProperty("price") && obj.hasOwnProperty("quantity")
		}
	},
	{
		id: "3e07eee5-fdc2-4fd6-8087-43c0cd8dc6a9",
		title: "Prototipi primi passi",
		description: "Crea un oggetto come nella domanda precedente ma esporta anche un oggetto 'abbonamento' che abbia una proprietà in più 'expirationDate' e usi il primo come prototipo per accedere alle altre, non le definisca da solo.",
		import: true,
		test: (module) =>
		{
			const obj = module.abbonamento
			const notOwnProperties = !obj.hasOwnProperty("price") && !obj.hasOwnProperty("quantity")
			return notOwnProperties && obj.hasOwnProperty("expirationDate") && obj.price !== undefined && obj.quantity !== undefined
		}
	},
	{
		id: "c2be73db-1b73-4c39-ae2f-7d8f66001511",
		title: "Protipi e funzioni",
		description: "Crea ed esporta un oggetto base 'prodotto' con un metodo 'buy' che scala la 'quantity' di 1. Crea ed esporta 2 oggetti: 'Quadro' e 'Scala' che hanno come prototipo 'prodotto'",
		import: true,
		test: (module) =>
		{
			const parent = module.prodotto
			const obj1 = module.Quadro
			const obj2 = module.Scala
			const arePrototypesCorrect = parent.isPrototypeOf(obj1) && parent.isPrototypeOf(obj2)
			const q1 = obj1.quantity
			const q2 = obj2.quantity
			obj1.buy()
			obj2.buy()
			const areQuantitiesCorrect = q1 === obj1.quantity + 1 && q2 === obj2.quantity + 1
			return arePrototypesCorrect && areQuantitiesCorrect
		}
	},
	{
		id: "978aea1c-6955-4255-94b8-5349a3758c90",
		title: "Oggetti e event listener",
		description: `Ho una lista di prodotti SNIPPET
Esportare una funzione 'toButtons' che prende in input la lista di prodotti e ritorna una lista di pulsanti la cui proprietà 'onClick' (non l'addEventListener) richiama la funzione buy del prodotto corrispondente.
Nota: Un elemento HTML può essere creato così SNIPPET`,
		snippets: [
			`
				const prodotti = [
					{
						price: 23.99,
						quantity: 12,
						buy: function(){...},
					},
					{
						price: 12.99,
						quantity: 12,
						buy: function(){...},
					},
					{
						price: 49.50,
						quantity: 12,
						buy: function(){...},
					},
					{
						price: 8.60,
						quantity: 12,
						buy: function(){...},
					},
				]
			`,
			'var button = document.createElement("BUTTON")',
		],
		import: true,
		test: (module) =>
		{
			const toButtons = module.toButtons
			const buttons = toButtons(products)
			let valid = true
			buttons.forEach((element, index) =>
			{
				if(products[index] !== element.onClick()) valid = false
			})

			return valid
		}
	},
	{
		id: "4533f9e1-2d5b-476e-b8d2-8559cb15ef4f",
		title: "La funzione Object.setPrototypeOf",
		description: `Questa funzione predefinita prende in input due oggetti e imposta il secondo come prototipo del primo. Esportare una funzione 'setPrototypeOf' che faccia lo stesso (senza usare la funzione predefinita)`,
		import: true,
		test: (module) =>
		{
			const a = {}
			const b = {}
			module.setPrototypeOf(a, b)
			return b.isPrototypeOf(a)
		}
	},
	{
		id: "d4a6868f-55b5-4996-9663-9453d58c5a34",
		title: "La parola chiave new",
		description: `Questa parola chiave crea un nuovo oggetto partendo da una funzione costruttore. Esportare una funzione SNIPPET con un comportamento anologo`,
		snippets: [
			`
			export function nuovoOggetto(costruttore, arrayParametri)
			{
				...
			}
`
		],
		import: true,
		test: (module) =>
		{
			function Prodotto(name)
			{
				this.name = name
			}

			const a = module.nuovoOggetto(Prodotto, ["prova"])
			return Prodotto.prototype.isPrototypeOf(a) && a.name === "prova"
		}
	}
]

export const asyncProgramming = [
	{
		id: "bd9389a4-251d-4b0c-a26e-d990b212299d",
		title: "Callback",
		description: "Storicamente javascript gestiva l'asincronismo attraverso i 'callback'. Ogni volta che una funzione doveva svolgere un task lungo aggiungeva un parametro alla fine che consisteva in una funzione da richiamare una volta finita l'operazione. Per esempio la libreria per leggere i file di nodejs usa ancora questo paradigma SNIPPET scrivi ed esporta una funzione chiamata 'l33t' che riceve in input il contenuto del file e ritorna il contenuto con tutte le 'e' sostituite dal carattere 3. La funzione verrà chiamata da readFile automaticamente. Codice che verrà eseguito: SNIPPET",
		snippets: [
			`
	function readFile(path, options, callback) { }
`,
			`readFile('percorso/del/file', {}, l33t)`
		],
		import: true,
		test: module =>
		{
			const l33t = module.l33t
			const str = "elite"
			const strL33t = l33t(str)
			return strL33t === str.replaceAll("e", "3")
		}
	},
	{
		id: "a5191978-76e3-405c-888e-c2bc1902c8a2",
		title: "Dall'altra parte",
		description: "Questa volta sei tu che devi scrivere una funzione che fa uso di callback. Javascript non ha il concetto di 'wait' o 'pause', javascript non è bloccante, non puoi interrompere l'esecuzione. Javascript ha però due funzioni per gestire questi casi 'setInterval' e 'setTimeout'. Scrivi ed esporta una funzione 'veryLongTask' che prende in input un numero e un callback. La funzione aspetta 2 secondi e poi richiama il callback passandogli il doppio del numero precedentemente preso in input. (il risultato della domanda arriverà dopo 2 secondi)",
		import: true,
		test: async module =>
		{
			return new Promise((resolve, reject) =>
			{
				const time = (new Date()).getTime()
				module.veryLongTask(4, (i) =>
				{
					if((new Date().getTime() > time + 2000) && i === 8)
					{
						resolve(true)
					}
					else
					{
						resolve(false)
					}
				})
			})
		}
	},
	{
		id: "045c730d-48b7-49c4-b551-e3e253142428",
		title: "Il nuovo modo: le Promise",
		description: "Scrivi ed esporta una funzione con questa forma SNIPPET 'promise' è una funzione che ci metterà un po' a eseguire e quindi non ritorna il risultato ma ritorna una promise, gli altri due parametri sono rispettivamente i callback per quando tutto è andato bene e quello per quando c'è stato un errore. La funzione deve chiamare la promise passata come primo parametro e richiamare il primo callback nel caso il task sia riuscito e il secondo nel caso sia fallito",
		snippets: [
			`
			export function usingPromises(promise, callbackOk, callbackError) {}
`
		],
		import: true,
		test: module =>
		{
			return new Promise((resolveMain, mainreject) =>
			{
				const f = module.usingPromises
				let doneOne = false
				let validOk = false
				let validKo = false
				f(new Promise((resolve, reject) => {resolve(true)}), () =>
				{
					validOk = true
					if(doneOne) resolveMain(validOk && validKo)
					else doneOne = true
				}, () => {})
				f(new Promise((resolve, reject) => {reject(true)}), () => {}, () =>
				{
					validKo = true
					if(doneOne) resolveMain(validOk && validKo)
					else doneOne = true
				})
				setTimeout(() => resolveMain(false), 100)
			})
		}
	},
	{
		id: "dff6f5a0-a84e-4659-a25d-68d3b64a6274",
		title: "Promise: polyfill",
		description: "Le Promise non sono state un aggiunta a livello di architettura ma solo di API. È possibile implementare lo stesso funzionamento anche con le API vecchie. Crea ed esporta una funzione/costruttore di nome 'MyPromise' che abbia la stessa interfaccia e funzionalità delle Promise normali senza usare la funzione/costruttore 'Promise'",
		import: true,
		test: module =>
		{
			return new Promise((mainResolve, mainReject) =>
			{
				let resolved = false
				let rejected = false
				let doneFirst = false
				const firstOrResolve = () =>
				{
					if(doneFirst) mainResolve(resolved && rejected)
					else doneFirst = true
				}
	
				const a = new module.MyPromise((resolve, reject) =>
				{
					resolve(3)
				})
				a.then((i) =>
				{
					if(i === 3) resolved = true
					firstOrResolve()
				})
				const b = new module.MyPromise((resolve, reject) =>
				{
					reject(3)
				})
				b.catch((i) =>
				{
					if(i === 3) rejected = true
					firstOrResolve()
				})

				setTimeout(() => {mainResolve(false)}, 100)
			})
		}
	},
	{
		id: "faf4dc54-cf83-4974-ace5-b8ac9c0dfea3",
		title: "Il modo elegante",
		description: "Le Promise sono ancora tutt'ora il modo di gestire l'asincronia in Javascript. Gli ultimi standard del linguaggio hanno però introdotto una nuova sintassi 'async' e 'await' per lavorare con le promise. Qualsiasi funzione dichiarata async verrà in automatico inserita dentro una promise e il codice che viene dopo un await verrà in automatico inserito dentro il 'then', il 'catch' deve essere effettuato con un try/catch. Scrivi ed esporta una funzione/costruttore 'FileTransformer' che prende in input una funzione con questo formato: SNIPPET e ritorna un oggetto con un solo metodo SNIPPET che legge il contenuto di un file usando la funzione passata al costruttore e ritorna una stringa con tutte le lettere in maiuscolo",
		snippets: [
			"async function fileReader(path) {} //ritorna una stringa",
			"asyncfunction transform(path) {}",
		],
		import: true,
		test: async module =>
		{
			const str = "test"
			const r = new module.FileTransformer(() => str)
			return (await r.transform()) === str.toUpperCase()
		}
	}
]