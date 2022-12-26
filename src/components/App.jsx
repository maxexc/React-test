// import { useState  } from "react";

// const App = ({ someProp }) => {
//   const [planets, setPlanets] = useState(["Earth", "Mars", "Jupiter", "Venus"]);
//   const [query, setQuery] = useState("");
//   const [clicks, setClicks] = useState(0);

//   const filteredPlanets = planets.filter(planet => planet.includes(query));

//   return (
//     <div>
//       <div>Some prop: {someProp}</div>
//       <button onClick={() => setClicks(clicks + 1)}>
//         Number of clicks: {clicks}
//       </button>
//       <div>
//         {filteredPlanets.map(planet => (
//           <div key={planet}>{planet}</div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   const [value, setValue] = useState(0);
//   const btnRef = useRef();

//   // Будет null на первом рендере
//   // и ссылкой на DOM-элемент все последующие
//   console.log(btnRef.current);

//   useEffect(() => {
//     // Эффект выполняется после монтирования,
//     // поэтому всегда будет ссылкой на DOM-элемент
//     console.log(btnRef.current);
//   });

//   const handleClick = () => {
//     // Клики будут после монтирвоания,
//     // поэтому всегда будет ссылкой на DOM-элемент
//     console.log(btnRef.current);
//   };

//   return (
//     <>
//       <button onClick={() => setValue(value + 1)}>
//         Update value to trigger re-render
//       </button>
//       <button ref={btnRef} onClick={handleClick}>
//         Button with ref
//       </button>
//     </>
//   );
// };

// import { useState, useEffect } from "react";

// const App = () => {
//   const [value, setValue] = useState(3);

//   useEffect(() => {
//     console.log(value);
//     console.log("Updating phase: same when componentDidUpdate runs");
//   }, [value]);
//   //   console.log("Mouting phase: same when componentDidMount runs");
//   // }, []);

//   return <button onClick={() => setValue(value + 1)}>{value}</button>;
// };

// const App = () => {
//   const [value, setValue] = useState(0);

//   useEffect(() => {
//     document.title = `You clicked ${value} times`;
//   });

//   return (
//     <div>
//       <p>You clicked {value} times</p>
//       <button onClick={() => setValue(value + 1)}>Click me</button>
//     </div>
//   );
// };

// export default App;


import React, { Component } from "react";
import shortid from 'shortid';
import Container from "./Container";
import TodoList from "./TodoList";
import TodoEditor from './TodoEditor';
import Filter from './TodoFilter';
import initialTodos from '../todos.json';
import Modal from "./Modal";
import IconButton from "./IconButton";
import {ReactComponent as AddIcon } from '../icons/add.svg'

class App extends Component {
  state = {
    // todos: [],
    todos: initialTodos,
    filter: '',
    showModal: false,
    showModalEditor: false,
  };

  // callback - не нужен, это внутренная логика самого компонента
  // componentDidMount = () => {}
  componentDidMount() {
    console.log('App componentDidMount'); 

    const todos = localStorage.getItem('todos');
    const parsedTodos = JSON.parse(todos)

    // console.log(todos);
    console.log(parsedTodos);

    if (parsedTodos) {
      this.setState({todos: parsedTodos});
    }

    // setTimeout(() =>{
    //   this.setState({todos: parsedTodos});
    // }, 2000)
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('App componentDidUpdate');

    // this.setState() - зациклит rebder/state/метод и опять по кругу) !!!ВЫЗЫВАЕМ только при проверке какого-то условия

    if(this.state.todos !== prevState.todos) {
      console.log('Обновилось поле todos');

      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }

    // console.log(prevState);
    // console.log(this.state);
  }
  
  addTodo = text => {
    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
    };

    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  toggleCompleted = todoId => {
    // this.setState(prevState => ({
    //   todos: prevState.todos.map(todo => {
    //     if (todo.id === todoId) {
    //       return {
    //         ...todo,
    //         completed: !todo.completed,
    //       };
    //     }

    //     return todo;
    //   }),
    // }));

    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleTodos = () => {
    const { filter, todos } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return todos.filter(todo =>
      todo.text.toLowerCase().includes(normalizedFilter),
    );
  };

  calculateCompletedTodos = () => {
    const { todos } = this.state;

    return todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0,
    );
  };

  // toggleModal = () => {
  //   this.setState(state => ({
  //     showModal: !state.showModal,
  //   }));
  // };

  toggleModal = () => {
    this.setState(({showModal}) => ({
      showModal: !showModal,
    }));
  }; 

  toggleModalEditor = () => {
    this.setState(({showModalEditor}) => ({
      showModalEditor: !showModalEditor,
    }));
  };  

  render() {
    // console.log('App render')
    const { todos, filter, showModal, showModalEditor } = this.state;
    const totalTodoCount = todos.length;
    const completedTodoCount = this.calculateCompletedTodos();
    const visibleTodos = this.getVisibleTodos();

    return (
      <Container>
        
        <IconButton onClick={this.toggleModalEditor} aria-label="Add todo" >
          <AddIcon width="40" height="40"  /> 
        </IconButton>
        {showModalEditor && (
          <Modal onClose={this.toggleModalEditor}>
            <TodoEditor onSubmit={this.addTodo} />
            <button type="button" onClick={this.toggleModalEditor}>Close</button>
          </Modal>)}
        
        <button type="button" onClick={this.toggleModal}>Open Modal</button>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <h1>Hi this is modal content as children</h1>
              <p> 
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                Veniam ipsa voluptates, quibusdam nihil nostrum magnam harum 
                nemo atque ducimus quos aspernatur, minus animi ipsam cupiditate 
                iste nam placeat. Suscipit, doloremque sit sapiente laboriosam 
                temporibus odit distinctio quibusdam sunt quo similique itaque 
                debitis ullam fugiat magni magnam quia libero harum! Nesciunt!
              </p>
              <button type="button" onClick={this.toggleModal}>Close</button>
          </Modal>)}
        
        
        {/* <IconButton onClick={this.toggleModal} aria-label="Добавить todo">
          <AddIcon width="40" height="40" fill="#fff" />
        </IconButton> */}

        {/* {showModal && (
          <Modal onClose={this.toggleModal}>
            <TodoEditor onSubmit={this.addTodo} />
          </Modal>
        )} */}

        {/* TODO: вынести в отдельный компонент */}
        <div>
          <p>Total Notes: {totalTodoCount}</p>
          <p>Executed: {completedTodoCount}</p>
        </div>

        

        <Filter value={filter} onChange={this.changeFilter} />

        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
      </Container>
    );
  }
}

export default App;
