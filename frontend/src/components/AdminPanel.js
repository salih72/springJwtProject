import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (!userString) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(userString);
    if (user.role !== 'ADMIN') {
      setAlert({ show: true, message: 'You are not an admin.', variant: 'danger' });
      return;
    }

    axios.get('/adminPanel/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setUsers(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the users!', error);
    });
  }, [navigate]);

  const handleDelete = (id) => {
    axios.delete(`/adminPanel/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(() => {
      setUsers(users.filter(user => user.id !== id));
      setAlert({ show: true, message: 'User deleted successfully.', variant: 'success' });
    })
    .catch(error => {
      console.error('There was an error deleting the user!', error);
      setAlert({ show: true, message: 'Failed to delete the user.', variant: 'danger' });
    });
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminPanel;
