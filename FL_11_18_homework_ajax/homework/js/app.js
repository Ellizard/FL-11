const spinner = '<img src="img/spinner.gif" />';

// User class.
class User {
  constructor ({id, name, email}) {
    this.id = id;
    this.name = name;
    this.email = email;

    this.elementNode = document.createElement('div');

    // User name
    this.nameNode = document.createElement('a');
    this.nameNode.href = '#' + this.id;

    // User email.
    this.emailNode = document.createElement('div');

    // Buttons.
    this.editBtnNode = document.createElement('button');
    this.deleteBtnNode = document.createElement('button');
    this.editBtnNode.className = 'edit';
    this.editBtnNode.innerHTML = 'edit';
    this.deleteBtnNode.className = 'delete';
    this.deleteBtnNode.innerHTML = 'delete';

    // Spinner.
    this.spinner = document.createElement('div');
    this.spinner.className = spinner;
    this.spinner.innerHTML = spinner;

    // User photo.
    this.image = document.createElement('img');
    this.image.className = 'photo';
    this.elementNode.className = 'user';

    // Random width and height for random images.
    const photoH = Math.floor(Math.random() * 10);
    const photoW = Math.floor(Math.random() * 10);
    this.image.src = 'http://placekitten.com/g/5' + photoW + '/5' + photoH;

    // Add listeners on button.
    this.editBtnNode.addEventListener('click', this.edit);
    this.deleteBtnNode.addEventListener('click', this.delete);

    // Render user.
    return this.render();
  }

  // Show spinner.
  addSpinner () {
    this.elementNode.append(this.spinner);
  }

  // Hide spinner.
  removeSpinner () {
    this.spinner.remove();
  }

  // Remove user from list.
  delete = async () => {
    const deleteUser = confirm('delete?');
    this.addSpinner();
    if (deleteUser) {
      await fetch('https://jsonplaceholder.typicode.com/users/' + this.id, {
        method: 'DELETE'
      });
      this.elementNode.remove();
    }

  };

  // Edit user.
  edit = async () => {
    this.addSpinner();
    this.name = prompt('Edit name', this.name);

    await fetch('https://jsonplaceholder.typicode.com/users/' + this.id, {
      method: 'PUT',
      body: JSON.stringify({
        name: this.name
      })
    });
    this.removeSpinner();
    this.render();
  };

  // Render user.
  render () {
    this.nameNode.innerHTML = this.name;
    this.emailNode.innerHTML = this.email;
    this.elementNode.append(this.image, this.nameNode, this.emailNode, this.editBtnNode, this.deleteBtnNode);
    return this.elementNode;
  }

}


// User list.
class UserList {
  constructor () {
    this.list = document.createElement('div');
    this.fetchUsers();
    return this.render();
  }

  // Get users.
  async fetchUsers () {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    this.users = await response.json();
    this.render();
  };

  // Render user with condition for show spinner.
  render () {
    if (this.users) {
      this.list.innerHTML = '';
      this.users.forEach(element => {
        this.list.append(new User(element));
      });
    }
    else {
      this.list.innerHTML = spinner;
    }

    return this.list;
  }
}

const userList = new UserList;


// User detail page.
class UserDetails {
  constructor () {
    this.getData();
    this.list = document.createElement('div');
    return this.render();
  }

  // Get detail by user..
  async getData () {
    this.posts = await this.getPosts(location.hash.substr(1));
    this.posts.forEach(async post => {
      post.comments = await this.getCommentsByPost(post.id);
      this.render();
    });
  }

  // Get all user posts.
  async getPosts (userId) {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + userId);
    return await response.json();
  }

  // Get comments for each posts.
  async getCommentsByPost (postId) {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments?postId=' + postId);
    return await response.json();
  }

  // Render posts.
  renderComments (comments) {
    const list = document.createElement('div');
    if (comments) {
      comments.forEach(post => {
        const element = document.createElement('div');
        element.className = 'inner-body';
        element.innerHTML = post.body;
        list.append(element);
      });
    }
    else {
      list.innerHTML = spinner;
    }
    return list;
  }

  render () {
    this.list.innerHTML = '';
    if (this.posts) {
      this.posts.forEach(post => {
        const element = document.createElement('div');
        element.className = 'inner-block';
        element.innerHTML = post.body;
        element.append(this.renderComments(post.comments));
        this.list.append(element);
      });
    }
    else {
      this.list.innerHTML = spinner;
    }

    return this.list;
  }
}

// Main app.
class App {
  constructor () {
    this.node = document.getElementById('app');
    this.render();

    // Listen has change.
    window.onhashchange = () => {
      this.render();
    };
  }

  render () {
    this.node.innerHTML = '';
    if (window.location.hash) {
      this.node.append(new UserDetails);
    }
    else {
      this.node.append(userList);
    }

  }
}

const app = new App;
