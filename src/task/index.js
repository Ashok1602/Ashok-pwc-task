import React, { useState, useEffect } from 'react';
import SearchComponent from './Search';
import axios from 'axios';

export default function Index() {
  const [data, updateData] = useState([]);
  const [searchData, updateSearchData] = useState([])
  const [isLoading, updateLoading] = useState(true);
  useEffect(() => {
    axios
      .get('http://localhost:8888/users')
      .then((res) => {
        console.log(res.data);
        updateData(res.data);
        updateSearchData(res.data);
        updateLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        updateLoading(false);
      });
  }, []);

  const getUserData = () => {
    if (data.length) {
      return data.map((user) => {
        let userData = Object.values(user.address);
        userData.pop();
        return (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.phone}</td>
            <td>{user.company.name}</td>
            <td>{userData.toString()}</td>
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td colspan='5' style={{ textAlign: 'center' }}>
            No data
          </td>
        </tr>
      );
    }
  };

  const searchUsers = (event) => {
    console.log(event.target.value)
    if (event.target.value !=="" && searchData.length) {
      const result = searchData.filter(function (user) {
        let userData = Object.values(user.address);
        userData.pop();
        const columnData = user.name
          .concat(user.phone)
          .concat(user.company.name)
          .concat(userData.toString());
        return (
          true ===
          columnData.toLowerCase().includes(event.target.value.toLowerCase())
        );
      });
      updateData(result);
    } else {
      updateData(data);
    }
  };
  return (
    <div>
      <h2>Users Information</h2>
      <SearchComponent searchUsers={searchUsers} isLoading={isLoading} />
      {!isLoading ? (
        <table className='tableStyles'>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Company Name</th>
            <th>Address</th>
          </tr>
          {getUserData(data)}
        </table>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}
