const mongoose = require('mongoose')
const Schema = mongoose.Schema;

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
    default: new Date()
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
const CountryModel = mongoose.model('country', CountrySchema)

module.exports = {
  TodayModel,
  CountryModel
}
