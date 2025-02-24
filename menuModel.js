const {Schema, model} = require('mongoose')

const menuSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        default: ""
    },
    price:{
        type: Number,
        required: true
    }
},

{
    timestamps : true
}
)

const menuModel = model('Menu', menuSchema)

module.exports = menuModel