const createError = require('http-errors');
const { UserModel } = require('../models');

const getSignedUrls = async histories => {
  if (!Array.isArray(histories)) {
    const { data, error } = await UserModel.getSignedImgUrl(
      histories.image_path
    );

    if (error) {
      throw createError(error);
    }

    return data.signedUrl;
  }

  return Promise.all(
    histories.map(async history => {
      const { data, error } = await UserModel.getSignedImgUrl(
        history.image_path
      );

      if (error) {
        throw createError(error);
      }

      const { image_path: excluded, ...rest } = history;
      return {
        ...rest,
        image_url: data.signedUrl,
      };
    })
  );
};

module.exports = { getSignedUrls };
