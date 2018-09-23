'use strict';

const itemModel = require('../core/database').models.item;

const donorService = require('./donor');
const appointmentService = require('./appointment');

class ItemService {
  constructor() {
  }

  static create (item) {
    return itemModel.create(item);
  }

  static async getAll() {
    let items = await itemModel.find({});

    let itemsByGroup = {};
    items.forEach(item => {
      if(itemsByGroup[item.category] === undefined) { 
        itemsByGroup[item.category] = [];
      }

      itemsByGroup[item.category].push({
        _id: item._id,
        size: item.size
      });
    });

    return itemsByGroup;
  }
  
  static async getInStore(groupBy = true) {
    let items = await itemModel.find({}, 'count category size');
    if(!groupBy) { return items; }
    return ItemService.groupByCategory(items);
  }

  static async getPending() {
    let appointments = await appointmentService.getPending();
    return ItemService.populate(appointments);
  }

  static async getReleased() {
    let appointments = await appointmentService.getReleased();
    return ItemService.populate(appointments);
  }

  static async populate(appointments) {
    let result = [];
    let itemsByCategory = {};
    for(let j = 0; j < appointments.length; j++) {
      for(let i = 0; i < appointments[j].items.length; i++) {
        let item = await itemModel.findById(appointments[j].items[i], 'category size');
        if(itemsByCategory[item.category] === undefined) {
          itemsByCategory[item.category] = 0;
        }
        itemsByCategory[item.category] += 1;
      }
    }


    // Object.keys(itemsByCategory).forEach(category => {
    //   result.push({
    //     count: itemsByCategory[category].count,
    //     category: category
    //   });
    // });


    return itemsByCategory;
  }

  static groupByCategory(items) {
    let itemsByGroup = {};
    items.forEach(item => {
      if(itemsByGroup[item.category] === undefined) { 
        itemsByGroup[item.category] = 0;
      }

      itemsByGroup[item.category] += item.count;
    });

    return itemsByGroup;
  }

  static async drop(data) {
    try {
      // duplicate
      await donorService.create({ email: data.email });
    } catch(err) {
      console.log(err);
    }

    let droppedItems = data.items;
    console.log(data)
    for(let j = 0; j < droppedItems.length; j++) {
      let droppedItem = await itemModel.findById(droppedItems[j]._id);

      droppedItem.count += droppedItems[j].count;
      await droppedItem.save();
    }
  }

  static async pick(appointmentId, itemsPicked) {
    // update appointment (status, and items)
    let appointment = await appointmentService.findById(appointmentId);
    appointment.status = 'Released';
    appointment.items = itemsPicked.map(item => item._id);
    appointment.date = new Date();
    await appointment.save();

    // update items stats
    for(let j = 0; j < itemsPicked.length; j++) {
      let pickedItem = await itemModel.findById(itemsPicked[j]._id);

      pickedItem.count -= itemsPicked[j].count;
      await pickedItem.save();
    }
  }
}

module.exports = ItemService;
