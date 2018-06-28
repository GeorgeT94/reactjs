var NavBar = React.createClass({
    handleAdd() {
        ReactDOM.render(
            <AddForm />, document.getElementById("main")
        );
    },
    render: function() {
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">AccountApp</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
            <a className="nav-item nav-link active" href="#">DashBoard <span className="sr-only">(current)</span></a>
        <a className="nav-item nav-link" href="#" onClick={this.handleAdd}>Add Account</a>
        <a className="nav-item nav-link" href="#"  onClick={(e) => handleClick(e)}>Get Accounts</a>
        </div>
        </div>
        </nav>
    );
    }
});

var AddForm = React.createClass({


    handleAdd() {
        $.post("",
            {
                firstName: "Donald Duck",
                surname: "Duckburg",
                accountNumber: 1000,
            },
            function(data, status){
                alert("Data: " + data + "\nStatus: " + status);
            });
    },

    render: function() {
        return (

            <div id="main" className="container">
            <form>
            <div className="form-group">
            <label for="exampleInputEmail1">First Name</label>
        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter First Name" />
            </div>
            <div className="form-group">
            <label for="exampleInputPassword1">Surname</label>
            <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Surname" />
            </div>
            <div className="form-group">
            <label for="exampleInputPassword1">Account Number</label>
        <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Account Number" />
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.handleAdd} >Add Account</button>
            </form>
            </div>
    );
    }
});

var accountsTable = React.createClass({
    render: function(){
        return(
            <tr>
            <td>{this.props.employee.name}</td>
        <td>{this.props.employee.age}</td>
        <td>{this.props.employee.years}</td>
        </tr>);

    }
});
var Employee = React.createClass({

    getInitialState: function() {
        return {display: true };
    },
    handleDelete() {
        var self = this;
        $.ajax({
            url: self.props.employee._links.self.href,
            type: 'DELETE',
            success: function(result) {
                // self.setState({employees: data._embedded.employees});
                $.ajax({
                    url: "http://localhost:8080/api/employees"
                }).then(function (data) {
                    self.setState({employees: data._embedded.employees});
                });
            },
            error: function(xhr, ajaxOptions, thrownError) {
                toastr.error(xhr.responseJSON.message);
            }
        });

        ReactDOM.render(
            <App  /> , document.getElementById("main")
        );
    },
    render: function() {
        return (
            <tr>
                <td>{this.props.employee.firstName}</td>
                <td>{this.props.employee.surname}</td>
                <td>{this.props.employee.accountNumber}</td>
                <td>
                    <button className="btn btn-info" onClick={this.handleDelete}>Delete</button>
                </td>
            </tr>);
    }

});

var EmployeeTable = React.createClass({
    render: function() {
        var rows = [];
        this.props.employees.forEach(function(employee) {
            rows.push(<Employee employee={employee} />);
        });
        return (
            <div className="container">
            <table className="table table-striped">
            <thead>
            <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Years</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
            </table>
            </div>);
    },

});

var Body = React.createClass({
    render:  function(){
        return (
            <div id="body">
            <NavBar />
            <AddForm />
            </div>);
    }
})


var EMPLOYEES = [
    {firstName: 'Joe', surname: 'Biden', accountNumber: 5},
    {firstName: 'Joe', surname: 'Biden', accountNumber: 5},
    {firstName: 'Joe', surname: 'Biden', accountNumber: 5},
    {firstName: 'Joe', surname: 'Biden', accountNumber: 5},

];

ReactDOM.render(
//<EmployeeTable employees={EMPLOYEES} />, document.getElementById('root')
<Body/>, document.getElementById('root')

);

function handleClick(e){
    e.preventDefault();
    console.log("this button has been pressed");
    ReactDOM.render(
    <App />, document.getElementById("main")
);
};

var App = React.createClass({

    loadEmployeesFromServer: function () {
        var self = this;
        $.ajax({
            url: "http://localhost:8080/api/employees"
        }).then(function (data) {
            self.setState({employees: data._embedded.employees});
        });
        console.log("app.loademployees")
    },

    getInitialState: function () {
        return {employees: []};
    },

    componentDidMount: function () {
        this.loadEmployeesFromServer();
    },
    statics: {
        update: function () {
            console.log("bacon!!!!");
            self.loadEmployeesFromServer();
            this.render();
        }
    },
    render() {
        //this.loadEmployeesFromServer();
        console.log("app.render");
        return ( <EmployeeTable employees={this.state.employees}/> );
    }
});

