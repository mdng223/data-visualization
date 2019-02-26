/*
    Functions for User Entity HTTP requests.
*/

let requests = {
    fetchUsers: function (that) {
        axios.get('api/User')
        .then((response) => {
          that.users = response.data;
        })
        .catch(error => (console.log(error)));
    },
    fetchRoles: function (that) {
      axios.get('api/Role')
      .then((response) => {
        that.roles = response.data;
      })
      .catch(error => (console.log(error)));
    },
    addUser: function (that, data) {
      console.log(data);
      axios({
        method: 'POST',
        url: 'api/User',
        data: JSON.stringify(data),
        headers:{'Content-Type': 'application/json; charset=utf-8'},
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then( () => {
        this.fetchUsers(that);
      })
      .then(() => {
        that.cancel();
      });
    },
    deleteUser: function(that, data) {
      console.log(data);
      axios({
        method: 'Put',
        url: 'api/User/hide',
        data: data,
        headers:{'Content-Type': 'application/json; charset=utf-8'},
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then( () => {
        this.fetchUsers(that);
      });
    },
    editUser: function(that, data) {
      console.log(data);
      axios({
        method: 'Put',
        url: 'api/User/edit',
        data: data,
        headers:{'Content-Type': 'application/json; charset=utf-8'},
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then( () => {
        this.fetchUsers(that);
      })
      .then(() => {
        that.cancel();
      });;
    }
};