export default {
  loan: {
    get (that) {
      axios.get('api/Loan')
      .then((response) => {
        that.loans = response.data;
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
    get (that) {
      axios.get('api/MBTI')
      .then((response) => {
        if (response.data.status == false) {
          console.log(response.data.message);
        } else {
          that.mbtis = response.data.mbtiList;
        }        
      })
      .catch(error => (console.log(error)));
    },
    getGenders (that) {
      axios.get('api/MBTI/getGenders')
      .then((response) => {
        if (response.data.status == false) {
          console.log(response.data.message);
        } else {
          that.genders = response.data.genders;
        }
      })
      .catch(error => (console.log(error)));
    },
    getMbtiTypes(that) {
      axios.get('api/MBTI/getGenders')
      .then((response) => {
        if (response.data.status == false) {
          console.log(response.data.message);
        } else {
          that.mbtis = response.data.mbtis.temperaments;
        }
      })
      .catch(error => (console.log(error)));
    },
    getNF (that) {
      axios.get('api/MBTI/getNF')
      .then((response) => {
        that.temperament.NF = response.data;
        that.total += parseInt(response.data.total);
      })
      .catch(error => (console.log(error)));
    },
    getNT (that) {
      axios.get('api/MBTI/getNT')
      .then((response) => {
        that.temperament.NT = response.data;
        that.total += parseInt(response.data.total);
      })
      .catch(error => (console.log(error)));
    },
    getSJ (that) {
      axios.get('api/MBTI/getSJ')
      .then((response) => {
        that.temperament.SJ = response.data;
        that.total += parseInt(response.data.total);
      })
      .catch(error => (console.log(error)));
    },
    getSP (that) {
      axios.get('api/MBTI/getSP')
      .then((response) => {
        that.temperament.SP = response.data;
        that.total += parseInt(response.data.total);
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
    edit: function(data) {
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
  },
}