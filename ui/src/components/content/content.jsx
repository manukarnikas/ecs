import { useState } from 'react';
import { Layout } from 'antd';
import './content.css';

const { Content } = Layout;

const ContentComponent = (props)=>{

    return (
        <Content className="content">
          test
        </Content>
    );
}

export default ContentComponent;