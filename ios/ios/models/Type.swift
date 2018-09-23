//
// Created by Andy Wong on 2018-09-22.
// Copyright (c) 2018 lawonga. All rights reserved.
//

import Foundation
import UIKit

class Type: NSObject {
    let label: String
    let image: UIImage?
    static let allValues = [
        Type(label: "Business suits and sport jackets", image: UIImage(named: "BUS_Blazer")),
        Type(label: "Slacks and pants", image: UIImage(named: "BUS_Pants")),
        Type(label: "Business shoes and belts", image: UIImage(named: "BUS_Belt")),
        Type(label: "Dress Shirts", image: UIImage(named: "BUS_shirt")),
        Type(label: "Business casual attire", image: UIImage(named: "BUS_shoe")),
        Type(label: "Outerwear", image: UIImage(named: "BUS_Suit")),
        Type(label: "Steel toed work boots", image: UIImage(named: "CON_gloves")),
        Type(label: "Work overalls", image: UIImage(named: "CON_overalls")),
        Type(label: "Rain gear", image: UIImage(named: "CON_raingear")),
        Type(label: "Work gloves", image: UIImage(named: "CON_gloves")),
        Type(label: "Tool belts", image: UIImage(named: "CON_toolbelt")),
        Type(label: "Hard hats and goggles", image: UIImage(named: "CON_Goggles")),
    ]

    init(label: String, image: UIImage?) {
        self.label = label
        self.image = image;
    }
}
