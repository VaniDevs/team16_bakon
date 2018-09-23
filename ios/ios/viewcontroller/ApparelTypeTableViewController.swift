//
//  ApparelTypeTableViewController.swift
//  ios
//
//  Created by Andy Wong on 2018-09-22.
//  Copyright © 2018 lawonga. All rights reserved.
//

import UIKit
import os.log

protocol ApparelTypeTableViewControllerDelegate: class {
    func didSelectType(_ type: Type)
}

class ApparelTypeTableViewController: UITableViewController {
    var types = Type.allValues

    weak var delegate: ApparelTypeTableViewControllerDelegate?
    
    override func viewDidLoad() {
        super.viewDidLoad()

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

    override func numberOfSections(in tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return types.count
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let cellIdentifier = "ApparelTypeTableViewCell"
        guard let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as? ApparelTypeTableViewCell else {
            fatalError("Table cell incorrect")
        }

        // Configure the cell...
        cell.typeTextLabel?.text = types[indexPath.row].label
        cell.typeImageView?.image = types[indexPath.row].image

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
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
        let type = types[indexPath.row]
        
        delegate?.didSelectType(type)
        navigationController!.dismiss(animated: true, completion: nil)
    }

    // MARK: Navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        super.prepare(for: segue, sender: sender)

        // Verify that the sender is a button
        
        guard let apparelViewController = segue.destination as? ApparelViewController else {
            fatalError("Unexpected destination: \(segue.destination)")
        }

        guard let selectedType = sender as? Type else {
            fatalError("Unexpected sender: \(sender)")
        }

        apparelViewController.setType(selectedType)
        dismiss(animated: true, completion: nil)
    }

    @IBAction func cancel(_ sender: UIBarButtonItem) {
        dismiss(animated: true, completion: nil) // Dismiss if we're 'adding' a new one
    }
}
