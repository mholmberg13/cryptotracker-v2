import React from 'react'

let currencyList = [];
let dbPORT = "3005";
let dbbaseURL = 'http://localhost:';
let userId = "";

let copyUsername;
let copyPassword;
let copyCurrencyIds;


class ShowResults extends React.Component {

    state = {
        userId: this.props.userId
    }

    render () {

        console.log(this.props.login)

        return (
            <div className="search-results">
                <h4><span>{this.props.rank}:</span> {this.props.name}</h4>
                <h5><span>Price: </span>{this.props.price}</h5>
                <h5><span>Symbol: </span>{this.props.symbol}</h5>
                { this.props.login ? <button 
                    onClick={() => {
                        this.props.addToFavorites(this.props.id);
                        this.props.clearSearch();
                    }
                }

                >FAVORITE</button> : null }
                <button className="clear" onClick={() => this.props.clearSearch()}>CLEAR</button>
            </div>
        )
    }
}

class SearchBox extends React.Component {
    state = {
        search: "",
        currencies: [],
        searchResults: [],
        isSubmitted: false,
        copyUsername: "",
        copyPassword: "",
        copyCurrencyIds: []
    }

    // SET STATE CURRENCIES
    setIncomingStates = (currencyList) => {
        this.setState({currencies: currencyList})
    }

    // HANDLE SUBMIT
    handleSubmit = event => {
        event.preventDefault();
        for(let i=0;i<currencyList.length;i++){
            if(currencyList[i].name === this.state.search){
                this.setState({searchResults: currencyList[i]})
                this.setState({search: ""})
                this.setState({isSubmitted: true})
                console.log('Search Results:',this.state.searchResults)
            }
        }
    }

    // HANDLE CHANGE
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    // CLEAR SEARCH
    clearSearch = () => {
        this.setState({searchResults: []})
        this.setState({search: ""})
        this.setState({isSubmitted: false})
        console.log(this.state.searchResults)
    }
    


    render() {
        currencyList = this.props.currencies;
        userId = this.props.userId;
        return (
            <div className='search-container'>
                <form onSubmit={this.handleSubmit}>
                    <input
                        className="search"
                        type="text"
                        name="search"
                        id="search"
                        onChange={this.handleChange}
                        value={this.state.search}
                        placeholder=" enter currency name"
                    />
                    <br/>
                    <input className="search-button" type="submit" value="Search"/>
                </form>
                {this.state.isSubmitted ? <ShowResults 
                    label="Search Results"
                    name={this.state.searchResults.name}
                    rank={this.state.searchResults.rank}
                    price={this.state.searchResults.price_usd}
                    symbol={this.state.searchResults.symbol}
                    id={this.state.searchResults.id}
                    clearSearch={this.clearSearch}
                    addToFavorites={this.props.addToFavorites}
                    login={this.props.login}
                /> : null }
            </div>
        )
    }    
}

export default SearchBox