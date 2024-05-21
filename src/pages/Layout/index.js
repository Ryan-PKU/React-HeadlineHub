import { Layout, Menu, Popconfirm } from 'antd'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const { Header, Sider } = Layout

const items = [
    {
        label: 'Home',
        key: '/',
        icon: <HomeOutlined />,
    },
    {
        label: 'Article Management',
        key: '/article',
        icon: <DiffOutlined />,
    },
    {
        label: 'Create Article',
        key: '/publish',
        icon: <EditOutlined />,
    },
]

const AllLayout = () => {
    const navigate = useNavigate()
    const menuClick = (item) => {
        navigate(item.key)
        //console.log(item);
    }
    const location = useLocation()
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
                        style={{ height: '100%', borderRight: 0 }}
                        onClick={menuClick}
                        selectedKeys={location.pathname}
                    >
                    </Menu>
                </Sider>
                <Layout className="layout-content" style={{ padding: 20 }}>
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
    )
}
export default AllLayout