(function app() {

  processing()

  function processing() {

    let state = {
      countsValue: {
        countAll: 9,
        countImportant: 6,
        countDone: 3,
      },
      searchText: '',
      additionText: '',
      todoDate: [
        createNewTodo('123'),
        createNewTodo('456'),
        createNewTodo('7 8 9'),
      ],
      visibility: {
        all: true,
        important: false,
        done: false,
      }
    }


    window.onload = () => {
      if (localStorage.getItem('state')) {
        state = JSON.parse(localStorage.getItem('state'));
        counts();
        render(state);
      }
    }

    window.onunload = () => {
      localStorage.setItem('state', JSON.stringify(state));
    };


    addition();

    function addition() {
      const element = document.getElementById('addition__form');
      element.addEventListener('submit', eventSubmit);

      function eventSubmit(event) {
        event.preventDefault();
        const text = document.getElementById('add');
        if (text.value === '') return;
        state.todoDate.unshift(createNewTodo(text.value));
        text.value = '';
        counts();
        render(state);
      }
    }


    function counts() {
      const arr = state.todoDate;
      const countAll = arr.length;
      let countImportant = 0;
      let countDone = 0;

      state.countsValue.countAll = countAll;

      for (let i = 0; i < arr.length; i++) {
        countImportant += state.todoDate[i].important + 0;
      }
      state.countsValue.countImportant = countImportant;

      for (let i = 0; i < arr.length; i++) {
        countDone += state.todoDate[i].done + 0;
      }
      state.countsValue.countDone = countDone;
    }


    (function listEvents() {
      const element = document.getElementById('todo__list');
      element.addEventListener('click', (event) => {
        const value = event.target.value;
        const id = event.target.parentNode.id;
        const arr = state.todoDate;

        switch (value) {
          case 'del':
            del(id, arr);
            break;
          case 'important':
            important(id, arr);
            break;
          case 'done':
            done(id, arr);
            break;

          default:
            break;
        }
      });

      function del(id, arr) {
        for (let i = 0; i < arr.length; i++) {
          if (id === arr[i].id) {
            arr.splice(i, 1);
            counts();
            render(state);
          }
        }
      }

      function important(id, arr) {
        for (let i = 0; i < arr.length; i++) {
          if (id === arr[i].id) {
            arr[i].important = !arr[i].important;
            counts();
            render(state);
          }
        }
      }

      function done(id, arr) {
        for (let i = 0; i < arr.length; i++) {
          if (id === arr[i].id) {
            arr[i].done = !arr[i].done;
            counts();
            render(state);
          }
        }
      }
    })();


    function createNewTodo(text) {
      const doId = () => Math.random().toString(32).substr(2, 16);
      return {
        id: doId(),
        text,
        important: false,
        done: false,
      }
    }

    render(state);
  }


  function render(state) {

    (function counts() {
      const element = document.getElementById('counts');
      element.innerHTML = `
      ${state.countsValue.countAll} | 
      ${state.countsValue.countImportant} | 
      ${state.countsValue.countDone}`;
    })();


    (function todo() {
      const element = document.getElementById('todo__list');
      const arrTodo = state.todoDate;

      element.innerHTML = '';
      for (const obj of arrTodo) {
        const text = obj.text;
        const id = obj.id;
        let btnImportant = '';
        let btnDone = '';

        obj.important ?
          btnImportant = 'btn-important-active' : btnImportant = 'btn-important';
        obj.done ?
          btnDone = 'btn-done-active' : btnDone = 'btn-done';

        element.innerHTML += `
         <li class="todo__item item" id=${id}>
         <p class="item__text">${text}</p>
         <button class="btn ${btnImportant}" value="important">important</button>
         <button class="btn ${btnDone}" value="done">done</button>
         <button class="btn btn-del" value="del">del</button>
         </li>
         `;
      }
    })();

  }

})()