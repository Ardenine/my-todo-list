class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        // Triggered only when the Clock component is removed from the DOM
        clearInterval(this.timerID);
    }

    tick() {
        // this.setState({
        //     date: new Date()
        // });

        this.setState(() => ({date: new Date()}));
    }

    render() {
        return (
            <h6 className="float-right">{this.state.date.toLocaleTimeString()}.</h6>
        )
    }
}


const element = (
    <small>
        <h6>JUST ANOTHER TODO MVC!</h6>
        <Clock/>
    </small>
);
ReactDOM.render(element, document.getElementById('footer-text'));
