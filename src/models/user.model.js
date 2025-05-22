const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const supabase = require('../config/supabase');

class UserModel {
  static async getUserByEmail(email) {
    const response = await supabase.from('users').select().eq('email', email);

    return response;
  }

  static async getUserByUsername(username) {
    const response = await supabase
      .from('users')
      .select()
      .eq('username', username);

    return response;
  }

  static async createUser(body) {
    const { username, firstname, lastname, email, password } = body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const response = await supabase
      .from('users')
      .insert([
        {
          id: uuidv4(),
          username: username,
          firstname: firstname,
          lastname: lastname,
          email: email,
          password_hash: hashedPassword,
        },
      ])
      .select();

    return response;
  }
}

module.exports = UserModel;
