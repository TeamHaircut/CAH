module.exports = function(sequelize, Sequelize) {
 
    var User = sequelize.define('user', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        username: {
            type: Sequelize.TEXT
        },
 
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
		
		displayname: {
			type: Sequelize.TEXT,
			allowNull: false,
			defaultValue: 'Sour Cream and Fish'
		},
 
        last_login: {
            type: Sequelize.DATE
        },
 
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
 
 
    });
    return User;
}