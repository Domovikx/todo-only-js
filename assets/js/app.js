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


    getLocalStage();

    function getLocalStage() {
      window.onload = function () {
        if (localStorage.getItem('state')) {
          state = JSON.parse(localStorage.getItem('state'));
          render(state);
        }
      }
    }

    function setLocalStage() {
      localStorage.setItem('state', JSON.stringify(state));
    }


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

        setLocalStage();
        render(state);
      }


    }


    counts();

    function counts() {
      const arr = state.todoDate;
      const countAll = arr.length;
      state.countsValue[0] = countAll;
    }

    function createNewTodo(text) {
      return {
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
        let btnImportant = '';
        let btnDone = '';

        obj.important ?
          btnImportant = 'btn-important-active' : btnImportant = 'btn-important';
        obj.done ?
          btnDone = 'btn-done-active' : btnDone = 'btn-done';

        element.innerHTML += `
         <li class="todo__item item">
         <p class="item__text">${text}</p>
         <button class="btn ${btnImportant}">important</button>
         <button class="btn ${btnDone}">done</button>
         <button class="btn btn-del">del</button>
         </li>
         `;
      }
    })();

  }

})()