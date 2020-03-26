const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  createdAt: { type: Date, default: new Date() }
})

const DaySchema = new Schema({
  day: { type: String },
  confirmed: { type: Number }
}, { id: false })

const day = mongoose.model('day', DaySchema)

const CountrySchema = new Schema({
  date: String,
  location: String,
  new_cases: Number,
  new_deaths: Number,
  total_cases: Number,
  total_deaths: Number,
})

const TodaySchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600
  },
  country: String,
  cases: Number,
  todayCases: Number,
  deaths: Number,
  todayDeaths: Number,
  recovered: Number,
  critical: Number,
})

const TodayModel = mongoose.model('today', TodaySchema);
TodayModel.index({ "createdAt": 1 }, { expireAfterSeconds: 3600 })

const CountryModel = mongoose.model('country', CountrySchema)
const ResourceModel = mongoose.model('resource', ResourceSchema)

module.exports = {
  TodayModel,
  CountryModel,
  ResourceModel
}
