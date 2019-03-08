import React from "react";
import ReactDOM from "react-dom";

import "./styles.less";

const data = [
  ['Company 1', 'Company 2', 'Company 3'],
  ['23', '44', '54'],
  ['2', '3', '12'],
  ['54', '23', '12'],
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getFormattedDateForState(props.data)
  }

  getFormattedDateForState = (mainData) => {
    const data = mainData.map((items) => [...items]);
    const tableHead = data.shift();

    return {
      table: {
        header: tableHead,
        body: data.map((itmes) => itmes.map(item => +item))
      },
      indexSelectedColumn: null,
      number: '',
      delta: 0
    }
  };

  handleColumnClick = (index) => () => {
    this.setState({
      indexSelectedColumn: index
    })
  };

  handleNumberChange = (event) => {
    const value = event.target.value;

    if (/^-?\d*$/.test(value) && value.length <= 3) {
      this.setState({
        number: value
      })
    }
  };

  handleResetButtonClick = () => {
    this.setState({
      ...this.getFormattedDateForState(this.props.data)
    })
  };

  handleRecountButtonClick = () => {
    const {
      table,
      indexSelectedColumn: indColumn,
      number,
      delta
    } = this.state;

    const newBody = table.body.map((items) => {
      let newItems = [...items];
      newItems[indColumn] = ((newItems[indColumn] || 0) * number) / 100;
      return newItems;
    });


    this.setState({
      table: {
        ...table,
        body: newBody
      },
      delta: delta + this.countResultByColumn(newBody, indColumn) - this.countResultByColumn(table.body, indColumn)
    })

  };

  renderTableHead = () => {
    const {
      table,
      indexSelectedColumn
    } = this.state;

    return (
      <thead>
      <tr>
        <th></th>
        {
          table.header.map((value, index) => (
            <th key={value} className={indexSelectedColumn === index ? 'active' : ''}
                onClick={this.handleColumnClick(index)}>{value}</th>
          ))
        }
      </tr>
      </thead>
    )
  };

  countResultByColumn = (table, index = null) => {
    return table.reduce((result, currentValue) => {
      if (Number.isInteger(index)) {
        result = result + parseInt(currentValue[index], 10);
      } else {
        result = currentValue.map((value, index) => {
          return (result[index] || 0) + value;
        });
      }
      return result;
    }, Number.isInteger(index) ? 0 : []);
  };

  renderTableBody = () => {
    const {table} = this.state;

    return (
      <tbody>
      {
        table.body.map((items) => (
          <tr>
            <td></td>
            {items.map((value) => <td>{value}</td>)}
          </tr>
        ))
      }
      <tr>
        <td>Итого:</td>
        {
          this.countResultByColumn(table.body).map((value) => <td>{value}</td>)
        }
      </tr>
      </tbody>
    )
  };

  renderRunButton = () => {
    const {indexSelectedColumn, number} = this.state;

    if (!number || !Number.isInteger(indexSelectedColumn)) {
      return null;
    }

    return (
      <p>
        <button onClick={this.handleRecountButtonClick} className="button-run">Применить</button>
      </p>
    )
  }

  render() {
    const {number, delta} = this.state;

    return (
      <div className="App">
        <table>
          {this.renderTableHead()}
          {this.renderTableBody()}
        </table>
        <p className="input-field">
          <labe>Число:</labe>
          <input value={number} onChange={this.handleNumberChange}/>
        </p>
        {this.renderRunButton()}
        <p className="input-field">
          <labe>Дельта:</labe>
          <input disabled value={delta}/>
        </p>
        <p>
          <button onClick={this.handleResetButtonClick}>Скинуть значения</button>
        </p>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App data={data}/>, rootElement);
