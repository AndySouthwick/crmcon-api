import { DataTypes } from 'sequelize'
import db from '../index'

export default db.define(
    'contact',
    {
        id:{
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        given_name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        family_name: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        phone: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        affiliate_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        }
    }
)