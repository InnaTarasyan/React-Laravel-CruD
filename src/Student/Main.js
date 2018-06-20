import React, { Component } from 'react';
import axios from 'axios';
import MyGlobleSetting from './MyGlobleSetting';
import TableRow from "./TableRow";
import './Main.css'
require('../bootstrap');

class Main extends Component{
    constructor(props) {
        super(props);
        this.state = {value: '', students: '', modalActive: false, name: '', email: '', major: '', faculty: '', country: ''};

    }

    getData(){
        axios.get(MyGlobleSetting.url + 'students')
            .then(response => {
                this.setState({ students: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidMount(){
       this.getData();
    }

    tabRow() {
        if (this.state.students instanceof Array) {
            return this.state.students.map(function (object, i) {
                 return (
                    <TableRow object = {object} i = {i} key= {i}/>)
            })
        }
    }


    openModal = () => {
        this.setState({ modalActive: true })
    };

    closeModal = () => {
        this.setState({ modalActive: false })
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
            name: this.state.name,
            email: this.state.email,
            major: this.state.major,
            faculty: this.state.faculty,
            country: this.state.country
        };

        let uri = MyGlobleSetting.url + 'students';
        axios.post(uri, student).then((response) => {
            alert('success');
            this.closeModal();
            this.getData();
            this.forceUpdate();
        });
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
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="name" name="name"  onChange={this.handleNameChange}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="email" name="email" onChange={this.handleEmailChange}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="major" name="major" onChange={this.handleMajorChange}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="faculty" name="faculty" onChange={this.handleFacultyChange}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="country" name="country" onChange={this.handleCountryChange}/>
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
