/**
 * Created by Administrator on 2017/2/15.
 */
var Textarea = React.createClass({
    getInitialState: function() {
        return {value: '# Hello,word!'};
    },
    handleChange: function(event) {
        this.setState({value: event.target.value});
    },
    rawMarkup: function(value) {
        var rawMarkup = marked(value);
        return { __html: rawMarkup };
    },
    render: function () {
        var value = this.state.value;
        return (
            <div className="row">
                <div className="col-md-6">
                    <textarea rows="20" className="form-control" type="text" value={value} onChange={this.handleChange} /></div>
                <div className="col-md-6">
                    <span dangerouslySetInnerHTML={this.rawMarkup(value)} /></div>
            </div>
        );
    }
});

ReactDOM.render(<Textarea />, document.getElementById("container"));



