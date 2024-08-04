const getAllRoles = async (instance) => {
  const { rows } = await instance.pg.query("SELECT * FROM roles");
  return await rows;
};

export default getAllRoles;
