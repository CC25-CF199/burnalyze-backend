const fs = require('fs');
const FormData = require('form-data');
const fetch = require('node-fetch');

class MachineLearningModel {
  static async getPrediction(uploadedImage) {
    try {
      const fd = new FormData();
      fd.append('file', fs.createReadStream(uploadedImage.path));

      const response = await fetch(`${process.env.ML_API}/predict`, {
        method: 'POST',
        body: fd,
      });

      return response.json();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MachineLearningModel;
