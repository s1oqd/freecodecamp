/**
 * Created by Administrator on 2017/2/19.
 */
var RecipeList=React.createClass({
    getInitialState() {
        return {show: this.props.show}
    },
    handleClick: function() {
        // if(parseInt(this.props.i)!==this.state.show){
        this.setState({
            show:this.props.i
        });
        console.log(this.state.show)
        this.props.callbackParent(this.state.show);
        // }
    },
    render: function() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title" onClick={this.handleClick}>
                        带有 title 的面板标题
                    </h3>
                </div>
                <div className={this.props.i==this.state.show ? "panel-body show":"panel-body"}>
                    这是一个基本的面板
                </div>
            </div>
        )
    }
});
var Recipe=React.createClass({
    getInitialState() {
        return {show: 0}
    },
    onChildChanged: function (newshow) {
        this.setState({
            show: newshow
        });
    },
    render: function() {
        return(
            this.props.date.map(function(c,a){
                return (
                    <div>
                        <RecipeList i={a} show={this.state.show} callbackParent={this.onChildChanged} />
                    </div>
                )
            })
        )

    }

})
ReactDOM.render(
    <Recipe date={[1,2,3]} />,
    document.getElementById("container")
);