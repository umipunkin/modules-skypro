const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users.json");

class UserModule {
  static getUsers() {
    try {
      const data = fs.readFileSync(usersFilePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading users file:", error);
      return [];
    }
  }
}

module.exports = UserModule;
