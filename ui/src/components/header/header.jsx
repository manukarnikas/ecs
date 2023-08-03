import { useState } from "react";
import { Layout, Menu, Avatar, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import './header.css';

const { Header } = Layout;

const HeaderComponent = () => {

    const [avatarUrl, setAvatarUrl] = useState("");

    const popoverMenu = (
        <div>
            Logout
        </div>
    );

    return (
        <Header className="header">
            <Menu className="menu-wrapper" theme="dark" mode="horizontal">
            <Menu.Item key="title">
                <h1 className="title">My Canvas</h1>
            </Menu.Item>
            <Menu.Item key="avatar">
                <Popover content={popoverMenu} trigger="click">
                    {avatarUrl ? (
                        <Avatar src={avatarUrl} />
                    ) : (
                        <Avatar icon={<UserOutlined />} />
                    )}
                </Popover>
            </Menu.Item>
            </Menu>
        </Header>
    );
}

export default HeaderComponent;