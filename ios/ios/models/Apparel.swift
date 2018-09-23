//
// Created by Andy Wong on 2018-09-22.
// Copyright (c) 2018 lawonga. All rights reserved.
//

import Foundation

class Apparel: NSObject, NSCoding {
    var size: Size?
    var type: Type?
    var quantity: Int?

    init(quantity: Int){
        self.quantity = quantity
        self.type = Type.allValues[0]
        self.size = Size.L
    }

    init(size: Size, type: Type, quantity: Int){
        self.quantity = quantity
        self.type = type
        self.size = size
    }

    required convenience init?(coder aDecoder: NSCoder) {
        guard let size = aDecoder.decodeObject(forKey: PropertyKey.size) as? Size else {
            fatalError("Big problem with size")
        }

        guard let type = aDecoder.decodeObject(forKey: PropertyKey.type) as? Type else {
            fatalError("Big problem with type")
        }

        guard let quantity = aDecoder.decodeObject(forKey: PropertyKey.quantity) as? Int else {
            fatalError("Big problem with quantity")
        }

        self.init(size: size, type: type, quantity: quantity)
    }

    func encode(with aCoder: NSCoder) {
        aCoder.encode(size, forKey: PropertyKey.size)
        aCoder.encode(type, forKey: PropertyKey.type)
        aCoder.encode(quantity, forKey: PropertyKey.quantity)
    }

    struct PropertyKey {
        static let size = "size"
        static let type = "type"
        static let quantity = "quantity"
    }
}
