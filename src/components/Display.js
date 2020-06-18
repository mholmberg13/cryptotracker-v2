import React from 'react'

class CurrencyInfo extends React.Component {
  render () {
    return (
      <>
        <div className="display">
            <h3>Display</h3>
            <h4>{this.props.currency.name}</h4>
            <h6><span>Rank:</span> {this.props.currency.rank}</h6>
            <h6><span>Price:</span> {this.props.currency.price}</h6>
            <h6><span>Symbol:</span>{this.props.currency.symbol}</h6>
       </div>
      </>
    )
  }
 }
export default CurrencyInfo