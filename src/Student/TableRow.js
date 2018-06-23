import React, { Component } from 'react';
import MyGlobleSetting from './MyGlobleSetting';
import axios from 'axios';

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.getData = this.props.getData.bind(this);
        this.openModal = this.props.openModal.bind(this);
        this.setAppState = this.props.setAppState.bind(this);
    }

    handleDelete = () => {
        let uri = MyGlobleSetting.url + `students/${this.props.object.id}`;
        axios.delete(uri).then(() => {
            alert('success');
            this.getData();
        });
    };

    handleUpdate = () => {
        let uri = MyGlobleSetting.url + `students/${this.props.object.id}`;

        axios.get(uri)
            .then(response => {
                this.setAppState(response.data);
                this.openModal();
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    render() {
       return (
           <tr key={this.props.i}>
               <td key={this.props.object.name} data-title="name">{this.props.object.name}</td>
               <td key={this.props.object.email} data-title="email">{this.props.object.email}</td>
               <td key={this.props.object.major} data-title="major">{this.props.object.major}</td>
               <td key={this.props.object.faculty + this.props.i} data-title="faculty">{this.props.object.faculty}</td>
               <td key={this.props.object.country} data-title="faculty">{this.props.object.country}</td>
               <td>
                   <button className="btn btn-success btn-xs " onClick={this.handleUpdate}>Edit</button>
                   <button className="btn btn-danger btn-xs " onClick={this.handleDelete}>Delete</button>
               </td>
           </tr>
        );
    }
}


export default TableRow;