import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './actions/userActions';
import TextField from '@material-ui/core/TextField';
import { Divider } from '@material-ui/core';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Todos from './components/Todos';
import Header from './components/layouts/Header';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import axios from 'axios';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  textField: {
    width: '100%'
  },
  button: {
    marginRight: 10
  }
});

class Dashboard extends React.Component {

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

const mapStateToProps = state => ({
  userId: state.user._id
});

export default withRouter(connect(mapStateToProps, { logout })(withStyles(styles)(Dashboard)));