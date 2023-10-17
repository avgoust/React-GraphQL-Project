import { useState } from 'react'
import { Button, Modal, Form, Input } from 'antd';
import { User } from '../interfaces/UsersInterface';
import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from '../components/Mutations';


interface Props{
    data_source: User[];
    set_data_source:(data_source:User[]) => void;
}

const AddButton = ({data_source, set_data_source}:Props) => {

    const [is_modal_open, setIs_modal_open] = useState(false); 
    const [createUser] = useMutation(CREATE_USER_MUTATION);
    const showModal = () => {
        setIs_modal_open(true);
    };
    const handleCancel = () => {
        setIs_modal_open(false);
    };
    const handleOk = (values: User) => {
        createUser({
            variables:{input:{first_name:values.first_name, last_name:values.last_name, username: values.username, email_address:values.email_address}}
        }).then((creationData) => {
            const newData = [...data_source, creationData.data.createUser];
            set_data_source(newData);
        })
        setIs_modal_open(false);
    };
    return (
        <div className='AddButton'>
            <Button type="primary" className={'btn btn-' + "success"} onClick={showModal}>
                Add
            </Button>
            <Modal footer={[]} title="Add a new user" open={is_modal_open} onCancel={handleCancel}>
                <Form
                    name="form_in_modal"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{
                        modifier: 'public',
                      }}
                    autoComplete="off"
                    onFinish={handleOk}
                >
                    <Form.Item
                        label="first_name"
                        name="first_name"
                        rules={[{ required: true, message: 'Please input your first name!'}]}
                    >
                    <Input />
                    </Form.Item>
                    <Form.Item
                        label="last_name"
                        name="last_name"
                        rules={[{ required: true, message: 'Please input your last name!' }]}
                    >
                    <Input/>
                    </Form.Item>
                    <Form.Item
                        label="username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                    <Input/>
                    </Form.Item>
                    <Form.Item
                        label="email_address"
                        name="email_address"
                        rules={[{ required: true, message: 'Please input your email address!' }]}
                    >
                    <Input/>
                    </Form.Item>
                    <span className='Ok_Cancel'>
                    <Button className='OK' type="primary" htmlType="submit">
                        OK
                    </Button>
                    <Button type="primary" onClick={handleCancel}>
                        Cancel
                    </Button>
                    </span>
                </Form>
            </Modal>
        </div>
    )
}
export default AddButton;