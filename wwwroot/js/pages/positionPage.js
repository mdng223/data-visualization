
import Pagination from '../components/pagination.js'



Vue.component('pagination', Pagination);


export default{
    name: 'position-table',
    data: function() {
        return {
            positions: '',
            title: '',
            dismissSecs: 3,
            dismissCountDown: 0,
            alert: '',
            states: {
                add: false,
                edit: false,
                table: true,
                debug: true,
                submit: false,
                cancel: false,
            },
            formData: {
            },
            errors: {
            },
            success: {
            }, 
        }
    },
    mounted()  {
        axios.get('api/Position')
        .then((response) => {
          this.positions = response.data;
        })
        .catch(error => (console.log(error)));
    },
    computed: {
    },
    watch: {
        
    },
    methods: {
        edit: function (user) {
           
        },
        add: function () {

        },
        clearErrors: function(errors) {

        },
        clearForms: function(forms) {

        },
        clearSuccess: function(success) {

        },
        remove: function(user) {
            var confirm = window.confirm("Are you sure?");
            if (confirm) {
                let data = {};
                data.id = user.id;
                axios({
                    method: 'Put',
                    url: 'api/Position/hide',
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
                    axios.get('api/Position')
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
            <b-container><b-form-group>
                <b-button size='sm' variant="success" v-on:click="add">Add Position</b-button>
            </b-form-group></b-container>
  
            <table  class="table table-bordered">
            <tr>
                <th>Position Name</th>
                <th>Symbol</th>
                <th>username</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>

            <tr v-for="(position, index) in positions">
                <td> {{ position.positionName }} </td>
                <td> {{ position.symbol }} </td>
                <td> {{ position.username }} </td>
                <td>
                    <div class="mx-auto" style="width: 50px;">
                        <button class='btn btn-warning btn-sm' v-on:click="edit(position)"> Edit </button>
                    </div>
                </td>
                <td>
                    <div class="mx-auto" style="width: 50px;">
                        <button class='btn btn-danger btn-sm' v-on:click="remove(position)"> Delete </button>
                    </div>
                </td> 
            </tr>
            </table>
            <b-container>
                <pagination></pagination>
            </b-container>

        </template>
        <template v-if="states.add">
            <add-user-form
                v-bind:positions= 'positions'
                v-bind:formData= 'formData'
                v-bind:errors= 'errors'
                v-bind:success= 'success'
                v-bind:debug= 'states.debug'
                v-on:cancel-to-user-page="states.add = $event"
                v-on:add-to-user-page="states.submit = $event"
            ></add-user-form>
        </template>
        <template v-if="states.edit">
            <edit-user-form
                v-bind:positions= 'positions'
                v-bind:formData= 'formData'
                v-bind:errors= 'errors'
                v-bind:success= 'success'
                v-bind:debug= 'states.debug'
                v-on:cancel-to-user-page="states.cancel = $event"
                v-on:edit-to-user-page="states.submit = $event"
            ></edit-user-form>
        </template>
    </div>
    `
  }