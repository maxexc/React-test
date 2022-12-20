import React, { Component } from "react";
import shortid from 'shortid';
import Container from "./Container";
import TodoList from "./TodoList";
import TodoEditor from './TodoEditor';
import Filter from './TodoFilter';
// import initialTodos from '../todos.json';
import Modal from "./Modal";

class App extends Component {
  state = {
    todos: [],
    // todos: initialTodos,
    filter: '',
    showModal: false,
  };

  // callback - не нужен, это внутренная логика самого компонента
  // componentDidMount = () => {}
  componentDidMount() {
    console.log('App componentDidMount'); 

    const todos = localStorage.getItem('todos');
    const parsedTodos = JSON.parse(todos)

    console.log(todos);
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

  render() {
    console.log('App render')
    const { todos, filter, showModal } = this.state;
    // const { todos, filter } = this.state;
    const totalTodoCount = todos.length;
    const completedTodoCount = this.calculateCompletedTodos();
    const visibleTodos = this.getVisibleTodos();

    return (
      <Container>
        <button type="button" onClick={this.toggleModal}>Открыть модалку</button>
        {showModal && <Modal>
          <h1>Привет это контент модалки как children</h1>
            <p> 
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
              Veniam ipsa voluptates, quibusdam nihil nostrum magnam harum 
              nemo atque ducimus quos aspernatur, minus animi ipsam cupiditate 
              iste nam placeat. Suscipit, doloremque sit sapiente laboriosam 
              temporibus odit distinctio quibusdam sunt quo similique itaque 
              debitis ullam fugiat magni magnam quia libero harum! Nesciunt!
            </p>
            <button type="button" onClick={this.toggleModal}>Закрыть</button>

        </Modal>}
        
        
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
          <p>Всего заметок: {totalTodoCount}</p>
          <p>Выполнено: {completedTodoCount}</p>
        </div>

        <TodoEditor onSubmit={this.addTodo} />

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
