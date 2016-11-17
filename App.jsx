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
          (
            <div
              style={{ height: '400px', width: '1000px' }}
            >
            <div
              style={{ height: '400px', width: '160000px' }}
            >
              <HighChart
              style={{ height: '400px', width: '160000px' }}
              config={{
                chart: {
                  type: 'line',
                  zoomType: 'x',
                },
                xAxis: {
                  categories: this.state.fileData.values.map((item, index) => {
                    return this.state.fileData.dataBlockReceiveTime * (index + 1);
                  }),
                  min: 0,
                  scrollbar: {
                    enabled: true
                  },
                },
                series: [{
                  data: this.state.fileData.values,
                }],
                tooltip: {
                  useHTML: true,
                  headerFormat: '<small>{point.key}</small><table>',
                  pointFormat: '<tr><td style="color: {series.color}">{series.name}:{point.y} </td>',
                  footerFormat: '</table>',
                  valueDecimals: 2,
                  crosshairs: [{
                    width: 1,
                    color: 'Gray'
                  }, {
                    width: 1,
                    color: 'gray'
                  }],
                },
                plotOptions: {
                  column: {
                    pointPadding: 0.2,
                    borderWidth: 0.5
                  },
                },
                scrollbar: {
                  enabled: true,
                  barBackgroundColor: 'gray',
                  barBorderRadius: 7,
                  barBorderWidth: 0,
                  buttonBackgroundColor: 'gray',
                  buttonBorderWidth: 0,
                  buttonArrowColor: 'yellow',
                  buttonBorderRadius: 7,
                  rifleColor: 'yellow',
                  trackBackgroundColor: 'white',
                  trackBorderWidth: 1,
                  trackBorderColor: 'silver',
                  trackBorderRadius: 7
                }
              }}
              ref="chart" />
            </div>
            </div>
          ) :
          null
      }

      </div>
    );
  }
}

export default App;


/*
<HighChart
style={{ height: '400px', width: '600px' }}
config={{

}}
ref="chart" />


chart: {
  type: 'line',
  zoomType: 'x',
},
xAxis: {
  categories: this.state.fileData.values.map((item, index) => {
    return this.state.fileData.dataBlockReceiveTime * (index + 1);
  }),
  min: 0,
  max: 10,
  scrollbar: {
    enabled: true
  },
},
series: [{
  data: this.state.fileData.values,
}],
tooltip: {
  useHTML: true,
  headerFormat: '<small>{point.key}</small><table>',
  pointFormat: '<tr><td style="color: {series.color}">{series.name}:{point.y} </td>',
  footerFormat: '</table>',
  valueDecimals: 2,
  crosshairs: [{
    width: 1,
    color: 'Gray'
  }, {
    width: 1,
    color: 'gray'
  }],
},
plotOptions: {
  column: {
    pointPadding: 0.2,
    borderWidth: 0.5
  },
},
scrollbar: {
  enabled: true,
  barBackgroundColor: 'gray',
  barBorderRadius: 7,
  barBorderWidth: 0,
  buttonBackgroundColor: 'gray',
  buttonBorderWidth: 0,
  buttonArrowColor: 'yellow',
  buttonBorderRadius: 7,
  rifleColor: 'yellow',
  trackBackgroundColor: 'white',
  trackBorderWidth: 1,
  trackBorderColor: 'silver',
  trackBorderRadius: 7
}
*/
