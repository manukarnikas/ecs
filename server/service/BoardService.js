const Board = require('../model/Board');

const createBoard = async (data) => {
    try {
      await new Board(data).save();
      return;
    } catch (err) {
      throw err;
    }
};

const getBoard = async (id) => {
  try {
    const result = await Board.find({ _id: id }).exec();
    if(!result?.length){
      throw new Error("Board not found");
    }
    return result?.[0];
  } catch (err) {
    throw err;
  }
};

const getBoards = async (userId) => {
    try {
      const result = await Board.find({ userId }).exec();
      if(!result?.length){
        throw new Error("Boards not found");
      }
      return result;
    } catch (err) {
      throw err;
    }
};

const updateBoard = async (data) => {
    try {
        const result = await Board.findOneAndUpdate({ _id: data._id },data);
        return result;
    } catch (err) {
      throw err;
    }
};

const deleteBoard = async (id) => {
    try {
      await Board.findOneAndDelete({ _id: id });
      return;
    } catch (err) {
      throw err;
    }
};

module.exports = {
    createBoard,
    getBoard,
    getBoards,
    updateBoard,
    deleteBoard
}
