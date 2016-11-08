import React from 'react';
import textFromFile from 'helpers/readerFile';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      txt: 'Something',
    }
  }
  update(e) {
    this.setState({
      txt: e.target.value,
    });
  }
  readFromFile() {
    this.setState({
      txt: fs.readFileSync('book.txt'),
    });
  }
  render() {
    console.log(textFromFile);
    return (
      <div>
        <input type="text"
          onChange={this.update.bind(this)}
          value={this.state.txt} />
        <h1>{this.state.txt}</h1>
      </div>
    );
  }
}

export default App;
