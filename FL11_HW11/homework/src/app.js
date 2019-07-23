let addInput = document.getElementsByClassName('js-add-input')[0];
let items = document.getElementsByTagName('li');
let addActionBlock = document.getElementsByClassName('js-warning')[0];
let maxSize = '<p>You can add maximum 10 items in list.</p>';
let addButton = document.getElementsByClassName('js-add-button')[0];
let removeButtons = document.getElementsByClassName('js-remove-button');
let editButtons = document.getElementsByClassName('js-edit-button');
let saveButtons = document.getElementsByClassName('js-save-button');
let todoList = document.getElementsByClassName('items')[0];
let checkboxes = document.getElementsByClassName('js-checkbox');
let maxListItems = 10;


function checkForChecked() {
  for (let checkbox of checkboxes) {
    checkbox.addEventListener('click', function() {
      checkbox.disabled = true;
    });
  }
}

function removeItem () {
  for (let removeButton of removeButtons) {
    removeButton.addEventListener('click', function() {
      removeButton.closest('li').remove();
      itemsCount();
      event.stopPropagation();
    });
  }
}

function itemsCount() {
  if (items.length >= maxListItems) {
    addButton.disabled = true;
    addInput.disabled = true;
    let warningMessage = document.createElement('div');
    warningMessage.innerHTML = maxSize;
    addActionBlock.appendChild(warningMessage)
  } else {
    addInput.disabled = false;
    addActionBlock.innerHTML = '';
  }
}

function showEditBar() {
  for (let editButton of editButtons) {
    editButton.addEventListener('click', function() {
      let parent = editButton.closest('.item');
      let actionEdit = parent.getElementsByClassName('action-edit')[0];
      // Show input.
      actionEdit.classList.remove('hidden');
      event.stopPropagation();
    });
  }
}

function editTask(){
  for(let saveButton of saveButtons) {
    saveButton.addEventListener('click', function() {

      let parent = saveButton.closest('li');
      let actionEdit = parent.getElementsByClassName('action-edit')[0];
      let label = parent.getElementsByClassName('label-copy')[0];
      let input = parent.getElementsByClassName('js-edit-input')[0];

      label.innerHTML = input.value;
      actionEdit.classList.add('hidden');
      event.stopPropagation();
    });
  }
}

function checkInputLength () {
  let inputValue = this.value;
  inputValue.length ? addButton.disabled = false : addButton.disabled = true;
}


let cols = document.querySelectorAll('ul li');
let dragSrcEl = null;

function handleDragStart(e) {
  dragSrcEl = e.target;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDragEnter() {
  this.classList.add('over');
}

function handleDragLeave() {
  this.classList.remove('over');
}

function handleDrop(e) {
  e.preventDefault();
  dragSrcEl.parentNode.removeChild(dragSrcEl);
  e.target.parentNode.insertBefore(dragSrcEl, e.target);
}

function handleDragEnd() {
  [].forEach.call(cols, function (col) {
    col.classList.remove('over');
  });
}

function initDrag() {
  let cols = document.querySelectorAll('ul li');
  [].forEach.call(cols, function(col) {
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragenter', handleDragEnter, false);
    col.addEventListener('dragover', handleDragOver, false);
    col.addEventListener('dragleave', handleDragLeave, false);
    col.addEventListener('drop', handleDrop, false);
    col.addEventListener('dragend', handleDragEnd, false);
  });
}

function addTask () {
  let inputValue = addInput.value;
  let itemPattern = document.createElement('li');
  itemPattern.setAttribute('draggable', true);
  itemPattern.innerHTML = '<div class="item">\n' +
    '          <div class="action">\n' +
    '            <label>\n' +
    '              <input type="checkbox" class="js-checkbox">\n' +
    '              <span class="label-copy">' + inputValue + '</span>\n' +
    '            </label>\n' +
    '            <button class="edit js-edit-button">\n' +
    '              <i class="material-icons">\n' +
    '                create\n' +
    '              </i>\n' +
    '            </button>\n' +
    '            <button class="remove js-remove-button">\n' +
    '              <i class="material-icons">\n' +
    '                delete\n' +
    '              </i>\n' +
    '            </button>\n' +
    '          </div>\n' +
    '          <div class="action-edit hidden">\n' +
    '            <input type="text" class="js-edit-input">\n' +
    '            <button class="save js-save-button">\n' +
    '              <i class="material-icons">\n' +
    '                save\n' +
    '              </i>\n' +
    '            </button>\n' +
    '          </div>\n' +
    '        </div>';

  // Clear input data.
  addInput.value = null;
  // Disable input button.
  addButton.disabled = true;
  // Add task.
  todoList.appendChild(itemPattern);

  initDrag();
  itemsCount();
  removeItem();
  showEditBar();
  editTask();
  checkForChecked();
}




// Check input value.
addInput.oninput = checkInputLength;
// Click on add task.
addButton.onclick = addTask;
// Remove button click.

initDrag();
removeItem();
showEditBar();
editTask();
checkForChecked();