import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getFetchApi } from '../actions';

import './App.css';

const App = (props) => {
  const { users, getFetchApi } = props;
  const [NewUsers, setNewUsers] = useState([]);
  const [Colored, setColored] = useState(false);
  const [Sort, setSort] = useState(null);

  useEffect(() => {
    getFetchApi();
  }, [getFetchApi]);

  useEffect(() => {
    setNewUsers(users['results']);
  }, [users]);

  const deleteRow = (user) => {
    setNewUsers(NewUsers.filter((item) => item !== user));
  };

  const resotreInitState = () => {
    setNewUsers(users['results']);
  };

  const coloredRows = () => {
    setColored(!Colored);
  };

  const sortCountry = () => {
    setSort(Sort == null || Sort === 'desync' ? 'async' : 'desync');
    setNewUsers(
      NewUsers.sort((a, b) =>
        a.location.country.localeCompare(b.location.country),
      ),
    );
  };

  const renderList = () => {
    if (NewUsers == null) return;
    return NewUsers.map((user) => {
      const {
        name: { first, last },
        picture: { thumbnail },
        location: { country },
      } = user;

      return (
        <tr key={`${first} ${last} avatar`}>
          <td>
            <img src={thumbnail} alt={`${first} ${last} avatar`} />
          </td>
          <td>{first}</td>
          <td>{last}</td>
          <td>{country}</td>
          <td>
            <button onClick={() => deleteRow(user)}>delete</button>
          </td>
        </tr>
      );
    });
  };
  const renderTable = () => {
    return (
      <table className={Colored ? 'colored' : null} width={'100%'}>
        <thead>
          <tr>
            <th>image</th>
            <th>name</th>
            <th>surname</th>
            <th>country</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>{renderList()}</tbody>
      </table>
    );
  };

  return (
    <div className="App">
      <h1>Test Aplication</h1>
      <button onClick={() => coloredRows()}>Colored rows</button>
      <button onClick={() => sortCountry()}>Sort by country</button>
      <button onClick={() => resotreInitState()}>Restore the init state</button>
      {renderTable()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { users: state.users };
};

export default connect(mapStateToProps, { getFetchApi })(App);
