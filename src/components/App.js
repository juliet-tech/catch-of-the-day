import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import fishes from '../sample-fishes';
import Fish from './Fish';
// import firebase from 'firebase/firebase-app';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    const { params } = this.props.match;
    // first we have to reinstate local storage so that order is stored
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef)})
    }

    // ref in firebase are reference to a piece  of data in firebase
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }
  componentDidUpdate() {
    // console.log()
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // How to always update a piece of state
    // Take a copy of the existing state: you never want to reach into state and actually modify it directly -> mutation - when you reach directly into an obj which causes issues with performance and thing supdating ourt of order
    const fishes = {...this.state.fishes} // copy of everything that is in state.
    // Add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // put that new updated state into state
    this.setState({
      fishes: fishes
    })
  };

  loadSampleFishes = () => {
    this.setState({ fishes });
  };

  addToOrder = key => {
    // 1. tke a copy of state
    const order = { ...this.state.order };
    // 2. either add to the order, or update the number in our order if order already exists
    order[key] = order[key] + 1 || 1;
    // 3. call setstate to update our state object
    this.setState({ order })
  };

  updateFish = (key, updatedFish) => {
    // 1. take a copy of the current fish
    const fish = { ...this.state.fishes }
    // 2 Update that state
    fishes[key] = updatedFish;
    // 3 set that to state
    this.setState({ fishes: fishes })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline='Wes is Cool' />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => <Fish key={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} index={key} />) }
          </ul>
        </div>
        <div className="orders">
          <h3>Order</h3>
          <Order fishes={this.state.fishes} order={this.state.order} />
        </div>
        <Inventory addFish={this.addFish} updateFish={this.updateFish} loadSampleFishes={this.loadSampleFishes} fishes={this.state.fishes} />
      </div>
    )
  }
}

export default App;