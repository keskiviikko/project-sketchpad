let grid = document.getElementById("grid-container");
let size = 16;
let mode = false;

const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", () => {
	clearGrid();
	setGrid(getGridSize());
});

const modeSelector = document.querySelector("#mode");
modeSelector.addEventListener("click", () => {
	mode ? (mode = false) : (mode = true);
	if (mode) {
        modeSelector.style.background = "lightgreen";
        modeSelector.style.color = "black";
		document.getElementById("mode").innerHTML = "Color Mode";
	} else {
        modeSelector.style.background = "black";
        modeSelector.style.color = "white";
		document.getElementById("mode").innerHTML = "Black Mode";
	}
});

function clearGrid() {
	while (grid.firstChild) grid.removeChild(grid.firstChild);
}

function getGridSize() {
	size = prompt("Please give a grid size (Max 64)", 16);
	if (size > 64 || parseInt(size) != size) {
		alert("Invalid value. Resetting to default size (16*16)");
		setGrid(16);
	} else {
		return size;
	}
}

function setGrid(size) {
	for (let i = 1; i <= size; i++) {
		for (let j = 1; j <= size; j++) {
			let square = document.createElement("div");
			square.classList.add("square");
			square.style.width = 100 / size + "%";
			square.style.height = 100 / size + "%";
			grid.appendChild(square);
		}
	}
	colorSquares();
}

function colorSquares() {
	let square = document.querySelectorAll(".square");
	let touchSquare = function(e) {
		if (mode) {
			let r = Math.round(255 * Math.random());
			let g = Math.round(255 * Math.random());
			let b = Math.round(255 * Math.random());
			let color = `rgb(${r}, ${g}, ${b})`;
			console.log(color);
			e.target.style.background = color;
		} else {
			e.target.style.background = "black";
		}
	};
	square.forEach(square => {
		square.addEventListener("mouseenter", touchSquare);
		square.addEventListener("touchstart", touchSquare);
	});
}

setGrid(size);
