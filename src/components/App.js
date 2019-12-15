import React from 'react';
// import StorePicker from './StorePicker';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

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

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline='Wes is Cool' age={500} cool={true} />
          <Header tagline='Jules is Cool' age={500} cool={true} />
        </div>
        <Order></Order>
        <Inventory addFish={this.addFish} />
      </div>
    )
  }
}

export default App;