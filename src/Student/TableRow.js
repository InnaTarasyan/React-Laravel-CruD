import React, { Component } from 'react';
import MyGlobleSetting from './MyGlobleSetting';
import axios from 'axios';


class TableRow extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        let uri = MyGlobleSetting.url + `students/${this.props.object.id}`;
        axios.delete(uri);
    }
    render() {
       return (
           <tr key={this.props.i}>
               <td key={this.props.object.name} data-title="name">{this.props.object.name}</td>
               <td key={this.props.object.email} data-title="email">{this.props.object.email}</td>
               <td key={this.props.object.major} data-title="major">{this.props.object.major}</td>
               <td key={this.props.object.faculty + this.props.i} data-title="faculty">{this.props.object.faculty}</td>
               <td key={this.props.object.country} data-title="faculty">{this.props.object.country}</td>
               <td>
                   <button className="btn btn-success btn-xs btn-detail">Edit</button>
                   <button className="btn btn-danger btn-xs btn-delete">Delete</button>
               </td>
           </tr>
        );
    }
}


export default TableRow;