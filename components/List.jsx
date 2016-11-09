import React from 'react';

class List extends React.Component {
  static propTypes = {
    isValueSorting: React.PropTypes.bool.isRequired,
    isAlphabetSorting: React.PropTypes.bool.isRequired,
    valueSortedWords: React.PropTypes.array.isRequired,
    alphabetSortedWords: React.PropTypes.array.isRequired,
    removeWord: React.PropTypes.func.isRequired,
  }

  render() {
    const valueTableRow = this.props.isValueSorting ? this.props.valueSortedWords.map(pair => (
      <tr key={pair[0]}>
        <td>{pair[0]}</td>
        <td>{pair[1]}</td>
        <td>
          <input type="button" onClick={this.props.removeWord} value="X"/>
        </td>
      </tr>
      )) : null;

    const alphabetTableRow = this.props.isAlphabetSorting ? this.props.alphabetSortedWords.map(pair => (
      <tr key={pair[0]}>
        <td>{pair[0]}</td>
        <td>{pair[1]}</td>
        <td>
          <input type="button" onClick={this.props.removeWord} value="X"/>
        </td>
      </tr>
        )) : null;

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Word</th>
              <th>Frequency</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {valueTableRow}
            {alphabetTableRow}
          </tbody>
        </table>
      </div>
    );
  }
}

export default List;
