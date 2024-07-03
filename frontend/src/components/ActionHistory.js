import React, { Component } from 'react';
import axios from 'axios';
import '../styles/styles.css'; // Make sure to create this CSS file

class ActionHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: []
    };
  }

  componentDidMount() {
    this.fetchHistory();
  }

  fetchHistory = () => {
    axios
      .get('http://localhost:5000/api/data') // Ensure this endpoint matches your backend
      .then((response) => {
        this.setState({ history: response.data });
      })
      .catch((error) => console.error('Error fetching history:', error));
  };

  render() {
    const { history } = this.state;

    return (
      <div className="ActionHistory">
        <h2>Action History</h2>
        <div className="history-list">
          {history.map((item) => (
            <div key={item._id} className="history-card">
              <div className='history-card-1'>
                <div className='history-card-11'>
                  <p><span style={{ color: '#031359', fontWeight: 'bold' }}>{item.alternatePayee1} -</span></p>
                  <p><span style={{ color: '#031359', fontWeight: 'bold' }}>{item.city}, {item.country}</span></p>
                </div>
                <div className='history-card-12'>
                <p className={`status-${item.status.toLowerCase()}`}>{item.status}</p>
                </div>
                
              </div>
              <div className='history-card-2'>
                <div className='history-card-21'>
                <p><span style={{ color: '#5a5c5a' }}>Bank Acc No: </span><span style={{ color: '#0329a6' }}>{item.bankAccNo}</span></p>
                <p><span style={{ color: '#5a5c5a' }}>Bank IFSC Code : </span><span style={{ color: '#0329a6' }}>{item.bankKey}</span></p>
                <p><span style={{ color: '#5a5c5a' }}>Reference Number : </span><span style={{ color: '#0329a6' }}>{item.referenceNumber}</span></p>
                </div>
                <div className='history-card-22'>
                <p><span style={{ color: '#5a5c5a' }}>Advance Amount Paid : </span><span style={{ color: '#149403', fontWeight: 'bold' }}>{item.advancePaid}</span></p>
                <p><span style={{ color: '#5a5c5a' }}>Net Amount : </span><span style={{ color: '#149403', fontWeight: 'bold' }}>{item.netPayableAmt}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ActionHistory;
