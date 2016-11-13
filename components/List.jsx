import React from 'react';
import Tags from './Tags';
import $ from 'jquery';
class List extends React.Component {
  static propTypes = {
    isValueSorting: React.PropTypes.bool.isRequired,
    isAlphabetSorting: React.PropTypes.bool.isRequired,
    valueSortedWords: React.PropTypes.array.isRequired,
    alphabetSortedWords: React.PropTypes.array.isRequired,
    removeWord: React.PropTypes.func.isRequired,
  }

  goToTag(tag) {
    $('html, body').animate({
      scrollBottom: $(`#${tag}`).offset().bottom
    }, 1000);
  }

  render() {
    const valueTableRow = this.props.isValueSorting ? this.props.valueSortedWords.map(pair => (
      <tr key={pair[0]}>
        <td>{pair[0]}</td>
        <td>{pair[1]}</td>
        <td><input type="button" id="button" onClick={() => this.goToTag(pair[2])} value={pair[2]} /></td>
        <td className="list__actions">
          <input className="list__button_remove" type="button" onClick={() => this.props.removeWord(pair[0])} value="X"/>
        </td>
      </tr>
      )) : null;

    const alphabetTableRow = this.props.isAlphabetSorting ? this.props.alphabetSortedWords.map(pair => (
      <tr key={pair[0]}>
        <td>{pair[0]}</td>
        <td>{pair[1]}</td>
        <td><input type="button" id="button" onClick={() => this.goToTag(pair[2])} value={pair[2]} /></td>
        <td className="list__actions">
          <input className="list__button_remove" type="button" onClick={() => this.props.removeWord(pair[0])} value="X"/>
        </td>
      </tr>
        )) : null;

    return (
      <div>
        <table className="list-table">
          <thead>
            <tr>
              <th>Word</th>
              <th>Frequency</th>
              <th>Part of speech</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {valueTableRow}
            {alphabetTableRow}
          </tbody>
        </table>
        <Tags />
      </div>
    );
  }
}

export default List;
