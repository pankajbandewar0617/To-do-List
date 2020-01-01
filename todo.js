// const data = [];
const form = document.getElementById('addForm');
const itemList = document.getElementById('items');
const check = document.getElementById('items');
const itemdrag = document.getElementById('items')
let itemsArray = []

// Form submit event
form.addEventListener('submit', addItem);

// checkbox event
check.addEventListener('change', checkItems);

// Delete event
itemList.addEventListener('click', removeItem);

// dragstart event 
itemdrag.addEventListener('dragstart', dragstart)

// dragover event 
itemdrag.addEventListener('dragover', dragover)

// dragend event
itemdrag.addEventListener('dragend', dragend)

function clearOldData() {
    while (items.hasChildNodes()) {
        items.lastChild.remove();
    }
    refreshDom(itemsArray)
}

function refreshDom(data) {

    for (let i = 0; i < data.length; i++) {

        let obj = data[i];

        let item = obj['item'];

        const li = document.createElement('li');
        li.className = 'list-item';
        li.draggable = true;

        const checkbtn = document.createElement('input');
        checkbtn.type = 'checkbox';
        checkbtn.className = 'check';
        checkbtn.checked = obj['status'];

        if (checkbtn.checked) {
            li.style.textDecoration = 'line-through';
        }

        const deletebtn = document.createElement('button');
        deletebtn.className = 'delete';
        deletebtn.appendChild(document.createTextNode('X'));

        li.appendChild(checkbtn);
        li.appendChild(document.createTextNode(item));
        li.appendChild(deletebtn);

        li.setAttribute('position', i)
        itemList.appendChild(li);
        document.getElementById('item').value = '';
    }
}

// Add item

let i = 0;
function addItem(e) {

    e.preventDefault()

    const newItem = document.getElementById('item').value;
    if (newItem) {
        let obj = { 'item': newItem, 'status': false }
        itemsArray.push(obj)

        clearOldData()
    }
}

// Check Item

function checkItems(e) {
    let li = e.target.parentElement;
    let index = li.getAttribute('position');
    itemsArray[index]['status'] = e.target.checked;

    clearOldData()
}

// Remove item

function removeItem(e) {
    if (e.target.classList.contains('delete')) {
        let li = e.target.parentElement;
        let index = li.getAttribute('position')
        itemsArray.splice(index, 1)

        clearOldData()
    }
}

// Drag start

let startPoint;
function dragstart(e) {
    startPoint = e.srcElement.getAttribute('position');
}

// Drag over

let dragPoint;
function dragover(e) {
    dragPoint = e.srcElement.getAttribute('position');
}

// Drag end

function dragend(e) {
    const content = itemsArray.splice(startPoint, 1);
    itemsArray.splice(dragPoint, 0, content[0]);

    clearOldData()
}

