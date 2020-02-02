var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodoApp = function (_React$Component) {
    _inherits(TodoApp, _React$Component);

    function TodoApp(props) {
        _classCallCheck(this, TodoApp);

        var _this2 = _possibleConstructorReturn(this, (TodoApp.__proto__ || Object.getPrototypeOf(TodoApp)).call(this, props));

        _this2.state = { items: [], text: '' };

        // `handleChange.bind` is useful to access the value of `this` inside the handler callback
        _this2.handleChange = _this2.handleChange.bind(_this2);
        _this2.handleSubmit = _this2.handleSubmit.bind(_this2);
        return _this2;
    }

    _createClass(TodoApp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            console.log('TodoApp|componentDidMount:: ');
            console.log('- this.state:: ', this.state);
            console.log('- this.props:: ', this.props);

            var _this = this;

            $.ajax({
                type: "GET",
                url: "/api-v1/tasks/",
                success: function success(done) {
                    console.log('GET result: ', done);

                    done.results.map(function (task_obj) {

                        _this.setState(function (state) {
                            return {
                                items: state.items.concat(new Task({
                                    id: task_obj.id,
                                    text: task_obj.description,
                                    is_completed: task_obj.is_completed,
                                    new_task: false
                                }))
                            };
                        });
                    });
                },
                error: function error() {
                    alert("There was an error");
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'form',
                    { onSubmit: this.handleSubmit },
                    React.createElement('input', {
                        id: 'new-todo',
                        onChange: this.handleChange,
                        value: this.state.text,
                        placeholder: 'New task'
                    }),
                    React.createElement(
                        'button',
                        null,
                        'Add'
                    )
                ),
                React.createElement(TodoList, { items: this.state.items })
            );
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            this.setState({ text: e.target.value });
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            var _this3 = this;

            e.preventDefault();
            if (!this.state.text.length) {
                return;
            }

            this.setState(function (state) {
                return {
                    items: state.items.concat(new Task({
                        id: Date.now(),
                        text: _this3.state.text,
                        is_completed: false,
                        new_task: true
                    })),
                    text: ''
                };
            });
        }
    }]);

    return TodoApp;
}(React.Component);

var Task = function (_React$Component2) {
    _inherits(Task, _React$Component2);

    function Task(props) {
        _classCallCheck(this, Task);

        var _this4 = _possibleConstructorReturn(this, (Task.__proto__ || Object.getPrototypeOf(Task)).call(this, props));

        _this4.state = { id: '', text: '', is_completed: false, new_task: false };

        _this4.completeTask = _this4.completeTask.bind(_this4);
        _this4.deleteTask = _this4.deleteTask.bind(_this4);
        return _this4;
    }

    _createClass(Task, [{
        key: 'componentDidMount',
        value: function componentDidMount() {

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
                        is_completed: this.props.is_completed
                    },
                    success: function success(done) {
                        console.log('Record created: ', done);
                    },
                    error: function error() {
                        alert("There was an error");
                    }
                });
            }
        }
    }, {
        key: 'completeTask',
        value: function completeTask() {

            $.ajax({
                type: "PUT",
                url: "/api-v1/tasks/" + this.props.id + "/",
                data: {
                    key: this.props.id,
                    description: this.props.text,
                    is_completed: true
                },
                success: function success(done) {
                    console.log('Record updated: ', done);
                },
                error: function error() {
                    alert("There was an error");
                }
            });
        }
    }, {
        key: 'deleteTask',
        value: function deleteTask() {

            $.ajax({
                type: "DELETE",
                url: "/api-v1/tasks/" + this.props.id + "/",
                data: {
                    key: this.props.id,
                    description: this.props.text,
                    is_completed: true
                },
                success: function success(done) {
                    console.log('Record deleted: ', done);
                },
                error: function error() {
                    alert("There was an error");
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var todo_text = this.props.text,
                extra_ops = React.createElement(
                'div',
                { className: 'text-right' },
                React.createElement(
                    'small',
                    { onClick: this.completeTask },
                    'COMPLETE'
                ),
                React.createElement(
                    'span',
                    null,
                    ' | '
                ),
                React.createElement(
                    'small',
                    { onClick: this.deleteTask },
                    'DELETE'
                )
            );

            if (this.props.is_completed) {
                todo_text = React.createElement(
                    'del',
                    null,
                    ' ',
                    todo_text,
                    ' '
                );
                extra_ops = null;
            }

            return React.createElement(
                'div',
                { className: 'border ', key: this.props.id },
                React.createElement(
                    'span',
                    null,
                    todo_text
                ),
                extra_ops
            );
        }
    }]);

    return Task;
}(React.Component);

var TodoList = function (_React$Component3) {
    _inherits(TodoList, _React$Component3);

    function TodoList() {
        _classCallCheck(this, TodoList);

        return _possibleConstructorReturn(this, (TodoList.__proto__ || Object.getPrototypeOf(TodoList)).apply(this, arguments));
    }

    _createClass(TodoList, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.props.items.map(function (item) {
                    return React.createElement(Task, { key: item.props.id,
                        id: item.props.id,
                        text: item.props.text,
                        is_completed: item.props.is_completed,
                        new_task: item.props.new_task
                    });
                })
            );
        }
    }]);

    return TodoList;
}(React.Component);

ReactDOM.render(React.createElement(TodoApp, null), document.getElementById('todos-div'));