import React, { useState, useEffect } from 'react';
import UserService from '../shared/services/UserService';

const UserComponent = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    UserService.getUsers().then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-center"> Users List</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <td> User Id</td>
            <td> User First Name</td>
            <td> User Last Name</td>
            <td> User Email Id</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td> {user.id}</td>
              <td> {user.firstName}</td>
              <td> {user.lastName}</td>
              <td> {user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserComponent;
