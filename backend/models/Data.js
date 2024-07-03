const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  currency: {
    type: String,
    required: true
  },
  invBasicAmt: {
    type: Number,
    required: true
  },
  invTaxAmt: {
    type: Number,
    required: true
  },
  totalInvAmt: {
    type: Number,
    required: true
  },
  advancePaid: {
    type: Number,
    required: true
  },
  tcsApplicable: {
    type: String,
    required: true
  },
  netPayableAmt: {
    type: Number,
    required: true
  },
  alternatePayee1: {
    type: String,
    required: true
  },
  alternatePayee2: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  bankKey: {
    type: String,
    required: true
  },
  bankAccNo: {
    type: String,
    required: true
  },
  referenceNumber: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Data', dataSchema);
