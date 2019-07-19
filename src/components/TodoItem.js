import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
    getStyle = () =>{
        // ******* one way to do this*****
        // if(this.props.todo.completed){ return{textDecoration:'line-through'}     
        // }else{ return{textDecoration:'none'} }
        // ******* second way to do this*****  
        return {
            backgroundColor : '#f4f4f4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration : this.props.todo.completed?
            'line-through' : 'none'
        } 
        
    }
    // markComplete = (e)=>{
    //    console.log(this.props)
    // }
    render() {
        const {id,title} = this.props.todo
        return (
            // <div style={{ backgroundColor: '#f4f4f4'}}>
            // <div style={itemStyle}>
            <div style={this.getStyle()}>
               <p>
                   {/* this.markComplete.bind(this) or arrow function */}
                <input type="checkbox" onChange={this.props.markComplete.bind(this,id)}/> {'  '}
               {title}
               <button onClick={this.props.delTodo.bind(this,id)} style ={btnStyle}>x</button>
               </p> 
            </div>
        );
    }
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    delTodo:PropTypes.func.isRequired,
    markComplete:PropTypes.func.isRequired
}

// const itemStyle = {
//     backgroundColor: '#f4f4f4'
// }
const btnStyle = {
    background: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '50%',
    float: 'right'

    
}

export default TodoItem;