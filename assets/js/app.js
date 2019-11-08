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
      countItems: 9,
      countImportant: 6,
      countDone: 3,
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
      this.state = JSON.parse(localStorage.getItem('state'));
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

};

const controller = {

  createTestTodoList: function () {
    const todoDate = model.state.todoDate;
    todoDate.push(model.createNewTodo('123'));
    todoDate.push(model.createNewTodo('456'));
    todoDate.push(model.createNewTodo('789'));
    console.log('todoDate :', todoDate);
  }

  

};


(function () {

  const start = {

    init: function () {
      this.main();
      this.control();
      this.event();
    },

    main: function () {

    },

    control: function () {
      controller.createTestTodoList();
    },

    event: function () {

      window.onload = () => {
        model.loadState();
        console.log('loadState');
      }

      window.onunload = () => {
        model.saveState();
        console.log('saveState');
      }

    },

  };

  start.init();

})();












// (function app() {

//   let state = {
//     countsValue: {
//       countItems: 9,
//       countImportant: 6,
//       countDone: 3,
//     },
//     searchText: '',
//     additionText: '',
//     todoDate: [
//       createNewTodo('123'),
//       createNewTodo('456'),
//       createNewTodo('7 8 9'),
//     ],
//   }


//   window.onload = () => {
//     if (localStorage.getItem('state')) {
//       state = JSON.parse(localStorage.getItem('state'));
//       addition();
//       counts();
//       render(state);
//     }
//   }

//   window.onunload = () => {
//     localStorage.setItem('state', JSON.stringify(state));
//   };


//   function addition() {
//     const element = document.getElementById('addition__form');
//     element.addEventListener('submit', eventSubmit);

//     function eventSubmit(event) {
//       event.preventDefault();
//       const text = document.getElementById('add');
//       state.todoDate.unshift(createNewTodo(text.value));
//       text.value = '';
//       counts();
//       render(state);
//     }
//   }


//   function search() {
//     const element = document.getElementById('search__form');
//     element.addEventListener('submit', eventSubmit);

//     function eventSubmit(event) {
//       event.preventDefault();
//       const search = document.getElementById('search');
//       if (search.value === '') return render(state);
//       const searchText = search.value.toLowerCase();
//       const filterTodoDate = state.todoDate.filter((obj) => (
//         obj.text
//         .toLowerCase()
//         .indexOf(searchText) !== -1
//       ))

//       const filterState = {
//         ...state
//       };
//       filterState.todoDate = filterTodoDate;

//       render(filterState);
//     }
//   }
//   search();


//   function counts() {
//     const arr = state.todoDate;
//     let countItems = 0;
//     let countImportant = 0;
//     let countDone = 0;

//     arr.forEach(({
//       important,
//       done
//     }) => {
//       countItems++;
//       if (important) countImportant++;
//       if (done) countDone++;
//     });

//     state.countsValue.countItems = countItems;
//     state.countsValue.countImportant = countImportant;
//     state.countsValue.countDone = countDone;
//   }


//   function listEvents() {
//     const element = document.getElementById('todo__list');
//     element.addEventListener('click', (event) => {
//       const eventValue = event.target.value;
//       const id = event.target.parentNode.id;
//       const arr = state.todoDate;

//       for (let i = 0; i < arr.length; i++) {
//         if (id === arr[i].id) {
//           if (eventValue === 'del') arr.splice(i, 1);
//           listEvents
//           if (eventValue === 'important') arr[i].important = !arr[i].important;
//           if (eventValue === 'done') arr[i].done = !arr[i].done;
//           counts();
//           render(state);
//           return;
//         }
//       }
//     });
//   }
//   listEvents();


//   function createNewTodo(text) {
//     const doId = () => Math.random().toString(32).substr(2, 16);
//     return {
//       id: doId(),
//       text,
//       important: false,
//       done: false,
//     }
//   }


//   function render(state) {

//     (function counts() {
//       const element = document.getElementById('counts');
//       element.innerHTML = `
//       ${state.countsValue.countItems} | 
//       ${state.countsValue.countImportant} | 
//       ${state.countsValue.countDone}`;
//     })();


//     (function todo() {
//       const element = document.getElementById('todo__list');
//       const arrTodo = state.todoDate;

//       element.innerHTML = '';
//       for (const obj of arrTodo) {
//         const text = obj.text;
//         const id = obj.id;
//         let btnImportant = '';
//         let btnDone = '';
//         let textImportant = '';
//         let textDone = '';

//         if (obj.important) {
//           btnImportant = 'btn-important-active';
//           textImportant = 'important';
//         } else {
//           btnImportant = 'btn-important';
//         }

//         if (obj.done) {
//           btnDone = 'btn-done-active';
//           textDone = 'done';
//         } else {
//           btnDone = 'btn-done';
//         }


//         element.innerHTML += `
//          <li class="todo__item item" id=${id}>
//          <p class="item__text ${textImportant} ${textDone}">${text}</p>
//          <button class="btn ${btnImportant}" value="important">important</button>
//          <button class="btn ${btnDone}" value="done">done</button>
//          <button class="btn btn-del" value="del">del</button>
//          </li>
//          `;
//       }
//     })();
//   }
//   render(state);

// })()