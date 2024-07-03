import React, { Component } from 'react';

class InvoiceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      section1Open: true,
      section2Open: true,
      section3Open: true,
      currency: '',
      invBasicAmt: '',
      invTaxAmt: '',
      advancePaid: '',
      tcsApplicable: 'No',
      netPayableAmt: '',
      alternatePayee1: '',
      alternatePayee2: '',
      city: '',
      street: '',
      country: '',
      bankKey: '',
      bankAccNo: '',
      referenceNumber: '',
      lineItems: [] // Array to hold line item details
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      this.calculateNetPayableAmt();
      this.props.onUpdate(this.state); // Send updated state to parent component
    });
  };

  handleCheckboxChange = (index) => {
    const lineItems = [...this.state.lineItems];
    lineItems[index].selected = !lineItems[index].selected;
    this.setState({ lineItems });
  };

  handleDropdownChange = (index, value) => {
    const lineItems = [...this.state.lineItems];
    lineItems[index].type = value;
    this.setState({ lineItems });
  };

  handleTextChange = (index, event) => {
    const { name, value } = event.target;
    const lineItems = [...this.state.lineItems];
    lineItems[index][name] = value;
    this.setState({ lineItems });
  };

  toggleSection = (section) => {
    this.setState((prevState) => ({ [section]: !prevState[section] }));
  };

  addLineItem = () => {
    const newLineItem = { selected: false, type: 'Credit', description: '', amount: '' };
    this.setState((prevState) => ({
      lineItems: [...prevState.lineItems, newLineItem]
    }));
  };

  removeLineItem = (index) => {
    const lineItems = [...this.state.lineItems];
    lineItems.splice(index, 1);
    this.setState({ lineItems });
  };

  calculateNetPayableAmt = () => {
    const { invBasicAmt, invTaxAmt } = this.state;
    const totalInvAmt = parseFloat(invBasicAmt) + parseFloat(invTaxAmt);
    const netPayableAmt = totalInvAmt - parseFloat(this.state.advancePaid);
    this.setState({ netPayableAmt });
  };

  render() {
    const {
      section1Open,
      section2Open,
      section3Open,
      currency,
      invBasicAmt,
      invTaxAmt,
      advancePaid,
      tcsApplicable,
      netPayableAmt,
      alternatePayee1,
      alternatePayee2,
      city,
      street,
      country,
      bankKey,
      bankAccNo,
      referenceNumber,
      lineItems
    } = this.state;

    return (
      <div className="InvoiceDetails">
        <div className={`section ${section1Open ? 'open' : 'closed'}`}>
          <div className="section-header" onClick={() => this.toggleSection('section1Open')}>
            INVOICE AMOUNT DETAILS
          </div>
          {section1Open && (
            <div className="section-content">
              <div className='sections-contents'>
                <label>Currency:</label>
                <input type="text" name="currency" value={currency} onChange={this.handleInputChange} />
              </div>
              <div className='sections-contents'>
                <label>Inv Basic Amt:</label>
                <input type="number" name="invBasicAmt" value={invBasicAmt} onChange={this.handleInputChange} />
              </div>
              <div className='sections-contents'>
                <label>Inv Tax Amt:</label>
                <input type="number" name="invTaxAmt" value={invTaxAmt} onChange={this.handleInputChange} />
              </div>
              <div className='sections-contents'>
                <label>Advance Paid:</label>
                <input type="number" name="advancePaid" value={advancePaid} onChange={this.handleInputChange} />
              </div>
              <div className='sections-contents'>
                <label>TCS Applicable:</label>
                <label>
                  <input type="radio" name="tcsApplicable" value="Yes" checked={tcsApplicable === 'Yes'} onChange={this.handleInputChange} /> Yes
                </label>
                <label>
                  <input type="radio" name="tcsApplicable" value="No" checked={tcsApplicable === 'No'} onChange={this.handleInputChange} /> No
                </label>
              </div>
              <div className='sections-contents'>
                <label>Net Payable Amt:</label>
                <input type="number" name="netPayableAmt" value={netPayableAmt} readOnly />
              </div>
            </div>
          )}
        </div>
        <div className={`section ${section2Open ? 'open' : 'closed'}`}>
          <div className="section-header" onClick={() => this.toggleSection('section2Open')}>
            ALTERNATIVE PAYEE DETAILS
          </div>
          {section2Open && (
            <div className="section-content">
              <div className='sections-contents'>
                <label>Alternate Payee 1:</label>
                <input type="text" name="alternatePayee1" value={alternatePayee1} onChange={this.handleInputChange} />
              </div>
              <div className='sections-contents'>
                <label>Alternate Payee 2:</label>
                <input type="text" name="alternatePayee2" value={alternatePayee2} onChange={this.handleInputChange} />
              </div>
              <div className='sections-contents'>
                <label>City:</label>
                <input type="text" name="city" value={city} onChange={this.handleInputChange} />
              </div>
              <div className='sections-contents'>
                <label>Street:</label>
                <input type="text" name="street" value={street} onChange={this.handleInputChange} />
              </div>
              <div className='sections-contents'>
                <label>Country:</label>
                <input type="text" name="country" value={country} onChange={this.handleInputChange} />
              </div>
              <div className='sections-contents'>
                <label>Bank Key:</label>
                <input type="text" name="bankKey" value={bankKey} onChange={this.handleInputChange} />
              </div>
              <div className='sections-contents'>
                <label>Bank Acc No:</label>
                <input type="text" name="bankAccNo" value={bankAccNo} onChange={this.handleInputChange} />
              </div>
              <div className='sections-contents'>
                <label>Reference Number:</label>
                <input type="text" name="referenceNumber" value={referenceNumber} onChange={this.handleInputChange} />
              </div>
            </div>
          )}
        </div>
        <div className={`section ${section3Open ? 'open' : 'closed'}`}>
          <div className="section-header" onClick={() => this.toggleSection('section3Open')}>
            LINE ITEM DETAILS
          </div>
          {section3Open && (
            <div className="section-content">
              <table>
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Card</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          checked={item.selected}
                          onChange={() => this.handleCheckboxChange(index)}
                        />
                      </td>
                      <td>
                        <select value={item.type} onChange={(e) => this.handleDropdownChange(index, e.target.value)}>
                          <option value="Credit">Credit</option>
                          <option value="Debit">Debit</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          name="description"
                          value={item.description}
                          onChange={(e) => this.handleTextChange(index, e)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="amount"
                          value={item.amount}
                          onChange={(e) => this.handleTextChange(index, e)}
                        />
                      </td>
                      <td>
                        <button onClick={() => this.removeLineItem(index)}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={this.addLineItem}>Add Line Item</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default InvoiceDetails;
