var UserSQL = {  
                insert:'INSERT INTO User(uid,username) VALUES(?,?)', 
                queryAll:'SELECT * FROM User',  
                getUserById:'SELECT * FROM User WHERE uid = ? ',
              };
 module.exports = UserSQL;