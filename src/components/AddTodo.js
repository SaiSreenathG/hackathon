import React from 'react';

class AddTodo extends React.Component{
    state = {
        desc: ' '
    }
    onChange = (e) => this.setState({[e.target.name] : e.target.value});
    onSubmit =(e)=>{
        e.preventDefault();
        this.props.addTodo(this.state.desc);
        this.setState({desc:''});
    }
    render(){
        return(
                <>
                
                </>
            
        )
    }
}

export default AddTodo;