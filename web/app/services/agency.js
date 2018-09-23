'use strict';

const agencyModel = require('../core/database').models.agency;

class AgencyService {
  constructor() {
  }

  static create(agency) {
    return agencyModel.create(agency);
  }

  static getAll() {
    return agencyModel.find({});
  }

  static findById(agencyId) {
    return agencyModel.findById(agencyId);
  }
}

module.exports = AgencyService;
