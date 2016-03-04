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
  /*startTime: Sequelize.DATE,*/
  link: Sequelize.TEXT,
  status: Sequelize.BOOLEAN,
  category: Sequelize.STRING
});

var Calendar = orm.define('Calendar', {
  day: Sequelize.STRING,
  time: Sequelize.STRING
});

User.hasMany(Session);
Session.belongsTo(User);
User.hasMany(Review);
Review.belongsTo(User);

Session.hasMany(Calendar);
Calendar.belongsTo(Session);

User.sync();
Session.sync();
<<<<<<< 0d623bdef92b977fc8d3dfe65cd38a9361879ab2
Calendar.sync();

exports.User = User;
exports.Session = Session;
exports.Calendar = Calendar;
=======
Review.snyc();

exports.User = User;
exports.Session = Session;
exports.Review = Review;
>>>>>>> (feat) Define reviews table.



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