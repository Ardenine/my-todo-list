var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodoApp = function (_React$Component) {
    _inherits(TodoApp, _React$Component);

    function TodoApp(props) {
        _classCallCheck(this, TodoApp);

        var _this = _possibleConstructorReturn(this, (TodoApp.__proto__ || Object.getPrototypeOf(TodoApp)).call(this, props));

        _this.state = { items: [], text: '' };

        // `handleChange.bind` is useful to access the value of `this` inside the handler callback
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }

    _createClass(TodoApp, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(TodoList, { items: this.state.items }),
                React.createElement(
                    "form",
                    { onSubmit: this.handleSubmit },
                    React.createElement("input", {
                        id: "new-todo",
                        onChange: this.handleChange,
                        value: this.state.text,
                        placeholder: "New task"
                    }),
                    React.createElement(
                        "button",
                        null,
                        "Add"
                    )
                )
            );
        }
    }, {
        key: "handleChange",
        value: function handleChange(e) {
            this.setState({ text: e.target.value });
        }
    }, {
        key: "handleSubmit",
        value: function handleSubmit(e) {
            e.preventDefault();
            if (!this.state.text.length) {
                return;
            }

            console.log('this.state.text ', this.state.text);
            /* todo alex : remove this line before commit */

            var newTask = new Task({
                id: Date.now(),
                text: this.state.text,
                is_completed: false
            });

            this.setState(function (state) {
                return {
                    items: state.items.concat(newTask),
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

        var _this2 = _possibleConstructorReturn(this, (Task.__proto__ || Object.getPrototypeOf(Task)).call(this, props));

        _this2.state = { id: '', text: '', is_completed: '' };
        return _this2;
    }

    _createClass(Task, [{
        key: "render",
        value: function render() {
            var todo_text = this.props.text;

            if (this.props.is_completed) {
                todo_text = React.createElement(
                    "del",
                    null,
                    " ",
                    todo_text,
                    " "
                );
            }

            return React.createElement(
                "li",
                { key: this.props.id },
                todo_text
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
        key: "render",
        value: function render() {
            return React.createElement(
                "ul",
                null,
                this.props.items.map(function (item) {
                    return React.createElement(Task, { key: item.props.id,
                        id: item.props.id, text: item.props.text, is_completed: item.props.is_completed });
                })
            );
        }
    }]);

    return TodoList;
}(React.Component);

ReactDOM.render(React.createElement(TodoApp, null), document.getElementById('todos-div'));