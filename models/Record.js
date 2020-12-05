import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * @class Record
 */

const RecordSchema = new Schema({
  startDate: {
    type: String,
    required: [true, '`startDate` is required'],
  },
  endDate: {
    type: String,
    required: [true, '`endDate` is required'],
  },
  minCount: {
    type: Number,
    required: [true, '`minCount` is required'],
  },
  maxCount: {
    type: Number,
    required: [true, '`maxCount` is required'],
  },
});

const Record = mongoose.model('Record', RecordSchema);

export default Record;
