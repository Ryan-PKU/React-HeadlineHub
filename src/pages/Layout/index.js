import { Layout, Menu, Popconfirm } from 'antd'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'

const { Header, Sider } = Layout

const items = [
    {
        label: 'Home',
        key: '1',
        icon: <HomeOutlined />,
    },
    {
        label: 'Article Management',
        key: '2',
        icon: <DiffOutlined />,
    },
    {
        label: 'Create Article',
        key: '3',
        icon: <EditOutlined />,
    },
]

const GeekLayout = () => {
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <div className="user-info">
                    <span className="user-name">Someone</span>
                    <span className="user-logout">
                        <Popconfirm title="Log out?" okText="Log out" cancelText="Cancel">
                            <LogoutOutlined /> Log out
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        defaultSelectedKeys={['1']}
                        items={items}
                        style={{ height: '100%', borderRight: 0 }}></Menu>
                </Sider>
                <Layout className="layout-content" style={{ padding: 20 }}>
                    Content
                </Layout>
            </Layout>
        </Layout>
    )
}
export default GeekLayout