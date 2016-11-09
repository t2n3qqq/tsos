import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from 'components/List';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      file: '',
      valueSortedWords: [],
      alphabetSortedWords: [],
      isSelectedFile: false,
      isValueSorting: false,
      isAlphabetSorting: false,
    }
    this.updateFileName = this.updateFileName.bind(this);
    this.getSortedArrays = this.getSortedArrays.bind(this);
    this.changeTypeSorting = this.changeTypeSorting.bind(this);
    this.removeWord = this.removeWord.bind(this);
  }
  updateFileName(e) {
    this.setState({
      file: e.target.value,
    });
  }

  getSortedArrays() {
    $.get(`/book/${this.state.file}`, (data, status) => {
      if (status === 'success') {
        const [valueSortedWords, alphabetSortedWords] = data;
        this.setState({
          valueSortedWords,
          alphabetSortedWords,
          isSelectedFile: true,
        });
      } else {
        console.err('Bad request!');
      }
    });
  }

  changeTypeSorting(e) {
    if (e.target.value === 'isValueSorting') {
      this.setState({
        isValueSorting: true,
        isAlphabetSorting: false,
      });
    } else if (e.target.value === 'isAlphabetSorting') {
      this.setState({
        isValueSorting: false,
        isAlphabetSorting: true,
      });
    } else {
      this.setState({
        isValueSorting: false,
        isAlphabetSorting: false,
      });
    }
  }

  removeWord() {
    // const word = ReactDOM.findDOMNode(this.refs.word).value;
    // console.log(word);
    // this.setState({
    //   valueSortedWords: this.state.valueSortedWords.filter(pair => pair[0] !== word),
    //   alphabetSortedWords: this.state.alphabetSortedWords.filter(pair => pair[0] !== word),
    // })
  }

  render() {
    const checkboxTypeSorted = this.state.isSelectedFile ? (
      <select onChange={this.changeTypeSorting}>
        <option value="none">None</option>
        <option value="isValueSorting">Sorted by frequency word</option>
        <option value="isAlphabetSorting">Sorted by alphabet word</option>
      </select>
    ) : null;

    const tableList = (this.state.isValueSorting || this.state.isAlphabetSorting)
      ? (
        <List
          isValueSorting={this.state.isValueSorting}
          isAlphabetSorting={this.state.isAlphabetSorting}
          valueSortedWords={this.state.valueSortedWords}
          alphabetSortedWords={this.state.alphabetSortedWords}
          removeWord={this.removeWord}
        />) : null;
    return (
      <div>
        <h2>Enter file name:</h2>
        <input type="text"
          onChange={this.updateFileName}
          value={this.state.file} />
        <input type="button" onClick={this.getSortedArrays} value="Select file" />
        {checkboxTypeSorted}
        {tableList}
      </div>
    );
  }
}

export default App;
