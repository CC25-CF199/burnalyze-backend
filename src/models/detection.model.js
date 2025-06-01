const fs = require('fs');
const FormData = require('form-data');
const fetch = require('node-fetch');
const supabase = require('../config/supabase');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

class DetectionModel {
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

  // static async storeWoundImage(uploadedImage) {
  //   const fileBuffer = fs.readFileSync(uploadedImage.path);

  //   // Create unique filename with original extension
  //   const fileExt = path.extname(uploadedImage.originalname);
  //   const fileName = `${Date.now()}_${uuidv4()}${fileExt}`;

  //   const { error } = await supabase.storage
  //     .from('wound-img-records')
  //     .upload(fileName, fileBuffer, {
  //       contentType: uploadedImage.mimetype, // Use mimetype from multer
  //       cacheControl: '3600',
  //     });

  //   if (error) {
  //     throw error;
  //   }

  //   const { data: imgUrl } = await supabase.storage
  //     .from('wound-img-records')
  //     .getPublicUrl(fileName);

  //   return imgUrl;
  // }

  static async storeUserDetectionData(body) {
    const { user_id, woundClass, desc, treatments } = body;

    const response = await supabase.from('detection_histories').insert([
      {
        id: uuidv4(),
        user_id: user_id,
        class: woundClass,
        desc: desc,
        treatments: treatments,
      },
    ]);

    return response;
  }
}

module.exports = DetectionModel;
