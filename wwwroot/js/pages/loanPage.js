
import Pagination from '../components/pagination.js'

Vue.component('pagination', Pagination);


export default{
    name: 'loan-table',
    data: function() {
        return {
            loans: '',
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
        axios.get('api/Loan')
        .then((response) => {
          this.loans = response.data;
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
                    url: 'api/Loan/hide',
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
                    axios.get('api/Loan')
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
        },
        truncate(element, index) {
            return element.slice(0, index);
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
                <b-button size='sm' variant="success" v-on:click="add">Add Loan</b-button>
            </b-form-group></b-container>
  
            <table  class="table table-bordered">
            <tr>
                <th>Loan Name</th>
                <th>Loan Type</th>
                <th>User</th>
                <th>Debt</th>
                <th>Interest</th>
                <th>Loan Date</th>
                <th>History</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>

            <tr v-for="(loan, index) in loans">
                <td> {{ loan.loanName }} </td>
                <td> {{ loan.loanType }} </td>
                <td> {{ loan.user }} </td>
                <td> $ {{ loan.debt }} </td>
                <td> {{ loan.interestRate * 100}} % </td>
                <td> {{ truncate(loan.loanDate, 10)  }} </td>
                <td>
                    <div class="mx-auto" style="width: 50px;">
                        <button class='btn btn-primary btn-sm'>History</button>
                    </div>
                </td>
                <td>
                    <div class="mx-auto" style="width: 50px;">
                        <button class='btn btn-warning btn-sm' v-on:click="edit(loan)"> Edit </button>
                    </div>
                </td>
                <td>
                    <div class="mx-auto" style="width: 50px;">
                        <button class='btn btn-danger btn-sm' v-on:click="remove(loan)"> Delete </button>
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
                v-bind:loans= 'loans'
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
                v-bind:loans= 'loans'
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