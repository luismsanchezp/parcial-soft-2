const express = require('express');
const invoice_model = require('../models/invoice.model')
const invoice_routes = express.Router()

invoice_routes.get('/invoices', (req, res)=>{
    invoice_model
        .find()
        .then((data) => res.json(data))
        .catch((err) => res.json({message:err}));
});

invoice_routes.get('/invoices/:id', (req, res)=>{
    const { id } = req.params;
    invoice_model
        .findById(id)
        .then((data) => res.json(data))
        .catch((err) => res.json({message: err}));
});

invoice_routes.get('/invoices/reference/:id', (req, res)=>{
    const { id } = req.params;
    invoice_model
        .find()
        .then((data) => res.json(find_by_reference(data, id)))
        .catch((err) => res.json({message:err}));
});

invoice_routes.post('/invoices', (req, res)=>{
    const new_invoice = invoice_model(req.body);
    new_invoice
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json({message: err}));
});

invoice_routes.put('/invoices/:id', (req, res)=>{
    const { id } = req.params;
    const { DueDate, DocNumber, Status, Line, Vendor, TotalAmt } = req.body;
    invoice_model
        .updateOne({ _id: id }, { $set: { DueDate, DocNumber, Status, Line, Vendor, TotalAmt } })
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});

invoice_routes.delete('/invoices/:id', (req, res)=>{
    const { id } = req.params;
    invoice_model
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((err) => res.json({message: err}));
});

module.exports = invoice_routes

function find_product(invoice, reference) {
    ans = false
    for (product in invoice.Line){
        if (product.ExpenseDetail.Customer.Ref.value == reference){
            ans = true;
        }
        else {
            ans = false;
        }
    }
    return ans
}
function find_by_reference(invoices, reference) {
    return invoices.filter(find_product(reference))
}