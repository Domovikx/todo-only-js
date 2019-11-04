(function app() {

  processing()

  function processing() {

    let state = {
      countsValue: [5, 6, 7],
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


    counts();

    function counts() {
      const arr = state.todoDate;
      const countAll = arr.length;
      state.countsValue[0] = countAll;
    }


    (function listEvents() {
      const element = document.getElementById('todo__list');
      element.addEventListener('click', (event) => {
        const value = event.target.value;
        const id = event.target.parentNode.id;

        switch (value) {
          case 'del':
            del(id);
            break;
          case 'important':
            important(id);
            break;
          case 'done':
            done(id);
            break;

          default:
            break;
        }
      });

      function del(id) {
        const arr = state.todoDate;
        for (let i = 0; i < arr.length; i++) {
          const elementID = arr[i].id;
          if (id === elementID) {
            arr.splice(i, 1);
            counts();
            render(state);
          }
        }
      }

      function important(id) {

      }

      function done(id) {

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
      const arr = [...state.countsValue];
      element.innerHTML = `${arr.join(' ')}`;
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