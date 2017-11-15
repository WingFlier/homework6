//recursion version
var switching = false; // for making opposite function -spaces,+ stars


const stars = function (n, type) 
{
	if (n === 0) 
		return "";
	return type + stars(n - 1, type); 
};

const spaces = function(n) 
{
	if (n === 0) 
		return "";
	return " " + spaces(n - 1); 
};

var diamond = function(mLength, type)
{
  if(mLength % 2 === 0)
    mLength = mLength+1;
  
const starsAndSpaces = function(number, star, type, space)
{
	if(number === 0)
		return "";
	console.log(spaces(space) + stars(star,type));
	if (space !== 0 && !switching) {
		starsAndSpaces(number - 1,star + 2, type, space - 1);
	}
	else if (space === 0 || switching ) 
	{
		switching = true;
		starsAndSpaces(number - 1, star - 2, type, space + 1);
	}
};

	starsAndSpaces(mLength, 1, type,(mLength - 1) / 2);
};
diamond(4,"@");

//loop version

var diamond = function(length, sgn) 
{

    if (length % 2 === 0) 
        length = length - 1;
    const sign = function(n, type) 
	{
        let x = '';
        for (let i = 0; i < n; i++) 
		{
            x = x + type;
        }
        return x;
    }
    let spaces = (length - 1) / 2;
    let stars = 1;
    for (let i = 1; i <= length; i++) 
	{
        console.log(sign(spaces, " ") + sign(stars, sgn));
        if (i <= length / 2) {
            spaces = spaces - 1;
            stars = stars + 2
        } else {
            spaces = spaces + 1;
            stars = stars - 2
        }
    }
}
diamond(9, "*");
const winnerObject = 
{
  winner: "none",
};

const board = [
    [' ', ' ', ' '], //0 0, 0 1, 0 2	
    [' ', ' ', ' '], //1 0, 1 1, 1 2
    [' ', ' ', ' ']  //2 0, 2 1, 2 2
];

// #4
const makeMove = function(board, location, isX) 
{
	var x = location[0];
	var y = location[1];
	var print = 'o';
	if(isX)
		print = 'x';
	if(board[x][y] === ' ') 
		board[x][y] = print;
	else return -1;
	return board;
};

const rand = function() 
{
	return Math.floor(Math.random() * 3);
};	

// #3
const nextMove = function(board, isX) 
{
	var print = 'o';
	if(isX)
		print = 'x';
	return placeInArray(board, print);
};

	/*
	 * puts a value in random position of an array
	 * @deprecated :)
	 */
const placeInArray = function(arr, value)
{
	var	x = rand();
	var y = rand();
	
	if(arr[x][y] === ' ') 
//		arr[x][y] = value;
		return [x,y];
	else
	{ 
		if(!noSpaceLeft(board))
			return placeInArray(arr, value);
		return [0,0];
	}
};

// #5
const findWinner = function(board) 
{
	const winningLocations = 
	[
		[board[0][0], board[0][1], board[0][2]],
		[board[1][0], board[1][1], board[1][2]],
		[board[2][0], board[2][1], board[2][2]],
		
		[board[0][0], board[1][0], board[2][0]],
		[board[0][1], board[1][1], board[2][1]],
		[board[0][2], board[1][2], board[2][2]],
		
		[board[0][0], board[1][1], board[2][2]],
		[board[0][2], board[1][1], board[2][0]]
	];
	
	const winningLocationsPosition = 
	[
		[[0, 0], [0, 1], [0, 2]],
		[[1, 0], [1, 1], [1, 2]],
		[[2, 0], [2, 1], [2, 2]],
		
		[[0, 0], [1, 0], [2, 0]],
		[[0, 1], [1, 1], [2, 1]],
		[[0, 2], [1, 2], [2, 2]],
		
		[[0, 0], [1, 1], [2, 2]],
		[[0, 2], [1, 1], [2, 0]]
	];
	
	for (var i = 0; i < winningLocations.length; i++)
	{
		var winningCombination = winningLocations[i];
		//console.log(winningCombination);
		if (winningCombination[0] === winningCombination[1] && winningCombination[1] === winningCombination[2]
			&& (winningCombination[0] === 'x'|| winningCombination[0] === 'o'))
		{
		  winnerObject.winner = winningCombination[0];
		  winnerObject.winningLocations = winningLocationsPosition[i];
			return winnerObject;	
		}
	}
	return undefined;
};

	/*
	 * to check if there is still free spaces on the board
	 */
const noSpaceLeft = function(board)
{
	for(var i = 0; i < board.length; i++)
	{
		for(var j = 0; j < board[i].length; j++)
		{
			if(board[i][j] === ' ') return false 
		}
	}
	return true;
};

// #6
	/*
	 * game() function for simulating the game
	 */
const game = function()
{
	var x = true;
	while(winnerObject.winner === 'none')
	{
		var nextMoveLoc = nextMove(board, x);
		if((nextMoveLoc[0] === 0 && nextMoveLoc[1] === 0) && noSpaceLeft(board))
		{
			winnerObject.winner = 'tie';
			return winnerObject;
		}
		var move = makeMove(board, nextMoveLoc, x);
		if(move === -1)
		{
			alert('invalid move');
			return;
		}
		console.log(move);
		console.log(findWinner(board));
		x = (x) ? false : true;
	}
};

const drawLine = function(startX, startY, moveToX, moveToY)
{
	context.moveTo(startX, startY);
	context.lineTo(moveToX, moveToY);
};

const drawField = function()
{
	// draw horizontal lines
	drawLine(200,0,200,600);
	drawLine(400,0,400,600);
	// draw vertical lines
	drawLine(0,200,600,200);
	drawLine(0,400,600,400);
};

var canvas =  document.getElementById('canvas');
var context =  canvas.getContext('2d');
drawField();
context.strokeStyle = "grey";
context.stroke();


var img = document.getElementById("x");
var imgO = document.getElementById("o");
var locAndCoordinates = 
	[
		[[0,0], [50,50]],
		[[0,1], [250,50]],
		[[0,2], [450,50]],
		[[1,0], [50,250]],
		[[1,1], [250,250]],
		[[1,2], [450,250]],
		[[2,0], [50,450]],
		[[2,1], [250,450]],
		[[2,2], [450,450]],
	];
canvas.addEventListener('click', function(evt) {
 determineBoards(evt.offsetX, evt.offsetY);
 console.log(evt.offsetX + ' ' + evt.offsetY);
//  context.drawImage(img, evt.offsetX,evt.offsetY, 100, 100);
}, false);

const determineBoards = function(xLocation,yLocation)
{
	var loc = [];
	const  checkIfSmallerCoordinates = function(x, y)
	{
		return (xLocation < x) && (yLocation < y);
	};
	
	if(checkIfSmallerCoordinates(200, 200))
	{
		loc = [0,0];
		if(board[loc[0]][loc[1]] === ' ')
			context.drawImage(img, 50,50, 100, 100)
	} else if(checkIfSmallerCoordinates(400, 200))
	{
		loc = [0,1];
		if(board[loc[0]][loc[1]] === ' ')
			context.drawImage(img, 250,50, 100, 100);
	}else if(checkIfSmallerCoordinates(600, 200))
	{
		loc = [0,2];
		if(board[loc[0]][loc[1]] === ' ')
			context.drawImage(img, 450,50, 100, 100);
	}else if(checkIfSmallerCoordinates(200, 400))
	{
		loc = [1,0];
		if(board[loc[0]][loc[1]] === ' ')
			context.drawImage(img, 50,250, 100, 100);
	}else if(checkIfSmallerCoordinates(400, 400))
	{
		loc = [1,1];
		if(board[loc[0]][loc[1]] === ' ')
			context.drawImage(img, 250,250, 100, 100)	
	}else if(checkIfSmallerCoordinates(600, 400))
	{
		loc = [1,2];
			if(board[loc[0]][loc[1]] === ' ')
		context.drawImage(img, 450,250, 100, 100)
	}else if(checkIfSmallerCoordinates(200, 600))
	{
		loc = [2,0];
			if(board[loc[0]][loc[1]] === ' ')
		context.drawImage(img, 50,450, 100, 100)
	}else if(checkIfSmallerCoordinates(400, 600))
	{
		loc = [2,1];
			if(board[loc[0]][loc[1]] === ' ')
		context.drawImage(img, 250,450, 100, 100);
	}else if(checkIfSmallerCoordinates(600, 600))
	{
		loc = [2,2];
		if(board[loc[0]][loc[1]] === ' ')
			context.drawImage(img, 450,450, 100, 100);
	}
	if(board[loc[0]][loc[1]] === ' ')
		board[loc[0]][loc[1]] = 'x';
	else return;
	var pcMove =  nextMove(board, false);
	
	//console.log('move ' + pcMove.toString());
	for (var i = 0; i < locAndCoordinates.length; i++ )
	{
		//console.log((locAndCoordinates[i][0]).toString() + ' ' + pcMove.toString());
		//debugger;
		if(pcMove.toString() ===(locAndCoordinates[i][0]).toString())
		{
			console.log('put image');	
			context.drawImage(imgO, locAndCoordinates[i][1][0],locAndCoordinates[i][1][1], 100, 100);
			break;
		} 
	}
	
	 makeMove(board,pcMove, false);
	 findWinner(board);
	 console.log(board);
	 if(winnerObject.winner !== 'none')
	 {
		 alert('Winner is: ' + winnerObject.winner);
		 location.reload();
		 return;
	 } else 
	 {
		 if(noSpaceLeft(board))
		 {
			 alert('tie');
			 location.reload();
		 }	 
	 }
};