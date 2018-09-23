//
//  ApparelTableViewCell.swift
//  ios
//
//  Created by Andy Wong on 2018-09-22.
//  Copyright © 2018 lawonga. All rights reserved.
//

import UIKit

class ApparelTableViewCell: UITableViewCell {

    @IBOutlet weak var apparelImageView: UIImageView!
    @IBOutlet weak var apparelDescription: UILabel!
    @IBOutlet weak var apparelName: UILabel!

    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
}
