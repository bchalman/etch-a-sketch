const gridContainer = document.querySelector('#gridContainer');
const clearButton = document.querySelector('#clearGrid');
const colorSelectButton = document.querySelector('#colorSelector');
const gridSizeInput = document.querySelector('input');
const gridPxWidth = 600;

let gridCols = 16;
let gridRows = 16;
let gridBoxArr = [];
let colorMode = false;

window.onload = createGrid(gridCols, gridRows, gridPxWidth);
clearButton.addEventListener('click', resetGrid);
gridSizeInput.addEventListener('keyup', resizeGrid);
colorSelectButton.addEventListener('click', toggleColorMode);

function createGrid(gridCols, gridRows, gridPxWidth){
  for (i=0; i<gridCols; i++){
    let colDiv = document.createElement('div');
    colDiv.classList.add('gridBox', 'gridCol');
    colDiv.setAttribute('id', "c" + i);
    for (j=0; j<gridRows; j++){
      let rowDiv = document.createElement('div');
      rowDiv.classList.add('gridBox', 'gridRow');
      rowDiv.style.height = (gridPxWidth / gridRows);
      colDiv.appendChild(rowDiv);
      gridBoxArr.push(rowDiv);
    }
    gridContainer.appendChild(colDiv);
  }
  styleCol(gridCols);
  styleRow(gridRows);
  gridBoxArr.forEach(box => box.addEventListener('mouseover', changeColor));
}

function styleCol (gridCols){
  let colArr = Array.from(document.querySelectorAll('.gridCol'));
  colArr.forEach(column => column.style.width = (gridPxWidth / gridCols) + 'px');
  colArr.forEach(column => column.style.outline = '1px solid #4a4a4a');
}

function styleRow (gridRows) {
  let rowArr = Array.from(document.querySelectorAll('.gridRow'));
  rowArr.forEach(row => row.style.height = (gridPxWidth / gridRows) + 'px');
  rowArr.forEach(row => row.style.outline = '1px solid #4a4a4a');
}

function changeColor(e) {
  if (!colorMode){
    e.target.style.backgroundColor = 'black';
  } else {
    let hue = Math.floor(Math.random() * (361));
    e.target.style.backgroundColor = `hsl(${hue}, 95%, 50%)`;
  }
}

function resetGrid(){
  const gridDivsArr = Array.from(document.querySelectorAll('.gridRow'));
  gridDivsArr.forEach(div => div.style.backgroundColor = 'white');
}

function resizeGrid(e){
  if (e.keyCode !== 13) return;
  let value = parseInt(e.target.value);
  if (value === NaN || value > 100 || value < 0){
    alert("You did not enter a correct value!");
    return;
  }

  gridCols = value;
  gridRows = value;
  gridBoxArr = [];
  clearGridContainer();
  createGrid(gridCols, gridRows, gridPxWidth);
}

function clearGridContainer() {
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
}

function toggleColorMode() {
  if (colorMode) colorMode = false;
  else colorMode = true;
}
