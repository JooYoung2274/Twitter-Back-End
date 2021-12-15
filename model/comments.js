const { Comments } = require("../models/index");

const findComments = async (articleId) => {
  try {
    const comments = await Comments.findAll({ where: articleId });
    return comments;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const findComment = async (commentId) => {
  try {
    const commentData = await Comments.findOne({ where: { _id: commentId } });
    return commentData;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const createComment = async (articleId, comment, nickname, loginId, userId) => {
  try {
    const commentData = await Comments.create({
      articleId: articleId,
      comment: comment,
      nickname: nickname,
      loginId: loginId,
      userId: userId,
    });
    return commentData;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteComment = async (commentId) => {
  try {
    const result = await Comments.destroy({ where: commentId });
    return result;
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { findComments, createComment, findComment, deleteComment };
