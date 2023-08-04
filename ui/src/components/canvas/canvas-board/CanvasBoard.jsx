import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../../App";
import { Button, Alert, Input, Space } from "antd";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CanvasBoard.css';

const CanvasBoard = () => {

    const [drawing, setDrawing] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [boardName, setBoardName] = useState('');
    const [successAlert, setSuccessAlert] = useState({
        status: false,
        message: ""
    });
    const [failureAlert, setFailureAlert] = useState({
        status: false,
        message: ""
    });

    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const navigate = useNavigate('/boards');

    const { user } = useContext(UserContext);

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getBoard(id);
        }
        const context = canvasRef.current.getContext("2d");
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 5;
        contextRef.current = context;
    }, []);

    const getBoard = (id) => {
        const url = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${url}/user/${user._id}/board/${id}`)
            .then(function (response) {
                setBoardName(response?.data?.name);
                setDrawing(response?.data?.points);
                restore(response?.data?.points);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const save = () => {
        const url = process.env.REACT_APP_BASE_URL;
        if(id){
            axios
            .put(`${url}/user/${user._id}/board/${id}`, {
                userId: user._id,
                _id: id,
                name: boardName,
                points: drawing
            })
            .then(function (response) {
               setSuccessAlert({
                    status: true,
                    message: "Board updated successfully!"
               });
            })
            .catch(function (error) {
                setFailureAlert({
                    status: true,
                    message: error.message
               });
               console.error(error);
            });
        }else{
            axios
            .post(`${url}/user/${user._id}/board`, {
                userId: user._id,
                name: boardName,
                points: drawing
            })
            .then(function (response) {
                setSuccessAlert({
                    status: true,
                    message: "Board created successfully!"
               });
            })
            .catch(function (error) {
                setFailureAlert({
                    status: true,
                    message: error.message
               });
                console.error(error);
            });
        }
    };

    const validate = ()=>{
        if(!boardName){
            setFailureAlert({
                status: true,
                message: "Board name is required"
            });
            return;
        }
        if(!drawing?.length){
            setFailureAlert({
                status: true,
                message: "No data to save"
            });
            return;
        }
        save();
    }

    const start = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
        setDrawing([...drawing, { x: offsetX, y: offsetY }]);
        setIsDrawing(true);
        nativeEvent.preventDefault();
    }

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
        setDrawing([...drawing, { x: offsetX, y: offsetY }]);
        nativeEvent.preventDefault();
    }

    const stop = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    }

    const clear = () => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        setDrawing([]);
    };

    const restore = (points) => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        contextRef.current.beginPath();
        points.forEach((point, index) => {
            if (index === 0) {
                contextRef.current.moveTo(point.x, point.y);
            } else {
                contextRef.current.lineTo(point.x, point.y);
            }
        });
        contextRef.current.stroke();
    };

    const onSuccessClose = () => {
        setSuccessAlert(false);
    }

    const onFailureClose = () => {
        setFailureAlert(false);
    }

    return (
        <>
            {successAlert.status ?
                <Alert
                    message={successAlert.message}
                    type="success"
                    closable
                    onClose={() => onSuccessClose()}
                />
                : null}
            {failureAlert.status ?
                <Alert
                    message={failureAlert.message}
                    type="error"
                    closable
                    onClose={() => onFailureClose()}
                />
                : null}
            <br/><br/>
            <Space size={"middle"} direction="vertical">
            <Input value={boardName} onChange={(e) => setBoardName(e.target.value)} placeholder="Board Name" />
            <canvas
                className="canvas-wrapper"
                ref={canvasRef}
                height={350}
                width={750}
                onMouseDown={start}
                onMouseMove={draw}
                onMouseUp={stop}
                onMouseLeave={stop}
            >
            </canvas>
            <div style={{ float: 'right' }}>
                <Button
                    type="default"
                    onClick={() => navigate('/boards')}
                >
                    Back
                </Button>
                &ensp;
                <Button
                    type="primary"
                    onClick={() => clear()}
                >
                    Clear
                </Button>
                &ensp;
                <Button
                    type="primary"
                    danger
                    onClick={() => validate()}
                >
                    Save
                </Button>
            </div>
            </Space>
        </>
    );
}

export default CanvasBoard;
