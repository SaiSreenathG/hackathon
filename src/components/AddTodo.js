import React from 'react';

class AddTodo extends React.Component{
    state = {
        title: ' '
    }
    onChange = (e) => this.setState({[e.target.name] : e.target.value});
    onSubmit =(e)=>{
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({title:''});
    }
    render(){
        return(
            <form onSubmit={this.onSubmit} style={{display:'flex'}}>
                <input type='text' name='title' value={this.state.title} onChange={this.onChange} style={{flex:'10',padding:'5'}} placeholder='Add Todo ....'/>
                <input type='submit' className='btn' style={{flex: '1'}} value = 'Submit'/>
             </form>   
        )
    }
}

export default AddTodo;