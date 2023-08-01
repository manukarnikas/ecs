import { Layout } from 'antd';
import './header.css';

const { Header } = Layout;

const HeaderComponent = ()=>{
    return (
        <Header className="header">
            <p className="title">Send Message to SQS</p>
        </Header>
    );
}

export default HeaderComponent;