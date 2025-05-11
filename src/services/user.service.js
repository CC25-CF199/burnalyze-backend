const supabase = require('../config/supabase');

const getUserByEmail = async email => {
  const { data, error } = await supabase
    .from('users')
    .select('email')
    .eq('email', email)
    .single();

  if (data) {
    return data;
  }
};

module.exports = {
  getUserByEmail,
};
