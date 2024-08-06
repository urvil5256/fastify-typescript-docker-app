const getAllUsers = async (instance) => {
  const { rows } = await instance.pg.query("SELECT * FROM users");
  return rows;
};

export default getAllUsers;
