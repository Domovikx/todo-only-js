const view = {

  showCount: function ({
    countItems,
    countImportant,
    countDone,
  }) {
    const element = document.getElementById('counts');
    element.innerHTML = `${countItems} | ${countImportant} | ${countDone}`;
  },

  showTodoList: function ({
    todoDate,
  }) {

    const element = document.getElementById('todo__list');
    element.innerHTML = '';

    for (const obj of todoDate) {
      const text = obj.text;
      const id = obj.id;
      let btnImportant = '';
      let btnDone = '';
      let textImportant = '';
      let textDone = '';

      if (obj.important) {
        btnImportant = 'btn-important-active';
        textImportant = 'important';
      } else {
        btnImportant = 'btn-important';
      }

      if (obj.done) {
        btnDone = 'btn-done-active';
        textDone = 'done';
      } else {
        btnDone = 'btn-done';
      }

      element.innerHTML += `
       <li class="todo__item item" id=${id}>
       <p class="item__text ${textImportant} ${textDone}">${text}</p>
       <button class="btn ${btnImportant}" value="important">important</button>
       <button class="btn ${btnDone}" value="done">done</button>
       <button class="btn btn-del" value="del">del</button>
       </li>
       `;
    }
  },
};


const model = {

  state: {
    countsValue: {
      countItems: 0,
      countImportant: 0,
      countDone: 0,
    },
    searchText: '',
    additionText: '',
    todoDate: [],
  },

  createNewTodo: function (text) {
    const doId = () => Math.random().toString(32).substr(2, 16);
    return {
      id: doId(),
      text,
      important: false,
      done: false,
    }
  },

  loadState: function () {
    if (localStorage.getItem('state')) {
      const state = JSON.parse(localStorage.getItem('state'));
      this.state = state;
    }
  },

  saveState: function () {
    localStorage.setItem('state', JSON.stringify(this.state));
  },

  counts: function () {
    const todoDate = this.state.todoDate;
    let countItems = 0;
    let countImportant = 0;
    let countDone = 0;

    todoDate.forEach(({
      important,
      done
    }) => {
      countItems++;
      if (important) countImportant++;
      if (done) countDone++;
    });

    return {
      countItems,
      countImportant,
      countDone,
    }
  },

  editListItem: function ({
    id,
    occasion
  }) {
    const arr = this.state.todoDate;
    for (let i = 0; i < arr.length; i++) {
      if (id === arr[i].id) {
        if (occasion === 'del') arr.splice(i, 1);
        if (occasion === 'important') arr[i].important = !arr[i].important;
        if (occasion === 'done') arr[i].done = !arr[i].done;
        break;
      }
    }
  },

  search: function (searchText) {
    searchText = searchText.toLowerCase();
    const filterTodo = this.state.todoDate.filter(obj => (
      obj.text
      .toLowerCase()
      .indexOf(searchText) !== -1
    ));

    return {
      todoDate: filterTodo,
    };
  }
};


const controller = {

  eventAddButton: function () {
    const element = document.getElementById('addition__form');
    element.addEventListener('submit', event => {
      event.preventDefault();

      const elementAdd = document.getElementById('addition__form-add');
      const text = elementAdd.value;
      elementAdd.value = '';

      const newTodo = model.createNewTodo(text);
      const todoDate = model.state.todoDate;
      todoDate.unshift(newTodo);

      const counts = model.state.countsValue = model.counts();

      view.showCount(counts);
      view.showTodoList({
        todoDate,
      });
    });
  },

  eventList: function () {
    const element = document.getElementById('todo__list');
    element.addEventListener('click', event => {
      const occasion = event.target.value;
      const id = event.target.parentNode.id;

      model.editListItem({
        id,
        occasion
      });
      model.state.countsValue = model.counts();

      view.showTodoList({
        todoDate: model.state.todoDate,
      });
      view.showCount({
        ...model.state.countsValue,
      });
    });
  },

  eventSearchForm: function () {
    const element = document.getElementById('search__form');
    element.addEventListener('submit', event => {
      event.preventDefault();
      const searchText = document.getElementById('search').value;
      const todoDate = model.search(searchText);
      if (todoDate) {
        view.showTodoList({
          ...todoDate,
        })
      }
    });
    element.addEventListener('keyup', event => {
      const value = event.target.value;
      if (value === '') {
        view.showTodoList({
          todoDate: model.state.todoDate,
        });
      }
    });
  },
};


(function () {

  const start = {

    init: function () {
      this.main();
      this.control();
      this.event();
    },

    main: function () {},

    control: function () {
      controller.eventAddButton();
      controller.eventList();
      controller.eventSearchForm();
    },

    event: function () {
      window.onload = () => {
        model.loadState();
        view.showTodoList({
          todoDate: model.state.todoDate,
        });
        view.showCount({
          ...model.state.countsValue,
        });
      }

      window.onunload = () => {
        model.saveState();
      }
    },
  };
  start.init();

})();