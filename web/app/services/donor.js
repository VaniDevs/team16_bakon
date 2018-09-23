'use strict';

const donorModel = require('../core/database').models.donor;

class DonorService {
  constructor() {
  }

  static create(donor) {
    return donorModel.create(donor);
  }

  static getAll() {
    return donorModel.find({});
  }

  static async countAll() {
    let donors = await donorModel.find({});
    return donors.length;
  }
}

module.exports = DonorService;
