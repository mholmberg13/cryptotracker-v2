import React from 'react'
import ZingChart from 'zingchart-react';
import Header from './header.js';
import SearchBox from './SearchBox.js';

let dbPORT = "3005";
let dbbaseURL = 'http://localhost:';
let apiIdSearchBaseURL = 'https://api.coinlore.net/api/ticker/?id='

// LIST ITEM COMPONENT
class ListItem extends React.Component {
    render () {
        return (
            <div className="fav">
                <div className="list-item" onClick={() => this.props.func(this.props.index)}>
                    <h3>{this.props.name}</h3>
                </div>
                <button className="delete-item" onClick={() => this.props.deleteItem(this.props.id)}>Delete</button>
            </div>
        )
    }
}

// BARGRAPH COMPONENT
class Bargraph extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        config: {
          type: 'bar',
          'background-color': 'rgba(0, 0, 0, 0.212)',
          plot: {
            'background-color': 'rgba(35, 194, 159, 1)'
          },
          series: [{
            values: this.props.prices
          }],
          "scale-x": {values: this.props.symbols}
        }
      }
    }
    render() {
        return (
            <div>
                <ZingChart data={this.state.config} />
            </div>
        );
    }
  }

// FAVORITES LIST COMPONENT
class Dashboard extends React.Component {
    state = {
        userId: this.props.currentUserId,
        idArr: [],
        favorites: [],
        selectIndex: 0,
        chartSymbols: [],
        chartPrices: []
    }

    // HANDLE CREATE FAVORITES LIST
    handleCreateFavoritesList = (favorite) => {

        // get incoming values
        let favoriteVal = favorite[0];
        let priceVal = Number(favorite[0].price_usd); 
        let symbolVal = favorite[0].symbol;
        // copy state arrays
        const copyFavorites = [...this.state.favorites];
        const copyChartPrices = [...this.state.chartPrices]
        const copyChartSymbols = [...this.state.chartSymbols]

        // add value to the copied array
        copyFavorites.push(favoriteVal)
        copyChartPrices.unshift(priceVal)
        copyChartSymbols.unshift(symbolVal)
        // set new states
        this.setState({
            favorites: copyFavorites
        })
        this.setState({
            chartPrices: copyChartPrices
        })
        this.setState({
            chartSymbols: copyChartSymbols
        })
    }

    // GET FAVORITES FROM API
    getFavoritesFromApi = (idArr) => {
        for(let i=0;i<idArr.length;i++){
            fetch(apiIdSearchBaseURL + idArr[i])
                .then(data => data.json(), err => console.log(err))
                .then(parsedData => {
                    this.handleCreateFavoritesList(parsedData);
                })
        }
    }
    
    // GET FAVORITES FROM DATABASE
    getFavoritesList = () => {
        this.setState({favorites:[]})
        fetch(dbbaseURL + dbPORT + '/crypto/' + this.state.userId)      
            .then(data => data.json(), err => console.log(err))
            .then(parsedData => {
                this.getFavoritesFromApi(parsedData.currencyIds)
                this.setState({idArr: parsedData.currencyIds})
            })
    }

    // SHOW DATA FROM FAVORITES LIST
    showData = index => {
        this.setState({selectIndex: index});
    }

    pushToFavorites = (copyUsername, copyPassword, copyCurrencyIds) => {
        fetch(dbbaseURL + dbPORT + '/crypto/' + this.state.userId, {
            method: 'PUT',
            body: JSON.stringify({
                username: copyUsername,
                password: copyPassword,
                currencyIds: copyCurrencyIds
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(resJson => {
            console.log('response: ',resJson);
            this.setState({chartPrices:[]})
            this.setState({chartSymbols:[]})
            this.setState({idArr: copyCurrencyIds})
            this.getFavoritesList();
        })
    }
  
    // GET FAVORITES FROM DATABASE
    addToFavorites = (id) => {
      fetch(dbbaseURL + dbPORT + '/crypto/' + this.state.userId)      
          .then(data => data.json(), err => console.log(err))
          .then(parsedData => {
              console.log('parsedData',parsedData);
              const copyUsername = parsedData.username;
              const copyPassword = parsedData.password;
              const copyCurrencyIds = parsedData.currencyIds;
              copyCurrencyIds.unshift(id)
              console.log(this.state.copyCurrencyIds)
              this.pushToFavorites(copyUsername, copyPassword, copyCurrencyIds)
          }) 
    }
 
    // DELETE LIST ITE
    deleteItem = id => {
        let tempArr = [];
        for(let i=0;i<this.state.idArr.length;i++){
            if(this.state.idArr[i] !== id){
                tempArr.push(this.state.idArr[i])
            }
        }
        // push update to database
        fetch(dbbaseURL + dbPORT + '/crypto/' + this.state.userId)
            .then(data => data.json(), err => console.log(err))
            .then(parsedData => {
                console.log('parsedData',parsedData);
                const copyUsername = parsedData.username;
                const copyPassword = parsedData.password;
                this.pushToFavorites(copyUsername, copyPassword, tempArr)
            }) 

    }

    // DELETE USER
    deleteUser = () => {
        fetch(dbbaseURL + dbPORT + '/crypto/' + this.state.userId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(resJson => {
            console.log('response: ',resJson);
        })
        this.props.handleLogOut();
    }

    render () {
        let name = "";
        let rank = "";
        let price = "";
        let symbol = "";
        let idLength = this.state.idArr.length;
        let pricesLength = this.state.chartPrices.length;
        let symbolsLength = this.state.chartSymbols.length;
        let bargraph;

        let login = this.props.login;

        // DISPLAY CONDITIONALS
        if((pricesLength > 0)&&(pricesLength === idLength)){
            if(symbolsLength === idLength){
                name = this.state.favorites[this.state.selectIndex].name;
                rank = this.state.favorites[this.state.selectIndex].rank;
                price = this.state.favorites[this.state.selectIndex].price_usd;
                symbol = this.state.favorites[this.state.selectIndex].symbol;
                bargraph = <Bargraph prices={this.state.chartPrices} symbols={this.state.chartSymbols} />
            }
        } else {
            name = ""
            rank = "-"
            price = "-"
            symbol = "-"
            bargraph = <div></div>
        }


        return (
            <div className="page-container">
                <div className="landing-container">
                    <Header 
                        login={this.props.login}
                        handleLogOut={this.props.handleLogOut}
                    />
                    <div className="content-container">
                        <div className="left-content">
                            <div className="account-container">
                                
                                <div className="account">
                                    <h3>Manage Account</h3>
                                    <button onClick={this.deleteUser}>Delete Account</button>
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="dash-top">
                                <div className='username'>
                                    <h2>{this.props.currentUser}</h2>
                                </div>
                                <SearchBox 
                                    currencies={this.props.currencies}
                                    clearSearch={this.props.clearSearch}
                                    userId={this.state.userId}
                                    addToFavorites={this.addToFavorites}
                                    login={login}
                                />
                            </div>
                            <div className="dash-middle">
                                <div className="display">
                                    <h4>{name}</h4>
                                    <h5><strong>Rank: </strong>{rank}</h5>
                                    <h5><strong>Price: </strong>{price}</h5>
                                    <h5><strong>Symbol: </strong>{symbol}</h5>
                                </div>
                                <div className="favorites-list">
                                    {this.state.favorites.map((favorite,index)=> (
                                        <ListItem
                                            key={index}
                                            name={favorite.name}
                                            symbol={favorite.symbol}
                                            index={index}
                                            func={this.showData}
                                            deleteItem={this.deleteItem}
                                            id={favorite.id}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="bargraph">
                                    {bargraph}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } 
    componentDidMount() {
        this.getFavoritesList();
    }
}
export default Dashboard