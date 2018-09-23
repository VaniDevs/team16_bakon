//
//  ApparelViewController.swift
//  ios
//
//  Created by Andy Wong on 2018-09-22.
//  Copyright © 2018 lawonga. All rights reserved.
//

import UIKit
import os.log

class ApparelViewController: UIViewController,
        UITextFieldDelegate,
        UIImagePickerControllerDelegate,
        UINavigationControllerDelegate {
    var apparel: Apparel?
    var type: Type?

    @IBOutlet weak var saveButton: UIBarButtonItem!
    @IBOutlet weak var quantityTextField: UITextField!
    @IBOutlet weak var imageViewOfType: UIImageView!
    @IBOutlet weak var labelOfType: UILabel!

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

    // Mark: Actions
//    @IBAction func unwindToApparelEditing(sender: UIStoryboardSegue) {
//        if let sourceViewController = sender.source as? ApparelTypeTableViewController,
//           let type = sourceViewController.type
//    }

    @IBAction func cancel(_ sender: UIBarButtonItem) {
        if presentingViewController is UINavigationController {
            dismiss(animated: true, completion: nil) // Dismiss if we're 'adding' a new one
        } else if let owningNavigationController = navigationController {
            owningNavigationController.popViewController(animated: true)
        } else {
            fatalError("This controller is not inside a navigation view controller")
        }
    }

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        super.prepare(for: segue, sender: sender)
        
        if let navigationController = segue.destination as? UINavigationController,
            let apparelTypeTableViewController = navigationController.topViewController as? ApparelTypeTableViewController {
            apparelTypeTableViewController.delegate = self
        }
        
        // Verify that the sender is a button
        guard let button = sender as? UIBarButtonItem else { return }
        
        guard button === saveButton else { fatalError() }
//        guard let button = sender as? UIBarButtonItem, button === saveButton else {
//            os_log("The save button was not pressed, cancelling", log: OSLog.default, type: .debug)
//            return
//        }

        let quantityText = quantityTextField.text ?? "0"
        let quantity = Int(quantityText) ?? 0

        apparel = Apparel(quantity: quantity)
        
        
    }

    func isStringAnInt(string: String) -> Bool {
        return Int(string) != nil
    }

    func setType(_ type: Type) {
        labelOfType.text = type.label
        imageViewOfType.image = type.image
    }
}

extension ApparelViewController: ApparelTypeTableViewControllerDelegate {
    func didSelectType(_ type: Type) {
        setType(type)
    }
    
    
}
