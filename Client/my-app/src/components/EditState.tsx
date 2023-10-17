import { Button, Form, FormInstance, Input, Table } from 'antd';
import { User } from '../interfaces/UsersInterface';
import { ColumnsType } from 'antd/es/table/interface';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_MUTATION } from './Mutations';


interface Props{
  data_source: User[];
  editing_row: string;
  form: FormInstance<any>;
  set_editing_row:(editing_row: string) => void; 
  set_data_source:(data_source:User[]) => void; 
}

const EditState = ({data_source, editing_row, form, set_editing_row, set_data_source}: Props) => {

  const [updateUser] = useMutation(UPDATE_USER_MUTATION)
  const columns: ColumnsType<User> = [
      {
        title: 'First Name',
        dataIndex: 'first_name',
        render:(text,record)=>{
          if(editing_row === record.id){
            return(
              <Form.Item
              name="first_name" 
              rules={[{
                required:true,
                message:'Please enter your first name'
              }]}>
                <Input/>
              </Form.Item>
            )
          }else{
            return (<p>{text}</p>)
          }
        }
      },
      {
        title: 'Last Name',
        dataIndex: 'last_name',
        render:(text,record)=>{
          if(editing_row === record.id){
            return(
              <Form.Item
              name="last_name" 
              rules={[{
                required:true,
                message:'Please enter your last name'
              }]}>
                <Input/>
              </Form.Item>
            )
          }else{
            return (<p>{text}</p>)
          }
        }
      },
      {
        title: 'Username',
        dataIndex: 'username',
        render:(text,record)=>{
          if(editing_row === record.id){
            return(
              <Form.Item
              name="username" 
              rules={[{
                required:true,
                message:'Please enter your username'
              }]}>
                <Input/>
              </Form.Item>
            )
          }else{
            return (<p>{text}</p>)
          }
        }
      },
      {
        title: 'Email Address',
        dataIndex: 'email_address',
        render:(text,record)=>{
          if(editing_row === record.id){
            return(
              <Form.Item
              name="email_address" 
              rules={[{
                required:true,
                message:'Please enter your email address'
              }]}>
                <Input/>
              </Form.Item>
            )
          }else{
            return (<p>{text}</p>)
          }
        }
      },
      {
        render: (_, record) =>{
          if(editing_row === record.id){
            return(
            <>
            <Button htmlType='submit'>
                Submit
              </Button>
            <Button onClick={()=>{set_editing_row("")}} >
              Cancel
            </Button>
            </>
          )}else{
            return (
              <>
                <Button
                  disabled
                >
                  Edit
                </Button>
                <Button
                  disabled
                >
                  Delete
                </Button>
              </>
  );}}}] //OOPS MPOTILIARISMA???
  const onEdit = (values: User) => {
    updateUser({
      variables:{id:editing_row, input:{first_name:values.first_name, last_name:values.last_name, username: values.username, email_address:values.email_address} }
    })
    .then(({ data: userData }) => {
      const updatedUser: User = userData.updateUser;
      const updatedData = data_source.map((item) => (item.id === editing_row ? updatedUser : item));
      set_data_source(updatedData);
      set_editing_row("");
    })
    .catch((error) => {
      console.error("Error updating user: ", error);
    });
  };
  return (
    <div>
      <Form form={form} onFinish={onEdit}>
        <Table columns={columns} dataSource={data_source}></Table>
      </Form>
    </div>
  )
}

export default EditState;