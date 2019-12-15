import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  // Another way to bind the component inside of component methods:
  // constructor() {
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  // }

  myInput = React.createRef();

  goToStore = event => {
    // 1-stop the form from submitting
    event.preventDefault();
    // 2- get the text from url for storename
    const storeName = this.myInput.current.value;
    // 3- push the name to url
    this.props.history.push(`/store/${storeName}`)
    // => just changes the url and by the change of the url, react renders a different component based on the router. no reloading of the page is happening
  };

  render() {
    console.log(this);
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a store</h2>
        <input type="text" ref={this.myInput} required placeholder="Store Name" defaultValue={getFunName()} />
        <button type='submit'>Visit Store -></button>
      </form>
    )
  }
}

export default StorePicker;

