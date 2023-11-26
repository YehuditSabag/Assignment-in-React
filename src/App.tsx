import  { useEffect, useState } from 'react';
import { Table } from 'antd';
import './App.css';
import type { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import './index.css';
import { Posts } from './components/posts';

interface UserType {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  }
}

function App() {
  const [users, setUsers] = useState<UserType[]>([]);//list of all the users
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [selectedUserName, setSelectedUserName] = useState<string>('');

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json()) //parse to json
      .then((usersData: UserType[]) => {
        setUsers(usersData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once

  // Table columns configuration
  const columns: ColumnsType<UserType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: users ? users.map(user => ({ text: user.name, value: user.name })) : [],
      filterSearch: true,
      onFilter: (value: string, record) => record.name.startsWith(value),
      width: '40%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      filters: users ? users.map(user => ({ text: user.email, value: user.email })) : [],
      filterSearch: true,
      onFilter: (value: string, record) => record.email.startsWith(value),
    },
    {
      title: 'Company',
      dataIndex: ['company', 'name'],
      width: '30%',
    },
  ];

  // Row selection configuration
  const rowSelection: TableRowSelection<UserType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows.length > 0) {
        setSelectedUserId(selectedRows[0].id);
        setSelectedUserName(selectedRows[0].name);
      } else {
        setSelectedUserId(0);
      }
    },
    type: 'radio', // Single row selection
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={users}
        loading={!users.length} // Display loading state until data is fetched
        rowKey="id" // Unique key for each row
        rowSelection={rowSelection}
      />
      {selectedUserId !== 0 && selectedUserName !== null && (
        <Posts
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
          selectedUserName={selectedUserName}
          setSelectedUserName={setSelectedUserName}
        />
      )}
    </>
  );
}

export default App;
