const getAllUsers = async (instance) => {
  console.log(" >>>>>>>>>>>>>>>>>>:");
  const { rows } = await instance.pg.query("SELECT * FROM users");
  return rows;
};

export default getAllUsers;
