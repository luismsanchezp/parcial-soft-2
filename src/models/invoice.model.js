const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema({
    DueDate:{
        type: Date,
        require: true,
    },
    DocNumber:{
        type: String,
        unique: true,
        require: true
    },
    Status:{
        type: String,
        require: true
    },
    Line: {
        type: 
        [
            {
                Amount:{
                    type: Number,
                    require: true,
                },
                DetailType:{
                    type: String,
                    require: true
                },
                ExpenseDetail:{
                    type: Object,
                    require: true,
                    Customer:{
                        type: Object,
                        require: true,
                        value:{
                            type: String,
                            require: true,
                            unique: true
                        },
                        name:{
                            type: String,
                            require: true
                        },
                        Ref:{
                            type: Object,
                            require: true,
                            value:{
                                type: String,
                                require: true,
                                unique: true
                            },
                            name:{
                                type: String,
                                require: true
                            },
                        },
                    },
                    Account:{
                        type: Object,
                        require: true,
                        value:{
                            type: String,
                            require: true,
                            unique: true
                        },
                        name:{
                            type: String,
                            require: true
                        },
                    },
                    LineStatus:{
                        type: String,
                        require: true
                    },
                },
            }
        ],
        require: true,
        default: undefined
    },
    Vendor:{
        type: Object,
        require: true,
        value:{
            type: String,
            require: true,
            unique: true
        },
        name:{
            type: String,
            require: true
        },
    },
    TotalAmt:{
        type: Number,
        require: true,
    },
});
module.exports = mongoose.model('invoiceCollection', invoiceSchema);