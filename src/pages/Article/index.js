import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import { Table, Tag, Space, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useChannel } from '@/hooks/useChannel'
import { useEffect, useState } from 'react'
import { getArticleListAPI } from '@/apis/article'
import { deleteArticleAPI } from '@/apis/article'
import { useNavigate } from 'react-router-dom'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = ({id}) => {
  const status = {
    1: <Tag color='warning'>Under Review</Tag>,
    2: <Tag color='success'>Review Completed</Tag>,
  }
  const navigate = useNavigate()
  const columns = [
    {
      title: 'Cover',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: 220
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: data => {
        return status[data]
      }
    },
    {
      title: 'Publish Date',
      dataIndex: 'pubdate'
    },
    {
      title: 'Read Count',
      dataIndex: 'read_count'
    },
    {
      title: 'Comment Count',
      dataIndex: 'comment_count'
    },
    {
      title: 'Like Count',
      dataIndex: 'like_count'
    },
    {
      title: 'Operation',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/publish?id=${data.id}`)} />
            <Popconfirm
              title="Are you sure to delete it?"
              onConfirm={() => onDelete(data.id)}
              okText="Confirm"
              cancelText="Cancel"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  /* const data = [
    {
      id: '8218',
      comment_count: 0,
      cover: {
        images: [],
      },
      like_count: 0,
      pubdate: '2019-03-11 09:00:00',
      read_count: 2,
      status: 2,
      title: 'Test Title H5'
    }
  ] */
  const { channelList } = useChannel()
  const [articleList, setArticleList] = useState([])
  const [count, setCount] = useState(0)
  const [reqData, setReqData] = useState({ page: 1, per_page: 5 })
  const getList = async (reqdata) => {
    try {
      const res = await getArticleListAPI(reqdata)
      setArticleList(res.data)
      setCount(res.total_count)
    } catch (error) {
      if (error.response) {
        alert(`Get article list error code: ${error.response.status}\nMessage: ${error.response.data.message}`);
      } else {
        alert(`Get article list error. Error message: ${error.message}`);
      }
    }
  };
  useEffect(() => {
    getList(reqData);
  }, [reqData])

  const onFinish = async (formValue) => {
    const { channel_id, date, status } = formValue
    setReqData({
      ...reqData,
      status,
      channel_id,
      begin_pubdate: date === undefined ? null : date[0].format('YYYY-MM-DD'),
      end_pubdate: date === undefined ? null : date[1].format('YYYY-MM-DD'),
    })
  }

  const pageChange = (page) => {
    setReqData({
      ...reqData,
      page
    })
  }

  const onDelete = async (id) => {
    await deleteArticleAPI(id)
    setReqData({
      ...reqData,
      page: 1,
      per_page: 5
    })
  }
  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>Home</Link> },
            { title: 'Articles' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: null }} onFinish={onFinish}>
          <Form.Item label="Status"
            name="status"
          >
            <Radio.Group>
              <Radio value={null}>All</Radio>
              <Radio value={1}>Under Review</Radio>
              <Radio value={2}>Review Completed</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Channel" name="channel_id">
            <Select placeholder="Please choose your article channel" style={{ width: 265 }}>
              {channelList.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">
            <RangePicker></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              Filter
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`A total of ${count} results were queried based on the filter conditions:`}>
        <Table rowKey="id" columns={columns} dataSource={articleList} pagination={{
          current: reqData.page,
          pageSize: reqData.per_page,
          onChange: pageChange,
          total: count
        }} />
      </Card>
    </div>
  )
}

export default Article