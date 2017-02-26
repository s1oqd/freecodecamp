/**
 * Created by Administrator on 2017/2/15.
 */
var Th=React.createClass({
    getInitialState: function() {
        return {
            user:this.props.initialUser};
    },
    handleClick: function() {
        this.getUser()
    },
    componentDidMount: function () {
        this.getUser()
    },
    getUser: function() {
        if((this.props.name=="Points in past 30 days"&&this.props.switchs==true)||
            (this.props.name=="All time points"&&this.props.switchs==false)){
            var text = this.props.switchs ? "recent" : 'alltime',text0=!this.props.switchs ? "recent" : 'alltime';
            $("."+text).children('span').remove();
            $("."+text0).append("<span>&#9660;</span>");
            $.get("http://fcctop100.herokuapp.com/api/fccusers/top/"+text, function(result) {
                this.setState({
                    user:result
                });
                this.props.callbackParent(this.state.user);
            }.bind(this));
        }
    },
    render: function() {
        return <th className={this.props.className} onClick={this.handleClick}>{this.props.name}</th>
    }
});
var Leaderboard=React.createClass({
    getInitialState: function() {
        return {switchs: true,user:[]};
    },
    onChildChanged: function (newuser) {
        this.setState({
            user: newuser,
            switchs: !this.state.switchs
        });
    },
    render: function() {
        var i=0;
        return (
            <table className="table table-bordered">
                <thead><tr>
                    <th>#</th>
                    <th>Camper Name</th>
                    <Th  className="recent" name="Points in past 30 days" switchs={this.state.switchs} initialUser={this.state.user} callbackParent={this.onChildChanged}/>
                    <Th className="alltime" name="All time points" switchs={this.state.switchs} initialUser={this.state.user} callbackParent={this.onChildChanged} />
                </tr></thead>
                <tbody>
                {
                    this.state.user.map(function (user) {
                        i++;
                        return <tr>
                            <td>{i}</td>
                            <td><img className="imgs" src={user.img}/>{user.username}</td>
                            <td>{user.recent}</td>
                            <td>{user.alltime}</td>
                        </tr>
                    })
                }
                </tbody>
            </table>
        );
    }
});
ReactDOM.render(
    <Leaderboard />,
    document.getElementById("container")
);





