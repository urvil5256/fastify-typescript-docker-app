const getAllEmployee = async (instance) => {
  const { rows } = await instance.pg.query("SELECT * FROM employee");
  return await rows;
};

export default getAllEmployee;
