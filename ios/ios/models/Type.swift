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
        Type(label: TypeEnums.Business_suits.rawValue, image: UIImage(named: "BUS_Blazer")),
        Type(label: TypeEnums.Sport_Jackets.rawValue, image: UIImage(named: "BUS_Blazer")),
        Type(label: TypeEnums.Slacks_and_pants.rawValue, image: UIImage(named: "BUS_Pants")),
        Type(label: TypeEnums.Business_shoes.rawValue, image: UIImage(named: "BUS_Belt")),
        Type(label: TypeEnums.Belts.rawValue, image: UIImage(named: "BUS_Belt")),
        Type(label: TypeEnums.Dress_Shirts.rawValue, image: UIImage(named: "BUS_shirt")),
        Type(label: TypeEnums.Business_casual_attire.rawValue, image: UIImage(named: "BUS_shoe")),
        Type(label: TypeEnums.Outerwear.rawValue, image: UIImage(named: "BUS_Suit")),
        Type(label: TypeEnums.Steel_toed_work_boots.rawValue, image: UIImage(named: "CON_gloves")),
        Type(label: TypeEnums.Work_overalls.rawValue, image: UIImage(named: "CON_overalls")),
        Type(label: TypeEnums.Rain_gear.rawValue, image: UIImage(named: "CON_raingear")),
        Type(label: TypeEnums.Work_gloves.rawValue, image: UIImage(named: "CON_gloves")),
        Type(label: TypeEnums.Tool_belts.rawValue, image: UIImage(named: "CON_toolbelt")),
        Type(label: TypeEnums.Hard_hats_and_goggles.rawValue, image: UIImage(named: "CON_Goggles")),
    ]

    init(label: String, image: UIImage?) {
        self.label = label
        self.image = image;
    }
}

enum TypeEnums: String {
    case Business_suits = "Business suits",
         Sport_Jackets = "Sport Jackets",
         Slacks_and_pants = "Slacks and pants",
         Business_shoes = "Business shoes",
         Belts = "Belts",
         Dress_Shirts = "Dress Shirts",
         Business_casual_attire = "Business casual attire",
         Outerwear = "Outerwear",
         Steel_toed_work_boots = "Steel toed work boots",
         Work_overalls = "Work overalls",
         Rain_gear = "Rain gear",
         Work_gloves = "Work gloves",
         Tool_belts = "Tool belts",
         Hard_hats_and_goggles = "Hard hats and goggles"
}