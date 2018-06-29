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
    getInitialState: function() {
        return {}
    },

    nameChange: function(e) {
        console.log("state of name changed");
        this.setState({
            firstName: e.target.value
        })
    },
    surnameChange: function(e) {
        this.setState({
            surname: e.target.value
        })
    },
    accountNumberChange: function(e) {
        this.setState({
            accountNumber: parseInt(e.target.value)
        })
    },


    submit: function (e){
        var self

        e.preventDefault()
        self = this

        console.log(this.state);

        var data = {
            "firstName": this.state.firstName,
           "surname": this.state.surname,
            "accountNumber": this.state.accountNumber
        }
        var jsonData = JSON.stringify(data);
        console.log(jsonData);
        // Submit form via jQuery/AJAX

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "/addAccount",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "7583589c-5a8a-9fa1-a6c1-cce43c23293d"
            },
            "processData": false,
            "data": jsonData
        }

        $.ajax(settings)
            .done(function(data) {
                console.log(response)
            })
            .fail(function(jqXhr) {
                alert(this.url);
                console.log("data : " + data );
                console.log('failed to register');
            });

    },

    render: function() {
        return (

            <div id="main" className="container">
            <form onSubmit={this.submit}>
            <div className="form-group">
            <label for="exampleInputEmail1">First Name</label>
        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter First Name" onChange={this.nameChange} val={this.state.firstName} />
            </div>
            <div className="form-group">
            <label for="exampleInputPassword1">Surname</label>
            <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Surname" onChange={this.surnameChange} val={this.state.surname} />
            </div>
            <div className="form-group">
            <label for="exampleInputPassword1">Account Number</label>
        <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Account Number" onChange={this.accountNumberChange} val={this.state.accountNumber} />
            </div>
            <button type="submit" className="btn btn-primary"  >Add Account</button>
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
        this.setState({ delete: true });
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

        // ReactDOM.render(
        //     <App  /> , document.getElementById("main")
        // );
    },
    render: function() {
        console.log("employee render");
        if(!this.state.delete){
            return (

                <tr >
                    <td>{this.props.employee.firstName}</td>
                    <td>{this.props.employee.surname}</td>
                    <td>{this.props.employee.accountNumber}</td>
                    <td>
                        <button className="btn btn-info" onClick={this.handleDelete}>Delete</button>
                    </td>
                </tr>);
        }else{
            return null;
        }

    }

});

var EmployeeTable = React.createClass({

    render: function() {
        console.log("table render")
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
        console.log("app.loademployees");


    },

    getInitialState: function () {
        return {employees: []};
    },

    componentDidMount: function () {
        this.loadEmployeesFromServer();
    },
    componentWillMount : function (){
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

