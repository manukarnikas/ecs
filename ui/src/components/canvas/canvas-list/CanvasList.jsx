import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../App";
import { List, Typography, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CanvasList.css';

const CanvasList = () => {

    const [boardList, setBoardList] = useState([]);

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        getBoardList();
    }, []);

    const getBoardList = () => {
        const url = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${url}/user/${user._id}/boards`)
            .then(function (response) {
                setBoardList(response?.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const deleteBoard = (id) => {
        const url = process.env.REACT_APP_BASE_URL;
        axios
            .delete(`${url}/user/${user._id}/board/${id}`)
            .then(function (response) {
                let newBoardList = [...boardList];
                newBoardList = newBoardList.filter(item=> item._id != id);
                setBoardList(newBoardList);
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
                        <Typography.Text className="link" onClick={()=>navigate(`/board/${item._id}`)}>
                            {item?.name}
                        </Typography.Text>
                        <DeleteOutlined
                            className="icon"
                            onClick={() => deleteBoard(item?._id)}
                        />
                    </List.Item>
                )}
            />
        </>
    );
}

export default CanvasList;
