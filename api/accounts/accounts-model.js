const db = require("../../data/db-config");

const getAll = () => {
  return db("accounts");
};

const getById = (id) => {
  return db("accounts").where({ id }).first();
};

const create = async (account) => {
  const [id] = await db("accounts").insert(account);
  const newAccount = await getById(id);
  return newAccount;
};

const updateById = async (id, account) => {
  await db("accounts").update(account).where({ id });
  return getById(id);
};

const deleteById = async (id) => {
  const deleted = await getById({ id });
  await db("accounts").del().where({ id });
  return deleted;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
