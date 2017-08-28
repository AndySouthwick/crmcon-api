import { DataTypes } from 'sequelize'
import db from '../index'
import hash from 'password-hash'

export default db.define(
    'user',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            allowNull: false,
            type: DataTypes.VIRTUAL,
            set (val) {
                // Set the virtual value for validation
                this.setDataValue('password', val)
            },
            validate: {
                len: [5, 85]
            }
        },
        hashedPassword: {
            type: DataTypes.STRING,
        }
    },
    {
        hooks: {
            async beforeCreate (user, _options) {
                user.hashedPassword = hash.generate(user.password, {
                    algorithm: 'sha224',
                    iterations: 10
                })
            }
        }
    }
)
