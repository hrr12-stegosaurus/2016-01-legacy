// ///////////
// sequelize//
//         //

var Sequelize = require('sequelize');
if (process.env.DEPLOYED === 'true'){
  var orm = new Sequelize(process.env.JAWSDB_URL);
} else {
  var orm = new Sequelize('learnItNowdb', 'root', '');
}
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = orm.define('User', {
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: Sequelize.STRING
}, {
  instanceMethods: {
    hashPassword: function() {
      return bcrypt.hashSync(this.password);
    },
    validPassword: function(pass) {
      return bcrypt.compareSync(pass, this.password);
    }
  }
});

User.beforeCreate(function(user, options) {
  user.password = user.hashPassword();
});

var Review = orm.define('Review', {
  rating: Sequelize.INTEGER
});

var Session = orm.define('Session', {
  topic: Sequelize.STRING,
  description: Sequelize.STRING,
  link: Sequelize.TEXT,
  status: Sequelize.BOOLEAN,
  category: Sequelize.STRING,
  image: Sequelize.TEXT
});

var Registered = orm.define('Registered', {
  topic: Sequelize.STRING,
  description: Sequelize.STRING,
  date: Sequelize.STRING,
  link: Sequelize.TEXT,
  status: Sequelize.BOOLEAN,
  category: Sequelize.STRING,
  image: Sequelize.TEXT
});

var Calendar = orm.define('Calendar', {
  day: Sequelize.STRING,
  time: Sequelize.STRING
});

User.hasMany(Registered);
Registered.belongsTo(User);

User.hasMany(Session);
Session.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

Session.hasMany(Calendar);
Calendar.belongsTo(Session);

User.sync();
Session.sync();
Calendar.sync();
Review.sync();

exports.User = User;
exports.Session = Session;
exports.Calendar = Calendar;
exports.Review = Review;



/////////////
//Raw mySql//
//         //

// var mysql = require('mysql');

// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'learnItNowdb'
// });

// var onConnect = connection.connect(function(err) {
//   if(err) {
//     console.log('Error connecting to mysql database: ', err);
//   } else {
//     console.log('msql databse is connected.');
//   }
// });

// module.exports.connection = connection;