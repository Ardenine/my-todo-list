class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items: [], text: ''};

        // `handleChange.bind` is useful to access the value of `this` inside the handler callback
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div>
                <TodoList items={this.state.items}/>
                <form onSubmit={this.handleSubmit}>
                    <input
                        id="new-todo"
                        onChange={this.handleChange}
                        value={this.state.text}
                        placeholder="New task"
                    />
                    <button>
                        Add
                    </button>
                </form>
            </div>
        );
    }

    handleChange(e) {
        this.setState({text: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.text.length) {
            return;
        }


        console.log('this.state.text ', this.state.text);
        /* todo alex : remove this line before commit */

        let newTask = new Task({
            id: Date.now(),
            text: this.state.text,
            is_completed: false
        });


        this.setState(state => ({
            items: state.items.concat(newTask),
            text: ''
        }));

    }
}


class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {id: '', text: '', is_completed: ''}
    }

    render() {
        let todo_text = this.props.text;

        if(this.props.is_completed){
            todo_text = <del> {todo_text} </del>

        }

        return (
            <li key={this.props.id}>{todo_text}</li>
        )
    }
}


class TodoList extends React.Component {
    render() {
        return (
            <ul>

                {this.props.items.map(item => (
                    <Task key={item.props.id}
                          id={item.props.id} text={item.props.text} is_completed={item.props.is_completed}/>
                ))}

            </ul>
        );
    }
}

ReactDOM.render(
    <TodoApp/>,
    document.getElementById('todos-div')
);
