const getAllOrganizations = async (instance) => {
  const { rows } = await instance.pg.query("SELECT * FROM organization");
  return await rows;
};

export default getAllOrganizations;
