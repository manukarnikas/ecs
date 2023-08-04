import { useContext } from "react";
import { Layout, Menu, Avatar, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UserContext } from '../../App';
import './header.css';

const { Header } = Layout;

const HeaderComponent = () => {

    const { user, setUser } = useContext(UserContext);

    const logout = ()=>{
        setUser({});
        window.location.assign("/login");
    }

    const popoverMenu = (
        <div style={{ cursor: 'pointer'}}>
            <div>
                Hi {user?.username}
            </div>
            <hr/>
            <div onClick={()=> logout()}>
                Logout
            </div>
        </div>
    );

    return (
        <Header className="header">
            <Menu className="menu-wrapper" theme="dark" mode="horizontal">
                <Menu.Item key="title">
                    <h1 className="title">My Canvas</h1>
                </Menu.Item>
                {user?.thumbnailUrl ? (<Menu.Item key="avatar">
                    <Popover content={popoverMenu} trigger="click">
                        {user?.thumbnailUrl ? (
                            <Avatar src={user?.thumbnailUrl} />
                        ) : (
                            <Avatar icon={<UserOutlined />} />
                        )}
                    </Popover>
                </Menu.Item>) : null}
            </Menu>
        </Header>
    );
}

export default HeaderComponent;