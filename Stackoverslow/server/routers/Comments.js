const express = require('express');

const router = express.Router();

const Commentdb = require('../models/Comments');

router.post('/', async (req, res) => {
  const Commentdata = new Commentdb({
    question_id: req.params.id,
    comment: req.body.comment,
    user: req.body.user,
  });

  await Commentdata.save().then((doc) => {
    res
      .status(201)
      .send({
        status: true,
        data: doc,
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
