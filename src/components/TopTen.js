import React from 'react'

class Currency extends React.Component {
    render() {
        return (
            <div>
                <hr/>
                <div className="currency">
                    {/* <div className="rank">{this.props.rank}:</div> */}
                    <div className="name">{this.props.rank}: {this.props.name}</div>
                    <div className="info">
                        
                        <div className="price"><strong>Current Price:</strong> ${this.props.price}</div>
                        <div className="percent"><strong>24hr Change:</strong> {this.props.oneDayChange}%</div>
                    </div>
                    {/* <div className="oneDayChange"></div> */}
                </div>
            </div>
        )
    }
} 

class TopTen extends React.Component {
    state = {
        currencies: [],
        currentCurrency: 0
    }

    

    // HANDLE VIEW CURRENCY
    handleViewCurrency = event => {
        event.preventDefault();
    }

    // HANDLE ADD TO FAVORITES
    handdleAddToFavorties = event => {
        event.preventDefault();
    }

    // HANDLE FETCH RESULTS
    getTopTenCurrencies = () => {
        console.log('fetch')
        fetch("https://api.coinlore.net/api/tickers/?start=0&limit=10")
            .then(data => data.json(), err => console.log(err))
            .then(parsedData => {
                console.log(parsedData)
                this.setState({currencies: parsedData.data})
            })


    }

    render() {
        return (
            <div className='top10-container'>
                <h2 className="top10">Top 10</h2>
                {this.state.currencies.map(currency => (
                    <Currency
                        key={currency.id}
                        rank={currency.rank}
                        name={currency.name}
                        price={currency.price_usd}
                        oneDayChange={currency.percent_change_24h}
                    />
                ))}
            </div>
        )
    }
    componentDidMount() {
        this.getTopTenCurrencies() 
    }
}

export default TopTen