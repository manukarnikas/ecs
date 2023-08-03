import React, { useState, useEffect } from "react";
import { List, Typography, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CanvasList.css';

const CanvasList = () => {

    const [boardList, setBoardList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getBoardList();
    }, []);

    const getBoardList = () => {
        const url = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${url}/boards`)
            .then(function (response) {
                setBoardList(response?.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <>
            <div style={{ float: 'right' }}>
                <Button
                    type="primary"
                    onClick={() => navigate('/board/create')}
                >
                    Create
                </Button>
            </div>
            <br/>
            <br/>
            <br/>
            <List
                header={<div>Boards</div>}
                bordered
                dataSource={boardList}
                renderItem={(item) => (
                    <List.Item>
                        <Typography.Text>{item?.name}</Typography.Text>
                        <DeleteOutlined
                            className="icon"
                            onClick={() => navigate(`/board/${item.id}`)}
                        />
                    </List.Item>
                )}
            />
        </>
    );
}

export default CanvasList;
