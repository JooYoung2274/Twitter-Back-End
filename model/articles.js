const { Articles } = require("../models/index");

const createArticle = async (content, img, nickname, loginId, userId) => {
  try {
    const article = await Articles.create({
      content: content,
      img: img,
      nickname: nickname,
      loginId: loginId,
      userId: userId,
    });
    return article;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const findArticles = async () => {
  try {
    const articles = await Articles.findAll();
    console.log(articles);
    return articles;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const findArticle = async (input) => {
  try {
    const article = await Articles.findOne({ where: input });
    return article;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateAriticles = async (articleId, content, img) => {
  try {
    await Articles.update(
      { content: content, img: img },
      { where: { articleId: articleId } }
    );
    return;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteArticles = async (articleId) => {
  try {
    await Articles.destroy({ where: articleId });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  createArticle,
  findArticles,
  findArticle,
  updateAriticles,
  deleteArticles,
};
