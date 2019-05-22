export default {
  user: {
    add (data) {
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
    },
    get (that) {
      axios.get('api/User')
      .then((response) => {
        that.users = response.data;
      })
      .catch(error => (console.log(error)));
    },
    post: function (data) {
      axios({
        method: 'POST',
        url: 'api/User',
        data: data,
        headers:{'Content-Type': 'application/json; charset=utf-8'},
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    edit: function( data) {
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
      });
    },
    delete: function(data) {
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
      });
    },
  },
  role: {
    get (that) {
      axios.get('api/Role')
      .then((response) => {
        for (var data in response.data){
          that.roles.push(response.data[data].roleName);
        }
      })
      .catch(error => (console.log(error)));
    },
  },
  position: {
    edit: function(data) {
      axios({
        method: 'Put',
        url: 'api/Position/edit',
        data: data,
        headers:{'Content-Type': 'application/json; charset=utf-8'},
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    get (that) {
      axios.get('api/Position')
      .then((response) => {
        that.positions = response.data;
      })
      .catch(error => (console.log(error)));
    }
  },
  mbti: {   
    delete: function(data) {
      axios({
        method: 'Put',
        url: 'api/MBTI/hide',
        data: data,
        headers:{'Content-Type': 'application/json; charset=utf-8'},
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    // edit: function( data) {
    //   axios({
    //     method: 'Put',
    //     url: 'api/MBTI/edit',
    //     data: data,
    //     headers:{'Content-Type': 'application/json; charset=utf-8'},
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // },
    get (that) {
      axios.get('api/MBTI')
      .then((response) => {
        that.mbtis = response.data;
      })
      .catch(error => (console.log(error)));
    },
  },  
}