import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {

  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === 'available';
    // if something returns null nothing will show up. this works so that react doesnt respond with a "Sorry there is no fish" (which is what happens when isAvailable == false). This happens bc this is being called the moment the component is being updated and there is a split second in between when the method is called to set back the information and the call for the database. This can be found in `componentDidUpdate` in `App.js`.
    // fancy-nervous-oases
    // makes sure fish is loaded before we continue
    if(!fish) return null;
    if(!isAvailable){
      return (
      <li key={key}>
        Sorry {fish ? fish.name : 'fish'} is not available
      </li>
      )
    }
    return (
      <li key={key}>
        {count} lbs {fish.name}
        {formatPrice(count * fish.price)}
      </li>
    );
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];

      const isAvailable = fish && fish.status === 'available'

      if(isAvailable) {
        return prevTotal + (count * fish.price)
      }

      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <ul className='order'>
          {orderIds.map(this.renderOrder)}
        </ul>
        Total: <strong>{formatPrice(total)}</strong>
      </div>
      );
    }
  };

  export default Order;
