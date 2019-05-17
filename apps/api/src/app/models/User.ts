import { Sequelize, Model, DataTypes } from 'sequelize';

// объектный литерал, определяющий структуры будущей модели
const userSchema = {
    id: {
        type: DataTypes.BIGINT,
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.CHAR(50),
        allowNull: false
    },
    email: {
        type: DataTypes.CHAR(100)
    },
    hash: {
        type: DataTypes.CHAR(60),
        allowNull: false
    }
};

// фабрики, которая будет вызвана при иморте модели
const UserFactory = (sequelize: Sequelize) => {
    class User extends Model { };
    User.init(userSchema, {
        sequelize,
        modelName: 'user',
        schema: 'project5'
    });
    return User;
};

export default UserFactory;