class MachineLearningModel {
  static async getPrediction() {
    try {
      const response = await fetch(`${process.env.ML_API}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MachineLearningModel;
