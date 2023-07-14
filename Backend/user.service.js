const con = require("../connection");

module.exports = {
  create: (data, callBack) => {
    con.query(
      `insert into User(firstName, lastName, email, password, createdAt) 
                values(?,?,?,?,?)`,
      [data.firstName, data.lastName, data.email, data.password, new Date()],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserByUserEmail: (email, callBack) => {
    con.query(
      `select * from User where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByUserId: (id, callBack) => {
    con.query(
      `select id,firstName,lastName,email, from User where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUsers: (callBack) => {
    con.query(
      `select id,firstName,lastName,email from User`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateUser: (data, callBack) => {
    con.query(
      `update User set firstName=?, lastName=?, email=?, password=? where id = ?`,
      [data.firstName, data.lastName, data.email, data.password, data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteUser: (data, callBack) => {
    con.query(
      `delete from User where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
