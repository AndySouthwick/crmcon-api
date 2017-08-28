import { DataTypes } from 'sequelize'
import db from '../index'


export default db.define(
    'affiliate',
    {
        id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        affiliate_fname: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        affiliate_lname: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        affiliate_email: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        affiliate_phone: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        affiliate_subdomain: {
            allowNull: false,
            type: DataTypes.STRING,
        }


    })