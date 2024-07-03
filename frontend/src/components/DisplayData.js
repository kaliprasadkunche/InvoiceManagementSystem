import React, { Component } from 'react';
import axios from 'axios';

class DisplayData extends Component {
  handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/data/${id}`)
      .then(() => {
        this.props.onDataChange();
        this.props.addActionToHistory('Data Deleted');
      })
      .catch(error => console.error('Error deleting data:', error));
  }

  handleEdit = (id, updatedData) => {
    axios.put(`http://localhost:5000/api/data/${id}`, updatedData)
      .then(() => {
        this.props.onDataChange();
        this.props.addActionToHistory('Data Updated');
      })
      .catch(error => console.error('Error updating data:', error));
  }

  render() {
    const { data } = this.props;

    return (
      <div>
        <h2>Submitted Data</h2>
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Inv Basic Amt</th>
              <th>Inv Tax Amt</th>
              <th>Total Inv Amt</th>
              <th>Advance Paid</th>
              <th>TCS Applicable</th>
              <th>Net Payable Amt</th>
              <th>Alternate Payee 1</th>
              <th>Alternate Payee 2</th>
              <th>City</th>
              <th>Street</th>
              <th>Country</th>
              <th>Bank Key</th>
              <th>GRank Aon No</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.currency}</td>
                <td>{item.invBasicAmt}</td>
                <td>{item.invTaxAmt}</td>
                <td>{item.totalInvAmt}</td>
                <td>{item.advancePaid}</td>
                <td>{item.tcsApplicable}</td>
                <td>{item.netPayableAmt}</td>
                <td>{item.alternatePayee1}</td>
                <td>{item.alternatePayee2}</td>
                <td>{item.city}</td>
                <td>{item.street}</td>
                <td>{item.country}</td>
                <td>{item.bankKey}</td>
                <td>{item.grankAonNo}</td>
                <td><button onClick={() => this.handleEdit(item._id, item)}>Edit</button></td>
                <td><button onClick={() => this.handleDelete(item._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DisplayData;
