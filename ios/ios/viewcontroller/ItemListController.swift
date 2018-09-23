//
//  ItemListController.swift
//  ios
//
//  Created by Andy Wong on 2018-09-22.
//  Copyright © 2018 lawonga. All rights reserved.
//

import UIKit

class ItemListController: UIViewController,
    UITableViewDelegate,
    UITableViewDataSource {
    var apparels = [Apparel]()

    @IBOutlet weak var tableView: UITableView!

    override func viewDidLoad() {
        super.viewDidLoad()

        loadSampleApparel()

        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Table view data source

    func numberOfSections(in tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return apparels.count
    }

    private func loadSampleApparel() {
        let apparel1 = Apparel(quantity: 12)
        let apparel2 = Apparel(quantity: 2)
        let apparel3 = Apparel(quantity: 3)

        apparels += [apparel1, apparel2, apparel3]
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cellIdentifier = "ApparelCell"
        guard let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as? ApparelTableViewCell else {
            fatalError("Table cell incorrect")
        }

        let apparel = apparels[indexPath.row]
        let apparelQuantity = String(apparel.quantity ?? 0)
        cell.apparelDescription.text = apparelQuantity + " items"
        return cell
    }

    /*
    // Override to support conditional editing of the table view.
    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }
    */

    /*
    // Override to support editing the table view.
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            // Delete the row from the data source
            tableView.deleteRows(at: [indexPath], with: .fade)
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }
    */

    /*
    // Override to support rearranging the table view.
    override func tableView(_ tableView: UITableView, moveRowAt fromIndexPath: IndexPath, to: IndexPath) {

    }
    */

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the item to be re-orderable.
        return true
    }
    */

    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
//    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
//        guard let selectedApparelCell =
//        guard let indexPath = tableView.indexPath(for: )
//        let selectedApparel = apparels[]
//    }

    // Mark: Actions
    @IBAction func unwindToApparelList(sender: UIStoryboardSegue) {
        if let sourceViewController = sender.source as? ApparelViewController,
           let apparel = sourceViewController.apparel {
            let newIndexPath = IndexPath(row: apparels.count, section: 0)
            apparels.append(apparel)
            tableView.insertRows(at: [newIndexPath], with: .automatic)
        }
    }
    
}
