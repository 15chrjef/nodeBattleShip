const prompt = require('cli-prompt')

console.log('\n\n', 'Welcome to the game of Battleship')

const generateShipLoactions = (rows, columns) => {
	var arr = [];
	for(var i = 0; i < 5; i++) {
		var randomRow = Math.floor(Math.random() * (rows + 1))
		var randomColumn = Math.floor(Math.random() * (columns + 1))
		arr.push(`${randomRow}${randomColumn}`)
	}
	return arr
}

var realMatrix = [];
var displayMatrix = [];
var shipLocations = generateShipLoactions(4, 4);
for(var i = 0; i < 5; i++) {
	realMatrix.push([])
	displayMatrix.push([])
	for(var j = 0; j < 5; j++) {
		var tile = 1
		if(shipLocations.indexOf(`${i}${j}`) > -1) {
			tile = 2
		}
		realMatrix[i].push(tile)
		displayMatrix[i].push(`${i}${j}`)
	}
}
var guesses = [];
var counter = 0;
function playBattleShip() {
	console.log( displayMatrix)
	prompt('\n select your target ex:00  ', function (guess) {
		var row = guess[0]
		var column = guess[1]
		if(guess.length === 2 && guesses.indexOf(guess) < 0) {
			guesses.push(guess)
			if(realMatrix[row][column] === 1) {
				console.log('miss')
				displayMatrix[row][column] = 'x'	
			} else{
				console.log('hit')
				displayMatrix[row][column] = 'o'
				counter ++;
				if(counter === 3) {
					console.log(displayMatrix)
					console.log('\n you win congratz!')
					return
				}
			}
			playBattleShip()
		} else {
			console.log('try again that location is not available')
			playBattleShip()
		}
	});
}
playBattleShip()
