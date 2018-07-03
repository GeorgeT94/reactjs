
var EditModal = React.createClass({
    getInitialState: function() {
        return {
            firstName: this.props.employee.firstName,
            surname: this.props.employee.surname,
            accountNumber: this.props.employee.accountNumber
        }
    },

    componentWillMount: function() {
        const id = "modal-" + this.props.employee.id;
        this.setState({id: id, dataTarget : "#" + id});

    },
    render: function() {
        return (
            <div>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target={this.state.dataTarget} onClick={this.updateProps}>
                    Edit
                </button>

                <div className="modal fade" id={this.state.id} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="false">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="false">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <EditForm employee={this.props.employee} onClick={this.props.onClick}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" >Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

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

var EditForm = React.createClass({

    getInitialState: function() {
        return {
            firstName: this.props.employee.firstName,
            surname: this.props.employee.surname,
            accountNumber: this.props.employee.accountNumber
        }
    },

    updateState: function(){
      this.state.firstName = this.props.employee.firstName;
      this.state.surname = this.props.employee.surname;
      this.state.accountNumber = this.props.employee.accountNumber
    },

    reRenderParent: function() {
        console.log("render props name : " + this.props.employee.firstName);
        if (typeof this.props.onClick === 'function') {
            this.props.onClick(this.props.employee.firstName, this.props.employee.surname, this.props.employee.accountNumber);
        }
    },

    nameChange: function(e) {
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

        e.preventDefault();
        e.persist();
        self = this


        var data = {
            "firstName": this.state.firstName,
            "surname": this.state.surname,
            "accountNumber": this.state.accountNumber
        }

        if(typeof this.props.employee.id !== "undefined") data.id = this.props.employee.id;

        var jsonData = JSON.stringify(data);
        console.log(jsonData);
        // Submit form via jQuery/AJAX

        var settings = {
            "async": true,
            "crossDomain": true,
            "method": "POST",
            "url": "demo/add",
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
            })
            .fail(function(jqXhr) {
                alert(this.url);
                console.log("data : " + data );
                console.log('failed to register');
            });

    },

    render: function() {
        console.log("rendering .. :  state = " + this.state.employee + " props = " + this.props.employee );
        return (

            <div id="main" className="container">
                <form onSubmit={this.submit}>
                    <div className="form-group">
                        <label for="exampleInputEmail1">First Name</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter First Name" onChange={this.nameChange} val={this.state.firstName} defaultValue={this.props.employee.firstName}/>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Surname</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Surname" onChange={this.surnameChange} val={this.state.surname} defaultValue={this.props.employee.surname}/>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Account Number</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Account Number"  onChange={this.accountNumberChange} val={this.state.accountNumber} defaultValue={this.props.employee.accountNumber}/>
                    </div>
                    <button type="submit" className="btn btn-primary"  reRenderParent={this.props.onClick}>Edit Account</button>
                </form>
            </div>
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

        e.preventDefault();
        e.persist();
        self = this;

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
            "url": "demo/add",
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
                console.log(self.state);
                e.target.reset();
                console.log(self.state);
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
            "url": "http://localhost:8080/demo/delete",
            type: 'DELETE',
            data: JSON.stringify(self.props.employee),
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "c7bb89b4-2b6c-3cdb-cd22-86fdba25c43c"
            },
            "processData": false,
            success: function(result) {
                // self.setState({employees: data._embedded.employees});
            },
            error: function(xhr, ajaxOptions, thrownError) {
                toastr.error(xhr.responseJSON.message);
            }
        });


    },
    reRender: function(firstName , surname, accountNumber){
        console.log("reRender called");
        console.log(firstName);
        this.props.employee.surname = surname;
        this.props.employee.firstName = firstName;
        this.props.employee.accountNumber = accountNumber;
        console.log("firstname : "+ this.props.employee.firstName);
        this.forceUpdate();
    },
    render: function() {
        console.log("rendering - -- - - - employee table-----");
        if(!this.state.delete){
            return (
                    <tr >
                        <td>{this.props.employee.firstName}</td>
                        <td>{this.props.employee.surname}</td>
                        <td>{this.props.employee.accountNumber}</td>
                        <td></td>
                        <td><EditModal employee={this.props.employee} onClick={this.reRender}/></td>
                        <td><button className="btn btn-info btn-danger" onClick={this.handleDelete}>Delete</button></td>
                    </tr>)

        }else{
            return null;
        }

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
            <th>First Name</th>
            <th>Surname</th>
            <th>Account Number</th>
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


ReactDOM.render(
//<EmployeeTable employees={EMPLOYEES} />, document.getElementById('root')
<Body/>, document.getElementById('root')

);

function handleClick(e){
    e.preventDefault();
    ReactDOM.render(
    <App />, document.getElementById("main")
);
};

var App = React.createClass({

    loadEmployeesFromServer: function () {
        var self = this;
        $.ajax({
            url: "http://localhost:8080/demo/all"
        }).then(function (data) {
            self.setState({employees: data});
        });

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
            self.loadEmployeesFromServer();
            this.render();
        }
    },
    render() {
        return ( <EmployeeTable employees={this.state.employees} handler = {this.handler}/> );
    }
});

