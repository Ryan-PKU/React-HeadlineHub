import './index.scss'
import { Card, Form, Input, Button } from 'antd'
import logo from '@/assets/headline.png'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'
import { registerAPI } from '@/apis/user'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = async (formValue) => {
        try {
            await dispatch(fetchLogin(formValue))
            alert('Log in successfully')
            navigate('/')
        }
        catch (error){
            if (error.response) {
                alert(`Failed to log in: ${error.response.status}\nMessage: ${error.response.data.message}`);
            } else {
                alert(`Failed to log in. Error message: ${error.message}`);
            }
            window.location.reload()
        }
    }
    const [form] = Form.useForm()
    const onRegister = async () => {
        try {

            const formValue = await form.validateFields()
            await registerAPI(formValue)
            alert("Register successfully")
        } catch (error) {
            if (error.response) {
                alert(`Failed to register with error code: ${error.response.status}\nMessage: ${error.response.data.message}`);
            } else {
                alert(`Failed to register. Error message: ${error.message}`);
            }
            window.location.reload()
        }
    }
    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" />
                { }
                <Form form={form} validateTrigger={['onBlur']} onFinish={onFinish}>
                    <Form.Item name='mobile' rules={[
                        {
                            required: true,
                            message: 'Please enter your mobile number'
                        },
                        {
                            pattern: /^1[3-9]\d{9}$/,
                            message: 'Wrong format of mobile number'
                        }
                    ]}>
                        <Input size="large" placeholder="Please enter your mobile number" />
                    </Form.Item>
                    <Form.Item name='code' rules={[
                        {
                            required: true,
                            message: 'please enter your verification code'
                        }
                    ]}>
                        <Input size="large" placeholder="please enter your verification code" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            Log in
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="default" size="large" block onClick={onRegister}>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login