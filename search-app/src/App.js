import React, { Component } from "react";

class App extends Component {
  state = {
    readyToSubmit: null,
    data: [
      89,
      30,
      25,
      32,
      72,
      70,
      51,
      42,
      25,
      24,
      53,
      55,
      78,
      50,
      13,
      40,
      48,
      32,
      26,
      2,
      14,
      33,
      45,
      72,
      56,
      44,
      21,
      88,
      27,
      68,
      15,
      62,
      93,
      98,
      73,
      28,
      16,
      46,
      87,
      28,
      65,
      38,
      67,
      16,
      85,
      63,
      23,
      69,
      64,
      91,
      9,
      70,
      81,
      27,
      97,
      82,
      6,
      88,
      3,
      7,
      46,
      13,
      11,
      64,
      76,
      31,
      26,
      38,
      28,
      13,
      17,
      69,
      90,
      1,
      6,
      7,
      64,
      43,
      9,
      73,
      80,
      98,
      46,
      27,
      22,
      87,
      49,
      83,
      6,
      39,
      42,
      51,
      54,
      84,
      34,
      53,
      78,
      40,
      14,
      5
    ]
  };

  sortNumbers(a, b) {
    return a - b;
  }

  indexOf(array, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].toString() === value) {
        return i;
      }
    }
    return "number not found";
  }

  binarySearch(array, value, start, end) {
    start = start === undefined ? 0 : start;
    end = end === undefined ? array.length : end;
    if (start > end) {
      return "number not found";
    }

    const index = Math.floor((start + end) / 2);
    const item = array[index];

    if (item.toString() === value) {
      return index;
    } else if (item < value) {
      return this.binarySearch(array, value, index + 1, end);
    } else if (item > value) {
      return this.binarySearch(array, value, start, index - 1);
    }
  }

  handleSubmitForm = e => {
    e.preventDefault();
    if (this.state.readyToSubmit === false) {
      this.handleLinearSearch(e);
    } else {
      this.handleBinarySearch(e);
    }
  };

  handleLinearSearch = e => {
    let val = document.getElementById("numberInput").value;
    let attempts = this.indexOf(this.state.data, val);

    if (attempts !== "number not found") {
      return (
        <div>
          <p>
            We found {val} after {attempts} tries
          </p>
        </div>
      );
    } else {
      return <p>number not found</p>;
    }
  };

  handleBinarySearch = e => {
    let val = document.getElementById("numberInput").value;
    let sortedData = this.state.data.sort(this.sortNumbers);
    let attempts = this.binarySearch(sortedData, val);
    if (attempts !== "number not found") {
      return (
        <div>
          <p>
            We found {val} after {attempts} tries
          </p>
        </div>
      );
    } else {
      return <p>number not found</p>;
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header" />
        <div className="search-form">
          <form onSubmit={e => this.handleSubmitForm(e)}>
            <fieldset>
              <label htmlFor="number">Number</label>
              <input type="number" id="numberInput" />
            </fieldset>
            <button
              type="submit"
              onClick={() => this.setState({ readyToSubmit: false })}
            >
              Linear Search
            </button>
            <button
              type="submit"
              onClick={() => this.setState({ readyToSubmit: true })}
            >
              Binary Search
            </button>
          </form>
        </div>
        <div className="binary-search-results">
          {this.state.readyToSubmit === true ? this.handleBinarySearch() : null}
        </div>
        <div className="linear-search-results">
          {this.state.readyToSubmit === false
            ? this.handleLinearSearch()
            : null}
        </div>
      </div>
    );
  }
}

export default App;

// we looked for the number 7: for the linear test it got the number in 59 tries, and for the binary test it got the number in 8 tries
