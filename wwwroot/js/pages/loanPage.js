import AddLoanForm from '../components/addLoanForm.js'
import Pagination from '../components/pagination.js'

Vue.component('addLoanForm', AddLoanForm);
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
        edit: function (loan) {
           
        },
        add: function () {
            this.clearForms(this.formData);
            this.clearErrors(this.errors);
            this.clearSuccess(this.success);
            this.states.add = true;
            this.states.table = false;
        },
        clearErrors: function(errors) {

        },
        clearForms: function(forms) {

        },
        clearSuccess: function(success) {

        },
        remove: function(loan) {
            var confirm = window.confirm("Are you sure?");
            if (confirm) {
                let data = {};
                data.id = loan.id;
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
                      this.loans = response.data;
                    })
                    .catch(error => (console.log(error)))
                    .then( this.showAlert('loan deleted successfully!') );
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
            <b-form-group>
                <b-button size='sm' variant="success" v-on:click="add">Add Loan</b-button>
            </b-form-group>
  
            <table  class="table table-bordered">
            <tr>
                <th>Loan Name</th>
                <th>Loan Type</th>
                <th>loan</th>
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
                <td> {{ loan.loan }} </td>
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
            <pagination></pagination>


        </template>
        <template v-if="states.add">
            <add-loan-form
                v-bind:loans= 'loans'
                v-bind:formData= 'formData'
                v-bind:errors= 'errors'
                v-bind:success= 'success'
                v-bind:states= 'states'
                v-on:cancel-to-loan-page="states.add = $event"
                v-on:add-to-loan-page="states.submit = $event"
            ></add-loan-form>
        </template>
        <template v-if="states.edit">
            <edit-loan-form
                v-bind:loans= 'loans'
                v-bind:formData= 'formData'
                v-bind:errors= 'errors'
                v-bind:success= 'success'
                v-on:cancel-to-loan-page="states.cancel = $event"
                v-on:edit-to-loan-page="states.submit = $event"
            ></edit-loan-form>
        </template>
    </div>
    `
  }