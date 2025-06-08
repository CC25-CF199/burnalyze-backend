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

  static async storeWoundImage(uploadedImage, user_id) {
    const fileBuffer = fs.readFileSync(uploadedImage.path);

    // Create unique filename with original extension
    const fileExt = path.extname(uploadedImage.originalname);
    const fileName = `${Date.now()}_${uuidv4()}${fileExt}`;
    const storagePath = `burns/${user_id}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('wound-img-records')
      .upload(storagePath, fileBuffer, {
        contentType: uploadedImage.mimetype, // Use mimetype from multer
        cacheControl: '3600',
      });

    if (error) {
      throw error;
    }
    return data.path;
  }

  static async getSignedImgUrl(storagePath) {
    const { data, error } = await supabase.storage
      .from('wound-img-records')
      .createSignedUrl(storagePath, 3600);

    if (error) {
      throw error;
    }
    return data.signedUrl;
  }

  static async storeUserDetectionData(body) {
    const {
      user_id,
      woundClass,
      burnType,
      desc,
      treatments,
      image_path,
      body_part,
      burn_degree_confidence,
      body_part_confidence,
    } = body;

    const response = await supabase.from('detection_histories').insert([
      {
        id: uuidv4(),
        user_id: user_id,
        class: woundClass,
        burn_type: burnType,
        desc: desc,
        treatments: treatments,
        image_path: image_path,
        body_part: body_part,
        burn_degree_confidence: burn_degree_confidence,
        body_part_confidence: body_part_confidence,
      },
    ]);

    return response;
  }
}

module.exports = DetectionModel;
