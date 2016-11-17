import React from 'react';
import ReactDOM from 'react-dom';
import HighChart from 'react-highcharts';
import List from 'components/List';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      file: '',
      fileData: null,
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

  getFileData() {
    fetch(`/file/${this.state.file}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        console.log('DATA', data);
        this.setState({
          ...this.state,
          fileData: data,
        })
      })
      .catch(error => {
        console.log('GET request `/book/${this.state.file}` faild', error);
      });
  }

  getSortedArrays() {
    fetch(`/book/${this.state.file}`, {
      method: 'GET',
    })
      .then(res => [res.json(), res])
      .then(([data, res]) => {
        if (res.status === 'success') {
          const [valueSortedWords, alphabetSortedWords] = data;
          this.setState({
            valueSortedWords,
            alphabetSortedWords,
            isSelectedFile: true,
          });
        } else {
          throw new Error('Bad request!');
        }
      })
      .catch(error => {
        console.error('GET request `/book/${this.state.file}` faild', error);
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

  removeWord(word) {
    this.setState({
      valueSortedWords: this.state.valueSortedWords.filter(pair => pair[0] !== word),
      alphabetSortedWords: this.state.alphabetSortedWords.filter(pair => pair[0] !== word),
    })
  }

  render() {
    const checkboxTypeSorted = this.state.isSelectedFile ? (
      <div>
        <h2>Enter type of sorting:</h2>
        <select className="main__selector-sorting" onChange={this.changeTypeSorting}>
          <option value="none">None</option>
          <option value="isValueSorting">Sorted by frequency word</option>
          <option value="isAlphabetSorting">Sorted by alphabet word</option>
        </select>
      </div>
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
        <input
          className="main__selector-file"
          type="button"
          onClick={() => this.getFileData()}
          value="Select bin file"
        />
        <input
          className="main__selector-file"
          type="button"
          onClick={this.getSortedArrays}
          value="Select file"
        />
      {
        this.state.fileData ?
          (<HighChart
            config={{
              xAxis: {
                categories: this.state.fileData.values.map((item, index) => {
                  return this.state.fileData.dataBlockReceiveTime * (index + 1);
                }),
              },
              series: [{
                data: this.state.fileData.values,
              }]
            }}
            ref="chart"></HighChart>) :
          null
      }

      </div>
    );
  }
}

export default App;
