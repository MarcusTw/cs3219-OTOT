const ROLE = {
    ADMIN: "admin",
    BASIC: "basic"
}

let refreshTokensList = [];

function removeRefreshToken(ref) {
    removeItemOnce(refreshTokensList, ref);
}

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
  

module.exports = {
    ROLE: ROLE,
    users: [
        { id: 1, name: 'Marcus', role: ROLE.ADMIN },
        { id: 2, name: 'Ahmad', role: ROLE.BASIC },
        { id: 3, name: 'Betty', role: ROLE.BASIC },
        { id: 4, name: 'Charlie', role: ROLE.BASIC },
        { id: 5, name: 'David', role: ROLE.BASIC }
    ],
    refreshTokens: refreshTokensList,
    rtCallback: removeRefreshToken
}