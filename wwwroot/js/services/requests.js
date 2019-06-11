import Constants from 'constants.js'

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
    add (data) {
      axios({
      method: Constants.method.post,
      url: Constants.url.mbtiAdd,
      data: JSON.stringify(data),
      headers:{'Content-Type': Constants.common.contentTypeValue},
      })
      .then(function (response) {
        if (response.data.status) {
          that.snackbar.text = `${Constants.common.addSuccess} ${response.data.user}`;
          that.snackbar.color = Constants.color.success;
          that.snackbar.state = true;
        } else {
          that.snackbar.text = outputError(response.data.message);
          that.snackbar.color = Constants.color.red;
          that.snackbar.state = true;
        }
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    delete(data) {
      axios({
        method: Constants.method.put,
        url: Constants.url.mbtiHide,
        data: data,
        headers:{'Content-Type': Constants.common.contentTypeValue},
      })
      .then(function (response) {
        if (response.data.status) {
          that.snackbar.text = `${Constants.common.deleteSuccess} ${response.data.user}`;
          that.snackbar.color = Constants.color.success;
          that.snackbar.state = true;
        } else {
          that.snackbar.text = outputError(response.data.message);
          that.snackbar.color = Constants.color.red;
          that.snackbar.state = true;
        }
      })
      .catch(error => (console.log(error)));
    },
    get(that) {
      axios.get(Constants.url.mbtiGet)
      .then((response) => {
        if (response.data.status) {
          that.mbtis = response.data.mbtiList;
        } else {
          that.snackbar.text = outputError(response.data.message);
          that.snackbar.color = Constants.color.red;
          that.snackbar.state = true;
        }
      })
      .catch(error => (console.log(error)));
    },
    getGenders (that) {
      axios.get(Constants.url.mbtiGetGenders)
      .then((response) => {
        if (response.data.status) {
          that.genders = response.data.genders;
        } else {
          console.log(outputError(response.data.message));
        }
      })
      .catch(error => (console.log(error)));
    },
    getMbtiTypes(that) {
      axios.get(Constants.url.mbtiGetTypes)
      .then((response) => {
        if (response.data.status) {
          that.mbtis = response.data.mbtis.temperaments;
        } else {
          console.log(outputError(response.data.message));
        }
      })
      .catch(error => (console.log(error)));
    },
    getNF(that) {
      axios.get(Constants.url.mbtiGetNF)
      .then((response) => {
        that.temperament.NF = response.data;
        that.total += parseInt(response.data.total);
      })
      .catch(error => (console.log(error)));
    },
    getNT(that) {
      axios.get(Constants.url.mbtiGetNT)
      .then((response) => {
        that.temperament.NT = response.data;
        that.total += parseInt(response.data.total);
      })
      .catch(error => (console.log(error)));
    },
    getSJ(that) {
      axios.get(Constants.url.mbtiGetSJ)
      .then((response) => {
        that.temperament.SJ = response.data;
        that.total += parseInt(response.data.total);
      })
      .catch(error => (console.log(error)));
    },
    getSP(that) {
      axios.get(Constants.url.mbtiGetSP)
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
      .catch(error => (console.log(error)));
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
      .catch(error => (console.log(error)));
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
      .catch(error => (console.log(error)));
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
      .catch(error => (console.log(error)));
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
      .catch(error => (console.log(error)));
    },
  },
}