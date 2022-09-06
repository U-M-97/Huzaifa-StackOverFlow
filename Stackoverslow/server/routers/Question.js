const express = require('express');
const { mongoose } = require('mongoose');

const router = express.Router();
const QuestionDB = require('../models/Questions');

router.post('/', async (req, res) => {
  const Questiondata = new QuestionDB({
    title: req.body.title,
    body: req.body.body,
    tags: req.body.tag,
    user: req.body.user,
  });

  await Questiondata.save().then((doc) => {
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

router.get('/', async (req, res) => {
  QuestionDB.aggregate([
    {
      $lookup: {
        from: 'comments',
        let: { question_id: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$question_id', '$$question_id'],
              },
            },
          },
          {
            $project: {
              _id: 1,
              comment: 1,
              created_at: 1,
            },
          },
        ],
        as: 'comments',
      },
    },
    {
      $lookup: {
        from: 'answers',
        let: { question_id: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['question_id', 'question_id'],
              },
            },
          },
          {
            $project: {
              _id: 1,
            },
          },
        ],
        as: 'answersDetails',
      },
    },
    {
      $project: {
        __v: 0,
      },
    },
  ])
    .exec()
    .then((questiondetails) => {
      res.status(201).send(questiondetails);
    })
    .catch((e) => {
      console.log(e);
    });
});

router.get('/:id', (req, res) => {
  try {
    QuestionDB.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(req.params.id) },
      },
      {
        $lookup: {
          from: 'answers',
          let: { question_id: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$question_id', '$$question_id'],
                },
              },
            },
            {
              $project: {
                id: 1,
                user: 1,
                answer: 1,
                question_id: 1,
                created_at: 1,
              },
            },
          ],
          as: 'answerDetails',
        },
      },
      {
        $lookup: {
          from: 'comments',
          let: { question_id: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$question_id', '$$question_id'],
                },
              },
            },
            {
              $project: {
                _id: 1,
                question_id: 1,
                user: 1,
                created_at: 1,
              },
            },
          ],
          as: 'comments',
        },
      },

      {
        $project: {
          __v: 0,
        },
      },
    ])
      .exec()
      .then((questiondetails) => {
        res.status(201).send(questiondetails);
      })
      .catch((e) => {
        console.log(e);
        res.status(400);
      });
  } catch (e) {
    res.status(401).send({
      message: 'Question not found',
    });
  }
});

module.exports = router;
