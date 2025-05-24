const { v4: uuidv4 } = require('uuid');

const { hashPassword } = require('../utils/userPassword');
const supabase = require('../config/supabase');

class UserModel {
  static async getUserById(id) {
    const response = await supabase
      .from('users')
      .select()
      .eq('id', id)
      .maybeSingle();

    return response;
  }

  static async getUserByEmail(email) {
    const response = await supabase
      .from('users')
      .select()
      .eq('email', email)
      .maybeSingle();

    return response;
  }

  static async getUserByUsername(username) {
    const response = await supabase
      .from('users')
      .select()
      .eq('username', username)
      .maybeSingle();

    return response;
  }

  static async createUser(body) {
    const { username, firstname, lastname, email, password } = body;

    const { hash, salt } = hashPassword(password);

    const response = await supabase
      .from('users')
      .insert([
        {
          id: uuidv4(),
          username: username,
          firstname: firstname,
          lastname: lastname,
          email: email,
          password_hash: hash,
          password_salt: salt,
        },
      ])
      .select();

    return response;
  }
}

module.exports = UserModel;
