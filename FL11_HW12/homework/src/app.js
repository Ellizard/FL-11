let todoItems = [];
let finishedItems = [];
let itemsIndex = null;

const messageShowTime = 2000;
const addTask = document.getElementsByClassName('js-add-task')[0];
const saveChangesBtn = document.getElementsByClassName('js-save-changes')[0];
const modifyInput = document.getElementsByClassName('js-modify-input')[0];
const cancelEdit = document.getElementsByClassName('js-cancel');
const taskInput = document.getElementsByClassName('js-add-task-input')[0];
const taskList = document.getElementsByClassName('task-list')[0];
const statusCopy = document.getElementsByClassName('js-status-copy')[0];
const addPage = document.getElementsByClassName('js-add-screen')[0];
const modifyPage = document.getElementsByClassName('js-modify-screen')[0];
const saveOnEdit = document.getElementsByClassName('js-save-on-edit')[0];
const mainPage = document.getElementsByClassName('js-main-screen')[0];
const messageError = document.getElementsByClassName('js-message-error')[0];
const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

// Detect chrome browser.
if(isChrome) {
  alert('yes');
  messageError.classList.add('chrome');
} else {
  alert('no');
}

// Show add step.
function showAddStep () {
  window.location.hash = '#add';
  addPage.style.display = 'block';
  modifyPage.style.display = 'none';
  mainPage.style.display = 'none';
}

// Show modify step.
function showModifyPage () {
  let modifiedValue = modifyInput.value;
  // Add modified tag to hash.
  for(let i=0; i < todoItems.length; i++) {
    if (todoItems[i].name === modifiedValue) {
      window.location.hash = '#modify/:' + i;
    }
  }
  modifyPage.style.display = 'block';
  addPage.style.display = 'none';
  mainPage.style.display = 'none';
}

// Show main page.
function showMainPage () {
  mainPage.style.display = 'block';
  modifyPage.style.display = 'none';
  addPage.style.display = 'none';
}

// Detect click on add input.
addTask.onclick = function() {
  location.hash = 'add-page';
  showAddStep();
};

// Detect click on cancel button.
for (let i = 0; i < cancelEdit.length; i++) {
  cancelEdit[i].onclick = function() {
    location.hash = 'main-page';
    showMainPage();
  };
}

// Show messages.
function showErrorMessage(message) {
  messageError.style.display = 'block';
  messageError.innerHTML = message;
  setTimeout(function(){
    messageError.style.display = 'none';
  }, messageShowTime);
}

// Save items/
function saveItems() {
  let strItems = JSON.stringify(todoItems);
  let strDoneItems = JSON.stringify(finishedItems);
  localStorage.setItem('items', strItems);
  localStorage.setItem('finishedItems', strDoneItems);
}

// Save new value on edit.
saveOnEdit.onclick = function(){
  let filteredItems = todoItems.filter(item => item.name !== modifyInput.value);
  if (modifyInput.value !== '' &&
    (filteredItems.length === todoItems.length || todoItems[itemsIndex].name === modifyInput.value)) {
    todoItems[itemsIndex].name = modifyInput.value;
    listTodoItems();
    itemsIndex = null;
    showMainPage();
  } else if (modifyInput.value === '') {
    showErrorMessage('You can\'t add empty item !');
  } else {
    showErrorMessage('You can\'t add already exist item !');
  }
};

// Remove items.
function removeItem(index) {
  todoItems.splice(index, 1);
}

// Get all items for load.
function getItems() {
  let strItems = localStorage.getItem('items');
  let strDoneItems = localStorage.getItem('finishedItems');
  todoItems = JSON.parse(strItems);
  finishedItems = JSON.parse(strDoneItems);
  if (!todoItems) {
    todoItems = [];
  }
  if (!finishedItems) {
    finishedItems = [];
  }
}


const listTodoItems = () => {
  taskList.innerHTML = '';
  // Find completed items.
  todoItems = todoItems.filter(item => !item.completed);
  finishedItems = finishedItems.filter(item => item.completed);
  todoItems = todoItems.concat(finishedItems);

  // Change copy on main page.
  if (todoItems.length) {
    statusCopy.innerHTML = '';
  } else {
    statusCopy.innerHTML = 'TODO is empty';
  }

  // Build items in a list.
  for (let item = 0; item < todoItems.length; item++) {
    const toDoItem = document.createElement('li');
    const checkItem = document.createElement('img');
    
    checkItem.onclick = function() {
      if (!todoItems[item].completed) {
        todoItems[item].completed = true;
        finishedItems.push(todoItems[item]);
        listTodoItems();
      } else {
        todoItems[item].completed = false;
        listTodoItems();
      }
    };
    
    // Check for completed state and toggle image src.
    if (todoItems[item].completed) {
      checkItem.src = './assets/img/done-s.png';
    } else {
      checkItem.src = './assets/img/todo-s.png';
    }
    
    let copy = document.createElement('span');
    copy.innerHTML = todoItems[item].name;

    // Trigger click on item copy.
    copy.onclick = function() {
      if (!todoItems[item].completed) {
        modifyInput.value = todoItems[item].name;
        showModifyPage();
        itemsIndex = item;
      } else {
        showErrorMessage('You can\'t edit already done item !');
      }
    };

    // Define delete button.
    const deleteTask = document.createElement('img');
    deleteTask.src = './assets/img/remove-s.jpg';

    deleteTask.onclick = function() {
      removeItem(item);
      finishedItems = todoItems.filter(item => item.completed);
      listTodoItems();
    };
    
    // Generate list item.
    toDoItem.appendChild(copy);
    toDoItem.appendChild(checkItem);
    taskList.appendChild(toDoItem);
    toDoItem.appendChild(deleteTask);

    // Change background if task already checked.
    if (todoItems[item].completed) {
      toDoItem.style.backgroundColor = '#ccc';
    }
  }
  saveItems();
};

// Add item in global list.
function addToDoItem(name) {
  // Case when item already exist.
  if (!todoItems.every(item => item.name !== name)) {
    showErrorMessage('You can\'t add already exist item !');
  } else if (name === '') {
    // Case when item value is empty.
    showErrorMessage('You can\'t add empty item !');
  } else {
    // Add item in a list.
    const newItem = {
      name: name,
      completed: false
    };
    todoItems.push(newItem);
    taskInput.value = '';
    // Switch to main page.
    showMainPage();
    // Show all items.
    listTodoItems();
  }
}

// Save edited values.
saveChangesBtn.addEventListener('click', function() {
  addToDoItem(taskInput.value);
});

// Clear hash on window load and init script.
window.onload = function() {
  getItems();
  listTodoItems();
  window.location.hash = '';
};
