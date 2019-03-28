import AddUserForm from '../components/addUserForm.js'
import EditUserForm from '../components/editUserForm.js'
import Pagination from '../components/pagination.js'

Vue.component('addUserForm', AddUserForm);
Vue.component('editUserForm', EditUserForm);
Vue.component('pagination', Pagination);


export default{
    name: 'user-table',
    data: function() {
        return {
            users: '',
            title: '',
            dismissSecs: 3,
            dismissCountDown: 0,
            alert: '',
            states: {
                add: false,
                edit: false,
                table: true,
                submit: false,
                cancel: false,
            },
            formData: {
                id: '',
                username: '',
                email: '',
                roleName: '',
                password: '',
                password2: '',  
            },
            errors: {
                username: null,
                password: '',
                password2: null,
                email: null,
                role: null,
            },
            success: {
                username: null,
                email: null,
                password: null,
                password2: null,
            }, 
        }
    },
    mounted()  {
        axios.get('api/User')
        .then((response) => {
          this.users = response.data;
        })
        .catch(error => (console.log(error)));
    },
    computed: {
        computeAddState() {
          return this.states.add;
        },
        computeEditState() {
            return this.states.edit;
        },
        computeSubmitState() {
            return this.states.submit;
        },
        computeCancelState() {
            return this.states.cancel;
        }
    },
    watch: {
        computeAddState: function(val) {
            if(val == false) {
                this.clearForms(this.formData);
                this.clearErrors(this.errors);
                this.clearSuccess(this.success);
                this.states.table = true;
                this.states.add = false;
            }
        },
        computeEditState: function(val) {
            if(val == false && this.states.cancel) {
                this.clearForms(this.formData);
                this.clearErrors(this.errors);
                this.clearSuccess(this.success);
                this.states.table = true;
                this.showAlert(this.title + ' edited successfully!');
            }
        },
        computeSubmitState: function(val) {
            if (val == true) {
                this.clearForms(this.formData);
                this.clearErrors(this.errors);
                this.clearSuccess(this.success);
                this.states.table = true;
                this.states.submit = false;
                this.states.add = false;
                this.states.edit = false;
                axios.get('api/User')
                .then((response) => {
                  this.users = response.data;
                })
                .catch(error => (console.log(error)))
                .then( this.showAlert('User added successfully!') );
            }
        },
        computeCancelState: function(val) {
            if(val == true) {
                this.clearForms(this.formData);
                this.clearErrors(this.errors);
                this.clearSuccess(this.success);
                this.states.table = true;
                this.states.add = false;
                this.states.edit = false;
                this.states.cancel = false;
            }
        }
    },
    methods: {
        edit: function (user) {
            this.states.edit = true;
            this.states.table = false;
            this.title = user.username;

            this.formData.id = user.id;
            this.formData.email = user.email;
            this.formData.roleName = user.roleName;
            this.formData.username = user.username;
            this.formData.roleId = this.getRoleId(this.formData.roleName);
        },
        logger: function(logLevel, message) {
            var today = new Date();
            var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;
            console.log( dateTime + ' :: ' + logLevel + ' :: ' + message );
        },
        getRoleId: function(roleName) {
            if (roleName == 'Administrator'){
                return 1;
            } else if (roleName == 'Manager') {
                return 2;
            } else if (this.formData.roleName == 'User') {
                return 3;
            }
            return 0;
        },
        add: function () {
            this.clearForms(this.formData);
            this.clearErrors(this.errors);
            this.clearSuccess(this.success);
            this.states.add = true;
            this.states.table = false;

        },
        clearErrors: function(errors) {
            errors.username = null;
            errors.password = null;
            errors.password2 = null;
            errors.email = null;
            errors.role = '';
        },
        clearForms: function(forms) {
            this.formData.id = '';
            this.formData.username = '';
            this.formData.email = '';
            this.formData.roleName = '';
            this.formData.password = '';
            this.formData.password2 = '';
        },
        clearSuccess: function(success) {
            success.username = null;
            success.email = null;
            success.password = null;
            success.password2 = null;
        },
        remove: function(user) {
            var confirm = window.confirm("Are you sure?");
            if (confirm) {
                let data = {};
                data.id = user.id;
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
                    axios.get('api/User')
                    .then((response) => {
                      this.users = response.data;
                    })
                    .catch(error => (console.log(error)))
                    .then( this.showAlert('User deleted successfully!') );
                  });
            }
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown;
        },
        showAlert(alert) {
            window.scrollTo(0, 0);
            this.alert = alert;
            this.dismissCountDown = this.dismissSecs;
        }
    },
    template: `
    <div>

        <b-alert
            :show="dismissCountDown"
            dismissible
            variant="success"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
        >
            <p>{{ alert }}</p>
            <b-progress variant="warning" :max="dismissSecs" :value="dismissCountDown" height="4px" />
        </b-alert>
        <template v-if="states.table">
            <b-form-group>
                <b-button size='sm' variant="success" v-on:click="add">Add User</b-button>
            </b-form-group>
  
            <table  class="table table-bordered">
            <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>

            <tr v-for="(user, index) in users">
                <td> {{ user.username }} </td>
                <td> {{ user.email }} </td>
                <td> {{ user.roleName }} </td>
                <td>
                    <div class="mx-auto" style="width: 50px;">
                        <button class='btn btn-warning btn-sm' v-on:click="edit(user)"> Edit </button>
                    </div>
                </td>
                <td>
                    <div class="mx-auto" style="width: 50px;">
                        <button class='btn btn-danger btn-sm' v-on:click="remove(user)"> Delete </button>
                    </div>
                </td> 
            </tr>
            </table>

            <pagination></pagination>


        </template>
        <template v-if="states.add">
            <add-user-form
                v-bind:users= 'users'
                v-bind:formData= 'formData'
                v-bind:errors= 'errors'
                v-bind:success= 'success'
                v-on:cancel-to-user-page="states.add = $event"
                v-on:add-to-user-page="states.submit = $event"
            ></add-user-form>
        </template>
        <template v-if="states.edit">
            <edit-user-form
                v-bind:users= 'users'
                v-bind:formData= 'formData'
                v-bind:errors= 'errors'
                v-bind:success= 'success'
                v-on:cancel-to-user-page="states.cancel = $event"
                v-on:edit-to-user-page="states.submit = $event"
            ></edit-user-form>
        </template>
    </div>
    `
  }