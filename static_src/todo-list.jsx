class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items: [], text: ''};

        // `handleChange.bind` is useful to access the value of `this` inside the handler callback
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        console.log('TodoApp|componentDidMount:: ');
        console.log('- this.state:: ', this.state);
        console.log('- this.props:: ', this.props);

        let _this = this;

        $.ajax({
            type: "GET",
            url: "/api-v1/tasks/",
            success: function (done) {
                console.log('GET result: ', done);

                done.results.map(function (task_obj) {

                    _this.setState(state => ({
                        items: state.items.concat(new Task({
                            id: task_obj.id,
                            text: task_obj.description,
                            is_completed: task_obj.is_completed,
                            new_task: false
                        }))
                    }));

                });
            },
            error: function () {
                alert("There was an error");
            }
        });

    }


    render() {
        return (
            <div>
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

                <TodoList items={this.state.items}/>

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

        this.setState(state => ({
            items: state.items.concat(new Task({
                id: Date.now(),
                text: this.state.text,
                is_completed: false,
                new_task: true
            })),
            text: ''
        }));

    }
}


class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {id: '', text: '', is_completed: false, new_task: false};

        this.completeTask = this.completeTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    componentDidMount() {

        console.log('Task|componentDidMount:: ');
        console.log('- this.state:: ', this.state);
        console.log('- this.props:: ', this.props);

        if (this.props.new_task) {

            $.ajax({
                type: "POST",
                url: "/api-v1/tasks/",
                data: {
                    key: this.props.id,
                    description: this.props.text,
                    is_completed: this.props.is_completed,
                },
                success: function (done) {
                    console.log('Record created: ', done);
                },
                error: function () {
                    alert("There was an error");
                }
            });
        }


    }


    completeTask() {

        $.ajax({
            type: "PUT",
            url: "/api-v1/tasks/" + this.props.id + "/",
            data: {
                key: this.props.id,
                description: this.props.text,
                is_completed: true,
            },
            success: function (done) {
                console.log('Record updated: ', done);
            },
            error: function () {
                alert("There was an error");
            }
        });

    }

    deleteTask() {

        $.ajax({
            type: "DELETE",
            url: "/api-v1/tasks/" + this.props.id + "/",
            data: {
                key: this.props.id,
                description: this.props.text,
                is_completed: true,
            },
            success: function (done) {
                console.log('Record deleted: ', done);
            },
            error: function () {
                alert("There was an error");
            }
        });


    }

    render() {
        let todo_text = this.props.text,
            extra_ops = <div className="text-right">
                <small onClick={this.completeTask}>COMPLETE</small>
                <span> | </span>
                <small onClick={this.deleteTask}>DELETE</small>
            </div>;

        if (this.props.is_completed) {
            todo_text = <del> {todo_text} </del>;
            extra_ops = null
        }

        return (
            <div className="border " key={this.props.id}>
                <span>{todo_text}</span>
                {extra_ops}
            </div>
        )
    }

}


class TodoList extends React.Component {
    render() {
        return (
            <div>

                {this.props.items.map(item => (
                    <Task key={item.props.id}
                          id={item.props.id}
                          text={item.props.text}
                          is_completed={item.props.is_completed}
                          new_task={item.props.new_task}
                    />
                ))}

            </div>
        );
    }
}

ReactDOM.render(
    <TodoApp/>,
    document.getElementById('todos-div')
);
