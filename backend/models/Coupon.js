const { DataTypes } = require("sequelize")
const { sequelize } = require("../config/db")

const Coupon = sequelize.define("Coupon", {

title:{
type:DataTypes.STRING
},

description:{
type:DataTypes.TEXT
},

code:{
type:DataTypes.STRING,
unique:true
},

discount:{
type:DataTypes.FLOAT
},

image:{
type:DataTypes.STRING
},

oldPrice:{
type:DataTypes.FLOAT
},

newPrice:{
type:DataTypes.FLOAT
},

status:{
type:DataTypes.BOOLEAN,
defaultValue:true
}

})

module.exports = Coupon