const { DataTypes, Model } = require("sequelize")
const { sequelize } = require("../config/db")

class LoginLog extends Model {}

LoginLog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id"
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  loginTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  sequelize,
  modelName: "LoginLog",
  tableName: "LoginLogs",
  timestamps: false
})

module.exports = LoginLog