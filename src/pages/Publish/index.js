import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState, useEffect } from 'react'
import { getChannelsAPI } from '@/apis/article'
import { useNavigate } from 'react-router-dom'
import { createArticleAPI } from '@/apis/article'

const { Option } = Select

const Publish = () => {
    const navigate = useNavigate()
    const [channelList, setChannelList] = useState([])
    useEffect(() => {
        const getChannelList = async () => {
            try {
                const res = await getChannelsAPI()
                setChannelList(res.channels)
            }
            catch (error) {
                if (error.response) {
                    alert(`Failed to get the channel list with error code: ${error.response.status}\nMessage: ${error.response.data.message}`);
                } else {
                    alert(`Failed to get the channel list. Error message: ${error.message}`);
                }
                navigate('/login')
            }
        }
        getChannelList()
    }, [navigate])
    const onFinish = async (formValue) => {
        const { channel_id, content, title } = formValue
        const reqData = {
            title,
            content,
            cover: {
                type: 0,
                images: []
            },
            channel_id
        }
        try {
            await createArticleAPI(reqData)
        }
        catch (error) {
            if (error.response) {
                alert(`Failed to publish with error code: ${error.response.status}\nMessage: ${error.response.data.message}`);
            } else {
                alert(`Failed to publish. Error message: ${error.message}`);
            }
            navigate('/login');
        }
    }
    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>Home</Link> },
                        { title: 'Publish' },
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 1 }}
                    validateTrigger={['onBlur']}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please enter your article title' }]}
                    >
                        <Input placeholder="Please enter your article title" style={{ width: 500 }} />
                    </Form.Item>
                    <Form.Item
                        label="Channel"
                        name="channel_id"
                        rules={[{ required: true, message: 'Please choose your article channel' }]}
                    >
                        <Select placeholder="Please choose your article channel" style={{ width: 500 }}>
                            {channelList.map(item => (
                                <Option key={item.id} value={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Content"
                        name="content"
                        rules={[{ required: true, message: 'Please type the content' }]}
                    >
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="Please type the content"
                            style={{ width: 500 }}
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 9 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                Publish
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish