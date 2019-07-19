import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Todos from './components/Todos';
import Header from './components/layouts/Header';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import axios from 'axios';

import './App.css';

class App extends React.Component {
  state = {
    todos:[
      // {id:uuid.v4(),title:"wake up at 7am",completed:false},
      // {id:uuid.v4(),title:"sleep at 11pm",completed:false}
    ]
  }

  componentDidMount(){
    axios.get("https:/jsonplaceholder.typicode.com/todos?_limit=20")
    .then(res=>this.setState({todos:res.data}))
  }
  //toggle complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map((todo)=>{
      if(todo.id == id){
        todo.completed = !todo.completed
      }
      return todo;
    })
  });  
  }

  //delete todo
  delTodo = (id) =>{
    // [... is a spread operator used to copy the contents

    axios.delete("https:/jsonplaceholder.typicode.com/todos/${id}")
    .then(res=>this.setState({todos: [...this.state.todos.filter(todo=>todo.id !== id)]}));
    

  }

  //add todo
  addTodo = (title)=>{
    console.log(title);
    // const newTodo = {
    //   id:uuid.v4(),
    //   title,
    //   // in es6 no need title:title
    //   completed:false
    // };
    axios.post("https:/jsonplaceholder.typicode.com/todos",{
      title,
      completed:false
    }).then(res=>this.setState({todos:[...this.state.todos,res.data]}));
    
  }
  render(){
    console.log(this.state.todos)
  return (
    <Router>
    <div className="App">
    <div className='container'>
      <Header/>
      <Route exact path="/" render={props=>(
        <React.Fragment>
          <AddTodo addTodo={this.addTodo}/>
          <Todos todos={this.state.todos} 
          markComplete={this.markComplete} 
          delTodo={this.delTodo}/>
        </React.Fragment>
      )} />
      <Route path="/about" component={About}/>
      
    </div>
    </div>
    </Router>
  );
}
}

export default App;
