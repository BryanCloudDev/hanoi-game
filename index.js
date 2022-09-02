let disk1 = document.getElementById("disk-1");
let disk2 = document.getElementById("disk-2");
let disk3 = document.getElementById("disk-3");
let disk4 = document.getElementById("disk-4");
let tower1 = document.getElementById("tower1");
let tower2 = document.getElementById("tower2");
let tower3 = document.getElementById("tower3");
let points = document.getElementById("points");
let result = document.getElementById("youWin");
let restart = document.querySelector("button");
let bestScore = document.getElementById("bestScore");
let dragged;
let counter = 0;

function checkSize(item, container) {
	let nodes = container.children;
	if (nodes.length > 0) {
		if (nodes[0].offsetWidth < item.offsetWidth) {
			return true;
		}
		return false;
	}
	return false;
}

function towerFn(element) {
	element.addEventListener("dragover", (e) => {
		e.preventDefault();
	});

	element.addEventListener("dragenter", (e) => {
		e.preventDefault();
	});

	element.addEventListener("drop", (e) => {
		e.preventDefault();
		let container = e.target;
		let isBigger = checkSize(dragged, container);
		if (container == dragged.parentElement) {
			return false;
		}
		if (!isBigger) {
			if (dragged.parentElement.children[1]) {
				dragged.parentElement.children[1].removeAttribute("ondragstart");
				dragged.parentElement.children[1].setAttribute("draggable", "true");
			}
			counter++;
			points.innerHTML = `Points: ${counter}`;
			container.prepend(dragged);
			checkScore(container);
			if (dragged.nextSibling) {
				if (dragged.nextElementSibling.getAttribute("ondragstart")) {
					dragged.nextElementSibling.setAttribute("ondragstart", "return false;");
				} else {
					dragged.nextElementSibling.removeAttribute("draggable", "false");
					dragged.nextElementSibling.setAttribute("ondragstart", "return false;");
				}
			}
		}
	});
}

function checkScore(tower) {
	if (tower.children.length == 4) {
		result.style.display = "block";
	}
}

disk1.addEventListener("dragstart", (e) => {
	dragged = e.target;
});

disk2.addEventListener("dragstart", (e) => {
	dragged = e.target;
});

disk3.addEventListener("dragstart", (e) => {
	dragged = e.target;
});

disk4.addEventListener("dragstart", (e) => {
	dragged = e.target;
});

tower1.addEventListener("dragenter", (e) => {
	e.preventDefault();
	towerFn(e.target);
});

tower2.addEventListener("dragenter", (e) => {
	e.preventDefault();
	towerFn(e.target);
});

tower3.addEventListener("dragenter", (e) => {
	e.preventDefault();
	towerFn(e.target);
});

restart.addEventListener("click", () => {
  if(!savedScore) {
    localStorage.setItem('max',`${counter}`);
  } else{
    localStorage.setItem('max', counter < savedScore ? counter : savedScore)
  }
	window.location.reload();
});

let savedScore = localStorage.getItem('max') ? parseInt(localStorage.getItem('max')) : 0;
bestScore.innerHTML = `Best score: ${savedScore}`;
console.log(savedScore);