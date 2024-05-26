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
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { createArticleAPI } from '@/apis/article'
import { message } from 'antd'
import { useChannel } from '@/hooks/useChannel'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchArticleAPI } from '@/apis/article'

const { Option } = Select

const Publish = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const { channelList } = useChannel()
    /* const articleData = useFetch(id)
    useEffect(() => {
        if (articleData) {
            form.setFieldsValue({
                title: articleData.title,
                content: articleData.content,
                channel_id: articleData.channel_id,
            });
        }
    }, [articleData, form]); */
    const cacheImageList = useRef([])
    const [imageList, setImageList] = useState([])
    const onUploadChange = (info) => {
        setImageList(info.fileList)
        cacheImageList.current = info.fileList
        //setImageList(info.fileList.map(item=>({url:item.response.data.url})))
        //cacheImageList.current = info.fileList.map(item=>({url:item.response.data.url}))

    }
    const [imageType, setImageType] = useState(0)
    const onTypeChange = (e) => {
        const type = e.target.value
        setImageType(type)
        if (type === 1) {
            const imgList = cacheImageList.current[0] ? [cacheImageList.current[0]] : []
            setImageList(imgList)
        } else if (type === 3) {
            setImageList(cacheImageList.current)
        }
        else {
            setImageList([])
        }
    }
    const onFinish = async (formValue) => {
        if (imageType !== imageList.length) return message.warning('Unmatched picture numbers')
        const { channel_id, content, title } = formValue
        const reqData = {
            title,
            content,
            cover: {
                type: imageType,
                images: imageList.map(item => (item.url ? item.url : item.response.data.url))
                //images: imageList.map(item => item.url)
            },
            channel_id,
            id:articleId
        }
        try {
            await createArticleAPI(reqData)
            if (articleId){
                message.success("Edit successfully")
            }
            else{
                message.success("Publish successfully")
            }
            form.resetFields();
            setImageList([]);
            cacheImageList.current = [];
            setImageType(0);
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

    const [searchParams] = useSearchParams()
    const articleId = searchParams.get('id')
    useEffect(() => {
        const fetchArticle = async (id) => {
            try {
                const res = await fetchArticleAPI(id)
                form.setFieldsValue({ ...res, type: res.cover.type })
                setImageType(res.cover.type)
                setImageList(res.cover.images.map(url => ({ url })))
                cacheImageList.current = res.cover.images.map(url => ({ url }))
                //setImageList(res.cover.images.map(url=>({response:{data:{url}}})))
            }
            catch (error) {
                if (error.response) {
                    alert(`Failed to fetch article with certain id with error code: ${error.response.status}\nMessage: ${error.response.data.message}`);
                } else {
                    alert(`Failed to fetch article with certain id. Error message: ${error.message}`);
                }
                navigate('/login')
            }
        }
        if (articleId) { fetchArticle(articleId) }
    }, [articleId, navigate, form])

    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>Home</Link> },
                        { title: `${articleId ? 'Edit' : 'Publish'}` },
                    ]}
                    />
                }
            >
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 0 }}
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
                    <Form.Item label="Cover" name='cover'>
                        <Form.Item name="type">
                            <Radio.Group onChange={onTypeChange}>
                                <Radio value={1}>single</Radio>
                                <Radio value={3}>triple</Radio>
                                <Radio value={0}>none</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {imageType > 0 &&
                            <Upload
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList
                                name='image'
                                action={'http://geek.itheima.net/v1_0/upload'}
                                onChange={onUploadChange}
                                maxCount={imageType}
                                multiple={imageType > 1}
                                fileList={imageList}
                            >
                                <div style={{ marginTop: 8 }}>
                                    <PlusOutlined />
                                </div>
                            </Upload>}
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
                            {articleId ? 'Edit' : 'Publish'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish