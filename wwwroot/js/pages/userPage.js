import DebugButton from '../components/debugButton.js'
import AddUserForm from '../components/addUserForm.js'
import EditUserForm from '../components/editUserForm.js'

Vue.component('debugButton', DebugButton);
Vue.component('addUserForm', AddUserForm);
Vue.component('editUserForm', EditUserForm);

export default{
    name: 'user-table',
    data: function() {
        return {
            users: '',
            title: '',
            states: {
                add: false,
                edit: false,
                table: true,
                debug: true,
                debugButton: true,
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
          if(this.states.debug) {this.logger('info', 'Users: =\t' + this.users); }
        })
        .catch(error => (console.log(error)));
    },
    computed: {
        computeDebug() {
          return this.states.debug;
        },
        computeAddState() {
          return this.states.add;
        },
        computeEditState() {
            return this.states.edit;
        },
    },
    watch: {
        computeDebug: function(val) {
            this.logger('info', 'User Page logger set to ' + val);
        },
        computeAddState: function(val) {
            if(val == false) {
                this.clearForms(this.formData);
                this.clearErrors(this.errors);
                this.clearSuccess(this.success);
                this.states.edit = false;
                this.states.table = true;
                this.states.debugButton = true;
            }
        },
        computeEditState: function(val) {
            if(val == false) {
                this.clearForms(this.formData);
                this.clearErrors(this.errors);
                this.clearSuccess(this.success);
                this.states.table = true;
                this.states.debugButton = true;
            }
        },
    },
    methods: {
        edit: function (user) {
            if (this.states.debug) {this.logger('info', 'Edit button clicked.')}
            this.states.edit = true;
            this.states.table = false;
            this.states.debugTable = false;
            this.title = user.username;

            this.formData.id = user.id;
            this.formData.email = user.email;
            this.formData.roleName = user.roleName;
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
            if (this.states.debug) { this.logger('info', 'Add user button clicked.'); }
            this.clearForms(this.formData);
           //this.clearErrors(this.errors);
            this.states.debugButton = false;
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
    },
    template: `
    <div>
        <template v-if="states.debugButton">
            <debug-button v-on:child-to-parent="states.debug = $event"></debug-button>
        </template>
        
        <template v-if="states.table">
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
                    <button class='btn btn-warning btn-sm' v-on:click="edit(user)"> Edit </button>
                </td>
                <td>
                    <button class='btn btn-danger btn-sm' v-on:click="remove(user)"> Delete </button>
                </td> 
            </tr>
            </table>
            <button type="button" class="btn btn-success" v-on:click="add">Add User</button>
        </template>
        <template v-if="states.add">
            <add-user-form
                v-bind:users= 'users'
                v-bind:formData= 'formData'
                v-bind:errors= 'errors'
                v-bind:success= 'success'
                b-bind:debug= 'states.debug'
                v-on:add-to-user-page="states.add = $event"
            ></add-user-form>
        </template>
        <template v-if="states.edit">
            <edit-user-form
                v-bind:title= 'title'
                v-bind:formData= 'formData'
                v-bind:errors= 'errors'
                v-bind:success= 'success'
                b-bind:debug= 'states.debug'
                v-on:edit-to-user-page="states.edit = $event"
            ></edit-user-form>
        </template>
    </div>
    `
  }