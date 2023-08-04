const BoardService  = require('../service/BoardService');

const getBoard = async (req,res)=>{
    try{
        const result = await BoardService.getBoard(req.params.boardId);
        res.status(200);
        res.send(result);
    }catch(error){
        console.log("Error:",error);
        res.status(500);
        res.send(error.message);
    }
}

const getBoards = async (req,res)=>{
    try{
        const result = await BoardService.getBoards(req.params.userId);
        res.status(200);
        res.send(result);
    }catch(error){
        console.log("Error:",error);
        res.status(500);
        res.send(error.message);
    }
}

const createBoard = async (req,res)=>{
    try{
        await BoardService.createBoard(req.body);
        res.status(201);
        res.send("Board created successfully");
    }catch(error){
        console.log("Error:",error);
        res.status(500);
        res.send(error.message);
    }
}

const updateBoard = async (req,res)=>{
    try{
        const result = await BoardService.updateBoard(req.body);
        res.status(200);
        res.send(result);
    }catch(error){
        console.log("Error:",error);
        res.status(500);
        res.send(error.message);
    }
}

const deleteBoard = async (req,res)=>{
    try{
        await BoardService.deleteBoard(req.params.boardId);
        res.status(204);
        res.send("Deleted Successfully");
    }catch(error){
        console.log("Error:",error);
        res.status(500);
        res.send(error.message);
    }
}

module.exports = {
    getBoard,
    getBoards,
    createBoard,
    updateBoard,
    deleteBoard
}