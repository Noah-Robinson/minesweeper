let GRIDLENGTH = 20;
let GRIDHEIGHT = 20;

let MINEAMOUNT = Math.floor(GRIDLENGTH * GRIDHEIGHT / 4);

let board = Array(GRIDHEIGHT).fill().map(() => Array(GRIDLENGTH).fill(0));

//add mines (stored as -1)
let minecount = MINEAMOUNT;
while (minecount > 0) {
	let newcoord = [parseInt(Math.floor(Math.random() * (GRIDHEIGHT))), parseInt(Math.floor(Math.random() * GRIDLENGTH))];
	if (newcoord[0] > 0 && newcoord[0] < GRIDLENGTH - 1 && newcoord[1] > 0 && newcoord[1] < GRIDHEIGHT - 1) {
		if (board[newcoord[0]][newcoord[1]] != -1) {
			board[newcoord[0]][newcoord[1]] = -1;
			minecount -= 1;

			for (x = -1; x <= 1; x++) {
				for (y = -1; y <=1; y++) {
					if (board[newcoord[0] + x][newcoord[1] + y] != -1) {
						board[newcoord[0] + x][newcoord[1] + y] += 1;
					}
				}
			}
		}
	}
}

// console.log(board)

let container = document.getElementById("tileContainer");
let tile = document.createElement("h1");

let colors = ["grey", "#fcb045", "#fca238", "#fd922c", "#fd8223", "#fe701d", "#fe5c1a", "#fe441a", "#fd1d1d"]

function display() {
	for (let i = 0; i < GRIDHEIGHT; i++) {
		for (let j = 0; j < GRIDLENGTH; j++) {
			let tile = document.createElement("button");
			// tile.innerHTML = board[i][j];
			tile.setAttribute("data-x", i);
			tile.setAttribute("data-y", j);
			tile.setAttribute("data-value", String(board[i][j]));
			tile.className = "tile";
			container.appendChild(tile);
		}
		container.appendChild(document.createElement("br"))
	}
}

function reveal(x, y, target) {
	target.innerHTML = board[x][y];
	target.style.color = colors[board[x][y]];
	if (board[x][y] == -1) {
		//alert("YOU SUCK");
		window.location.reload();
	} /* else if (board[x][y] == 0) {
		for (i = -1; i <= 1; i++) {
			for (j = -1; j <=1; j++) {

			}
		}
	} */ //add implementation for recursively revealing 0 tiles later
}

container.addEventListener("click", (event) => {
	if (event.target.className == "tile") {
		/*
		event.target.innerHTML = board[event.target.dataset.x][event.target.dataset.y];
		event.target.style.color = colors[board[event.target.dataset.x][event.target.dataset.y]];
		if (board[event.target.dataset.x][event.target.dataset.y] == -1) {
			alert("YOU SUCK");
			window.location.reload();
		} */
		reveal(event.target.dataset.x, event.target.dataset.y, event.target);
	}
});
container.addEventListener("contextmenu", (event) => {
	event.preventDefault();
	if (event.target.className == "tile") {
		if (event.target.innerHTML == "") {
			event.target.innerHTML = "⚑";
		} else if (event.target.innerHTML == "⚑") {
			event.target.innerHTML = "";
		}
	}
});


display()