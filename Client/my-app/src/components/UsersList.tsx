import {useState} from 'react';
import { User } from "../interfaces/UsersInterface";
import { Button, Form, Table } from "antd";
import { ColumnsType } from "antd/es/table/interface";
import AddButton from './AddButton';
import { DELETE_USER_MUTATION } from './Mutations';
import { useMutation } from '@apollo/client';
import EditState from './EditState';


interface Props{
  users: User[];
}

const Userslist = ({users}:Props) => {

  const[data_source, set_data_source] = useState<User[]>(users);
  const [editing_row, set_editing_row] = useState("");
  const [form] = Form.useForm();
  const [deleteUser] = useMutation(DELETE_USER_MUTATION)
  const columns: ColumnsType<User> = [
    {
      title: "First Name",
      dataIndex: "first_name",
      render: (text) => {
        return <p>{text}</p>;
      },
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      render: (text) => {
        return <p>{text}</p>;
      },
    },
    {
      title: "Username",
      dataIndex: "username",
      render: (text) => {
        return <p>{text}</p>;
      },
    },
    {
      title: "Email Address",
      dataIndex: "email_address",
      render: (text) => {
        return <p>{text}</p>;
      },
    },
    {
      title: 'Operations',
      dataIndex: 'operations',
      align: 'center',
      render: (_: any, record) => {
        if(editing_row !== record.id){
          return (
            <>
              <Button
                onClick={() => {
                  form.setFieldsValue({
                    first_name: record.first_name,
                    last_name: record.last_name,
                    username: record.username,
                    email_address: record.email_address,
                  });
                  set_editing_row(record.id);
                }}
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  deleteUser({
                    variables: {
                      id: record.id
                    },
                  })
                    .then((deletionData) => {
                      const updatedData = data_source.filter(
                        (item: User) => item.id !== deletionData.data.deleteUser
                      );
                      set_data_source(updatedData);
                    })
                    .catch((error) => {
                      console.error("Error deleting user: ", error);
                    });
                }}
              >
                Delete
              </Button>
            </>
          );
        }
      },  
    },
  ];
  return (
      <div>
      {editing_row !=="" ? (
        <EditState
          data_source={data_source}
          set_data_source={set_data_source}
          editing_row={editing_row}
          set_editing_row={set_editing_row}
          form={form}
        />
      ) : (
        <Table columns={columns} dataSource={data_source}></Table>
      )}
      <AddButton set_data_source={set_data_source} data_source={data_source} />
    </div> 
  )
};

export default Userslist;