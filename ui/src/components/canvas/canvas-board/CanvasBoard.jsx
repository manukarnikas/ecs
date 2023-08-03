import React, { useState, useEffect, useRef } from "react";
import { Button, Alert } from "antd";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CanvasBoard.css';

const CanvasBoard = () => {

    const [drawing, setDrawing] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [failureAlert, setFailureAlert] = useState(false);

    const canvasRef = useRef(null);
    const contextRef = useRef(null);

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

    useEffect(() => {
        if (id) {
            restore();
        }
    }, [drawing])

    const getBoard = (id) => {
        const url = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${url}/board/${id}`)
            .then(function (response) {
                setDrawing(response?.data?.points);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const save = (data) => {
        const url = process.env.REACT_APP_BASE_URL;
        axios
            .post(`${url}/board`, {
                points: data,
            })
            .then(function (response) {
               setSuccessAlert(true);
            })
            .catch(function (error) {
                setFailureAlert(true);
                console.error(error);
            });
    };

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

    const restore = () => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        contextRef.current.beginPath();
        drawing.forEach((point, index) => {
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
                    message={`Board saved successfully!`}
                    type="success"
                    closable
                    onClose={() => onSuccessClose()}
                />
                : null}
            {failureAlert.status ?
                <Alert
                    message={`Failed to save Board!`}
                    type="error"
                    closable
                    onClose={() => onFailureClose()}
                />
                : null}
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
            <br />
            <br />
            <div style={{ float: 'right' }}>
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
                    onClick={() => save(drawing)}
                >
                    Save
                </Button>
            </div>
        </>
    );
}

export default CanvasBoard;
