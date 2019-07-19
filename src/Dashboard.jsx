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
    currentTodo: '',
    todos:[
      // {id:uuid.v4(),title:"wake up at 7am",completed:false},
      // {id:uuid.v4(),title:"sleep at 11pm",completed:false}
    ]
  }

  handleLogout = () => {
    this.props.logout();
    this.props.history.push('/');
  }



  async componentWillMount() {
    let res = await fetch(`https://us-central1-voting-app-241814.cloudfunctions.net/TodoList?name=${this.props.userName}`,
    { headers: {
       "Access-Control-Allow-Origin": "*", 
       'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT', 
       "Access-Control-Allow-Credentials": "true" 
      }
    }
    );

    let json = await res.json();
    console.log('jJJJJson', json.data[0]);

    this.setState({todos: json.data[0]});


    // axios.get(`https://us-central1-voting-app-241814.cloudfunctions.net/TodoList?name=${this.props.userName}`, { headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT', "Access-Control-Allow-Credentials": "true" }, })
    //   .then(
    //     res => this.setState(
    //       { 
    //         todos: res.data[0]
    //       }

    //     ))
  }
  //toggle complete
  markComplete = (id) => {
    if(!this.props.userId){
      this.props.history.push('/');
    }
    axios.get("https://us-central1-voting-app-241814.cloudfunctions.net/TodoUpdate?id=${id}",{headers: {"Access-Control-Allow-Origin": "*",'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',"Access-Control-Allow-Credentials": "true"},}).
    then(res=>{this.setState({ todos: this.state.todos.map((todo)=>{
      if(todo._id == id){
        todo.status = !todo.status
      }
      return todo;
    })
  })
  });  
  }

  //delete todo
  delTodo = (id) =>{
    // [... is a spread operator used to copy the contents
    if(!this.props.userId){
      this.props.history.push('/');
    }
    axios.delete("https://us-central1-voting-app-241814.cloudfunctions.net/TodoDelete?id=${id}",{headers: {"Access-Control-Allow-Origin": "*",'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT,DELETE',"Access-Control-Allow-Credentials": "true"},})
    .then(res=>this.setState({todos: [...this.state.todos.filter(todo=>todo._id !== id)]}));
  }

  //add todo
  addTodo = async ()=>{
   
    let desc = this.state.currentTodo;
    //console.log( 'addTodo',  desc);


    let res = await fetch('https://us-central1-voting-app-241814.cloudfunctions.net/TodoSave', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods' : 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
          },
          body: JSON.stringify({
            desc,
            
            name: this.props.userName
          })
        });

        await res.text();


    return false;
   
    
  }
  render(){
    console.log(this.state.todos)
  return (
    <Router>
    <div className="App">
    <div className='container'>
      <Header/>

      {/* <AddTodo addTodo={this.addTodo}/> */}

      <input type='text' name='desc' 
        value={this.state.currentTodo} 
        onChange={e => this.setState({currentTodo: e.target.value})} 
        style={{flex:'10',padding:'5'}} 
        placeholder='Add Todo ....'/>
      <input onClick={this.addTodo} className='btn' style={{flex: '1'}} value = 'Submit'/>



      { (this.state.todos && this.state.todos.length > 0) &&

          <>
          <h1>TODOs</h1>
          <Todos todos={this.state.todos} 
          markComplete={this.markComplete} 
          delTodo={this.delTodo}
          />

          </>
          


      }
      


      {/* <Route exact path="/" render={props=>(
        <React.Fragment>
          <AddTodo addTodo={this.addTodo}/>
          <Todos todos={this.state.todos} 
          markComplete={this.markComplete} 
          delTodo={this.delTodo}/>
        </React.Fragment>
      )} />
       */}
      <Route><Button onClick={this.handleLogout}>Logout</Button></Route>
    </div>
    </div>
    </Router>
  );
}
}

const mapStateToProps = state => ({
  userName: state.user.userName
});

export default withRouter(connect(mapStateToProps, { logout })(withStyles(styles)(Dashboard)));