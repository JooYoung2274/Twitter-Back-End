const commentsModel = require("../model/comments");

const commentsGet = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const comments = await commentsModel.findComments({ articleId });
    res.status(200).json({ comments });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const commentPost = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const { comment } = req.body;
    const { nickname, loginId, userId } = res.locals.user;

    if (!comment) {
      res.sendStatus(400);
      return;
    }
    const commentData = await commentsModel.createComment(
      articleId,
      comment,
      nickname,
      loginId,
      userId
    );
    res.status(200).json({ commentData });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const commentDelete = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { userId } = res.locals.user;
    const comment = await commentsModel.findComment({ commentId });
    if (comment.userId !== userId) {
      res.sendStatus(400);
      return;
    } else {
      await commentsModel.deleteComment({ commentId });
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { commentsGet, commentPost, commentDelete };
