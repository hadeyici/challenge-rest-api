/* eslint-disable guard-for-in */
import express from 'express';
import Record from '../models/Record';

/**
 * Express router to mount records function on.
 * @type {object}
 * @const
 * @namespace recordsRouter
 */

const router = express.Router();

/**
 * Route records data.
 * @async
 * @function
 * @name post/
 * @memberof module:routers/records~recordsRouter
 * @param {express.Request & {minCount: number, maxCount: number, startDate: string, endDate: string}} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Object} Returns an records.
 */

router.post('/', async (req, res) => {
  const {
    body: {
      startDate, endDate, minCount, maxCount,
    },
  } = req;
  const record = new Record({
    startDate,
    endDate,
    minCount,
    maxCount,
  });
  const validateErr = record.validateSync();
  if (validateErr) {
    // eslint-disable-next-line prefer-const
    let errorMsg = [];
    if (validateErr.name === 'ValidationError') {
      // eslint-disable-next-line no-restricted-syntax
      for (const field in validateErr.errors) {
        errorMsg.push(validateErr.errors[field].message);
      }
      return res.send({ code: 1, msg: errorMsg, records: [] });
    }
  }
  const getRecords = await Record.aggregate([
    {
      $set: {
        totalCount: { $sum: '$counts' },
        yearMonthDayUTC: {
          $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
        },
      },
    },
    {
      $match: {
        $and: [
          {
            yearMonthDayUTC: {
              $gte: startDate,
              $lte: endDate,
            },
          },
          {
            totalCount: {
              $gte: parseInt(minCount, 10),
              $lte: parseInt(maxCount, 10),
            },
          },
        ],
      },
    },
    { $unset: ['_id', 'yearMonthDayUTC', 'value', 'counts'] },
    { $sort: { createdAt: 1 } },
  ]).catch(
    (e) => e && res.status(404).send({ code: 1, msg: 'Error', records: [] }),
  );

  return res.send({ code: 0, msg: 'Success', records: getRecords });
});

export default router;
