const articlesModel = require("../model/articles");

const articlePost = async (req, res, next) => {
  try {
    const { nickname, loginId, userId } = res.locals.user;
    const { content } = req.body;
    let img = "";
    if (!content || !req.files.img) {
      res.sendStatus(400);
      return;
    }
    req.files.img.forEach((v) => {
      img += "localhost" + ":3000" + "/" + v.filename + ";";
    });
    const result = await articlesModel.createArticle(
      content,
      img,
      nickname,
      loginId,
      userId
    );
    console.log(result);
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const articleGet = async (req, res, next) => {
  try {
    const result = await articlesModel.findArticles();
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const articleUpdate = async (req, res, next) => {
  try {
    const { nickname } = res.locals.user;
    const { content } = req.body;
    const { articleId } = req.params;
    const article = await articlesModel.findArticle({ articleId });
    if (article.nickname !== nickname) {
      res.sendStatus(400);
      return;
    }
    if (!content) {
      res.sendStatus(400);
      return;
    }
    let img = article.img;
    if (req.files.img) {
      img = "";
      req.files.img.forEach((v) => {
        img += "localhost" + ":3000" + "/" + v.filename;
      });
    }
    await articlesModel.updateAriticles(articleId, content, img);
    const editArticle = await articlesModel.findArticle({ articleId });
    res.status(200).json({ editArticle });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const artiecleDelete = async (req, res, next) => {
  try {
    const { nickname } = res.locals.user;
    const articleId = req.params;

    const article = await articlesModel.findArticle(articleId);
    if (article.nickname !== nickname) {
      res.sendStatus(400);
      return;
    }
    await articlesModel.deleteArticles(articleId);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { articlePost, articleGet, articleUpdate, artiecleDelete };
