import React, { Component } from 'react';
import axios from 'axios';
import Tabs from './components/Tabs';
// import ActionHistory from './components/ActionHistory'; // Uncomment if needed
import './styles/styles.css'; // Ensure this path is correct

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      actionHistory: [],
      currentFormData: {
        currency: '',
        invBasicAmt: '',
        invTaxAmt: '',
        totalInvAmt: '',
        advancePaid: '',
        tcsApplicable: '',
        netPayableAmt: ''
      },
      selectedStatus: '' // Initialize selectedStatus state
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get('http://localhost:5000/api/data')
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  handleFormUpdate = (formData) => {
    const { invBasicAmt, invTaxAmt, advancePaid, tcsApplicable } = formData;
    const totalInvAmt = parseFloat(invBasicAmt) + parseFloat(invTaxAmt);
    const netPayableAmt = totalInvAmt - parseFloat(advancePaid);

    this.setState({
      currentFormData: {
        ...formData,
        totalInvAmt,
        netPayableAmt
      }
    });
  };

  handleActionSelect = (action) => {
    this.setState({ selectedStatus: action === 'approve' ? 'Approved' : 'Rejected' });
  };

  handleClick = () => {
    const { currentFormData, selectedStatus } = this.state;

    axios
      .post('http://localhost:5000/api/data', {
        ...currentFormData,
        status: selectedStatus // Ensure 'status' is included
      })
      .then((response) => {
        this.fetchData(); // Refresh data after save
        const { actionHistory } = this.state;
        this.setState({
          actionHistory: [
            ...actionHistory,
            { id: response.data._id, status: selectedStatus }
          ],
          selectedStatus: '' // Reset selectedStatus after saving
        });
      })
      .catch((error) => console.error('Error posting data:', error));
  };
  

  render() {
    const { data, actionHistory, currentFormData } = this.state;

    return (
      <div className="App">
        <div className="top">
          <div className="static-image">
            <img src={`${process.env.PUBLIC_URL}/image.jpg`} alt="Static" />
          </div>
          <div className="components">
            <Tabs
              data={data}
              actionHistory={actionHistory}
              onUpdate={this.handleFormUpdate}
            />
          </div>
        </div>
        <div className="bottom">
          <div className="bottom-row">
            <p> {`Currency: `} <span style={{ color: 'green', fontWeight: 'bold' }}>{currentFormData.currency}</span></p>
            <p> {`Inv Basic Amt: `} <span style={{ color: 'green', fontWeight: 'bold' }}>{currentFormData.invBasicAmt}</span></p>
            <p> {`Inv Tax Amt: `} <span style={{ color: 'green', fontWeight: 'bold' }}>{currentFormData.invTaxAmt}</span></p>
            <p> {`Total Inv Amt: `} <span style={{ color: 'green', fontWeight: 'bold' }}>{currentFormData.totalInvAmt}</span></p>
            <p> {`Advance Paid: `} <span style={{ color: 'green', fontWeight: 'bold' }}>{currentFormData.advancePaid}</span></p>
            <p> {`Net Payable Amt: `} <span style={{ color: 'green', fontWeight: 'bold' }}>{currentFormData.netPayableAmt}</span></p>
            <div className="action-buttons">
              <select onChange={(e) => this.handleActionSelect(e.target.value)}>
              <option value="select action">Select Action</option>
                <option value="approve">Approve</option>
                <option value="reject">Reject</option>
              </select>
              <button className="reject" onClick={this.handleClick}>Reject</button>
              <button className="approve" onClick={this.handleClick}>Approve</button>
            </div>
          </div>
          {/* <ActionHistory history={actionHistory} /> */}
        </div>
      </div>
    );
  }
}

export default App;
