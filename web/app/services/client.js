'use strict';

const clientModel = require('../core/database').models.client;

class ClientService {
  constructor() {
  }

  static create(client) {
    return clientModel.create(client);
  }

  static getAll() {
    return clientModel.find({});
  }

  static async countAll() {
    let clients = await clientModel.find({});
    return clients.length;
  }

  static findById(clientId) {
    return clientModel.findById(clientId);
  }

  static async clientsByMinority() {
    let clients = await clientModel.find({});
    let groupByMinority = {};
    for(let j = 0; j < clients.length; j++) {
      let minority = (clients[j].minority)? clients[j].minority: 'Other';
      if (groupByMinority[minority] === undefined) { groupByMinority[minority] = 0; }
      groupByMinority[minority] += 1;
    }

    return groupByMinority;
  }
}

module.exports = ClientService;
