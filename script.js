let GRIDLENGTH = 10;
let GRIDHEIGHT = 10;

let MINEAMOUNT = 20;

let KERNEL =
	[[-1, -1], [0, -1], [1, -1],
	 [-1, 0], [0, 0], [1, 0],
	 [-1, 1], [0, 1], [1, 1]];

let board = Array(GRIDHEIGHT).fill().map(() => Array(GRIDLENGTH).fill(0));

//add mines (stored as -1)
for (let i = 0; i < MINEAMOUNT; i++) {
	let newcoord = [parseInt(Math.floor(Math.random() * GRIDHEIGHT)), parseInt(Math.floor(Math.random() * GRIDLENGTH))];
	if (board[newcoord[0]][newcoord[1]] != -1) {
		board[newcoord[0]][newcoord[1]] = -1;
	}
}

// update grid based on mines
// this code is broken and idk why it just doesnt work sometimes, i added the try except to just stop it from crashing
for (let i = 0; i < board.length; i++) {
	for (let j = 0; j < board[i].length; j++) {
		if (board[i][j] == -1) {
			break;
		}
		let minecount = 0;
		for (let k = 0; k < KERNEL.length; k++) {
			try {
				if (board[i + KERNEL[k][0]][j + KERNEL[k][1]] == -1) {
					minecount++;
				}
			} catch (error) {
				console.log("FRICK", i, j, k)
			}
		}
		board[i][j] = minecount;
		console.log("success")
	}
}

// console.log(board)

let container = document.getElementById("tileContainer");
let tile = document.createElement("h1");

function display() {
	for (let i = 0; i < GRIDHEIGHT; i++) {
		for (let j = 0; j < GRIDLENGTH; j++) {
			let tile = document.createElement("button");
			tile.innerHTML = " ";
			tile.setAttribute("data-x", i);
			tile.setAttribute("data-y", j);
			tile.className = "tile";
			container.appendChild(tile);
		}
		container.appendChild(document.createElement("br"))
	}
}

container.addEventListener("click", (event) => {
	if (event.target.className == "tile") {
		event.target.innerHTML = board[event.target.dataset.x][event.target.dataset.y];
	}
});

display()