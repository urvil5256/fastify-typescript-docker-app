const getAllDepartment = async (instance) => {
  const { rows } = await instance.pg.query("SELECT * FROM department");
  return await rows;
};

export default getAllDepartment;
