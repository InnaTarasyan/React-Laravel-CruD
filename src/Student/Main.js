import React, { Component } from 'react';
import axios from 'axios';
import MyGlobleSetting from './MyGlobleSetting';
import TableRow from "./TableRow";
import './Main.css'
require('../bootstrap');

class Main extends Component{
    constructor(props) {
        super(props);
        this.state = { value: '',
                       students: '',
                       modalActive: false,
                       update: '',
                       id:'',
                       name: '',
                       email: '',
                       major: '',
                       faculty: '',
                       country: ''};
        this.state.getData = this.getData.bind(this);
    }

    getData(){
        axios.get(MyGlobleSetting.url + 'students')
            .then(response => {
                this.setState({ students: response.data });
                this.forceUpdate();
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidMount(){
       this.getData();
    }

    tabRow() {
        var getData = this.state.getData;
        var openModal = this.openModal;
        var setAppState = this.setAppState;

        if (this.state.students instanceof Array) {
            return this.state.students.map(function (object, i) {
                 return (
                    <TableRow object = {object} i = {i} key= {i} getData = {getData}  openModal = {openModal} setAppState ={setAppState}/>)
            })
        }
    }


    setAppState = (data) => {
        this.setState({
                id: data.id,
                name: data.name,
                email: data.email,
                faculty: data.faculty,
                major: data.major,
                country: data.country,
                update: true
            }, function(){
            console.log(this.state);
        });
    };

    openModal = () => {
        if(!this.state.update){
            this.setState({
                id: '',
                name: '',
                email: '',
                faculty: '',
                major: '',
                country: '',
            })
        }
        this.setState({
            modalActive: true,
        })
    };

    closeModal = () => {
        this.setState({
            modalActive: false,
            update: false
        })
    };

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    };

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    };

    handleFacultyChange = (e) => {
        this.setState({
            faculty: e.target.value
        })
    };

    handleMajorChange = (e) => {
        this.setState({
            major: e.target.value
        })
    };

    handleCountryChange = (e) => {
        this.setState({
            country: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const student = {
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            major: this.state.major,
            faculty: this.state.faculty,
            country: this.state.country
        };

        if(!this.state.update){
            let uri = MyGlobleSetting.url + 'students';
            axios.post(uri, student).then((response) => {
                alert('success');
                this.closeModal();
                this.getData();
            });
        } else {
            let uri = MyGlobleSetting.url + 'students/' + this.state.id;
            console.log(uri);

            axios.post(uri, student )
                .then(() => {
                    this.closeModal();
                    this.getData();
                })
        }
    };


    render(){
        return (
            <div>
                {this.state.modalActive && (
                    <div className='popup'>
                        <div className='popup_inner'>
                            <div className="data">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <h3>Add Student</h3>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group close">
                                                <a title='Close' onClick={this.closeModal}>X</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-10">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="name" name="name"  onChange={this.handleNameChange} value={this.state.name}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-10">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="email" name="email" onChange={this.handleEmailChange} value={this.state.email}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-10">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="major" name="major" onChange={this.handleMajorChange} value={this.state.major}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-10">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="faculty" name="faculty" onChange={this.handleFacultyChange} value={this.state.faculty}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-10">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="country" name="country" onChange={this.handleCountryChange}  value={this.state.country} />
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <button className="btn btn-primary">Add Student</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                <br/>
                <h1 className="center">Students</h1>
                <br />

                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Major</td>
                                <td>Faculty</td>
                                <td>Country</td>
                                <td width="200px">
                                    <button onClick={this.openModal}>Open modal</button>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                          {this.tabRow()}
                        </tbody>
                    </table>
                </div>
            </div>
        )}
}

export default Main;
