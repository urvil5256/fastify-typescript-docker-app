const getAllUsers = async (instance) => {
  const { rows } = await instance.pg.query("SELECT * FROM users");
  return await rows;
};

export default getAllUsers;
