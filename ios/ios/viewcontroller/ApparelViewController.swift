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
        UINavigationControllerDelegate,
        UIPickerViewDelegate,
        UIPickerViewDataSource {
    var apparel: Apparel?
    var type: Type?
    var pickerData: [Size] = []
    var selectedRow: Size? = Size.size32

    @IBOutlet weak var saveButton: UIBarButtonItem!
    @IBOutlet weak var quantityTextField: UITextField!
    @IBOutlet weak var imageViewOfType: UIImageView!
    @IBOutlet weak var labelOfType: UILabel!
    @IBOutlet weak var sizePicker: UIPickerView!

    override func viewDidLoad() {
        super.viewDidLoad()

        self.sizePicker.delegate = self
        self.sizePicker.dataSource = self

        // Do any additional setup after loading the view.
        pickerData = Size.allSizes
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
        guard let button = sender as? UIBarButtonItem else {
            return
        }

        guard button === saveButton else {
            fatalError()
        }

        guard (selectedRow != nil && type != nil) else {
            showAlert("Please select an apparel")
            return
        }

        let quantityText = quantityTextField.text ?? "0"
        let quantity = Int(quantityText) ?? 0

        apparel = Apparel(size: selectedRow!, type: self.type!, quantity: quantity)
    }

    private func showAlert(_ message: String) {
        let alert = UIAlertController(title: nil, message: message, preferredStyle: .alert)
        self.present(alert, animated: true)

        // duration in seconds
        let duration: Double = 5

        DispatchQueue.main.asyncAfter(deadline: DispatchTime.now() + duration) {
            alert.dismiss(animated: true)
        }
    }

    func isStringAnInt(string: String) -> Bool {
        return Int(string) != nil
    }

    func setType(_ type: Type) {
        labelOfType.text = type.label
        imageViewOfType.image = type.image
        self.type = type
    }

    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }

    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return pickerData.count
    }

    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        return pickerData[row].rawValue
    }

    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        selectedRow = pickerData[row]
    }
}

extension ApparelViewController: ApparelTypeTableViewControllerDelegate {
    func didSelectType(_ type: Type) {
        setType(type)
    }
}
