import React, { Component } from 'react';
import InvoiceDetails from './InvoiceDetails';
import ActionHistory from './ActionHistory';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'invoice'
    };
  }

  handleTabClick = (tab) => {
    this.setState({ activeTab: tab });
  };

  render() {
    const { activeTab } = this.state;
    const { data, actionHistory, onUpdate, onDataChange } = this.props;

    return (
      <div className="Tabs">
        <div className="tab-buttons">
          <button onClick={() => this.handleTabClick('invoice')}>Invoice Details</button>
          <button onClick={() => this.handleTabClick('history')}>Action History</button>
        </div>
        <div className="tab-content">
          {activeTab === 'invoice' ? (
            <InvoiceDetails
              data={data}
              onUpdate={onUpdate}
              onDataChange={onDataChange}
            />
          ) : (
            <ActionHistory history={actionHistory} />
          )}
        </div>
      </div>
    );
  }
}

export default Tabs;
