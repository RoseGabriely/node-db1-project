const router = require("express").Router();
const {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
} = require("./accounts-middleware");
const Account = require("./accounts-model");

router.get("/", (req, res, next) => {
  Account.getAll()
    .then((accounts) => {
      res.json(accounts);
    })
    .catch(next);
});

router.get("/:id", checkAccountId, (req, res, next) => {
  return res.json(req.account);
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    Account.create({
      name: req.body.name.trim(),
      budget: req.body.budget,
    })
      .then((newAccount) => {
        res.status(201).json(newAccount);
      })
      .catch(next);
  }
);

router.put(
  "/:id",
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    Account.updateById(req.params.id, req.body)
      .then((updatedAccount) => {
        res.status(200).json(updatedAccount);
      })
      .catch(next);
  }
);

router.delete("/:id", checkAccountId, async (req, res, next) => {
  Account.deleteById(req.params.id)
    .then((deletedAccount) => {
      res.json(deletedAccount);
    })
    .catch(next);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
