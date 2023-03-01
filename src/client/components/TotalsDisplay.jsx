import React from 'react';

const TotalsDisplay = props => (

  <div className="innerbox" id="totals">
    <label htmlFor="totalApps">Total Apps:</label>
    <span id="totalApps">{props.totalApps}</span>
  </div>

);
export default TotalsDisplay;