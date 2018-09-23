//
// Created by Andy Wong on 2018-09-22.
// Copyright (c) 2018 lawonga. All rights reserved.
//

import Foundation

class Post: Codable {
    let id: String
    let count: Int

    init(id: String, count: Int) {
        self.id = id
        self.count = count
    }
}