import Constants from '../services/constants.js'
import Requests from '../services/requests.js'
import Common from '../services/common.js'


export default{
    name: 'loan-table',
    data: function() {
        return {
            defaultLoan: {
                id: 0,
                loanName: '',
                loanType: '',
                loanTotal: 0,
                debt: 0,
                interestRate: 0.0,
                loanDate: '',
            },
            dialog: false,
            editedIndex: -1,
            editedLoan: {
                id: 0,
                loanName: '',
                loanType: '',
                loanTotal: 0,
                debt: 0,
                interestRate: 0.0,
                loanDate: '',
            },
            headers: [
                {
                  text:     'Loan Name',
                  align:    'left',
                  sortable: false,
                  value:    'loanName'
                },
                { text: 'Loan Type', value: 'loanType' },
                { text: 'Debt', value: 'debt' },
                { text: 'Interest', value: 'interestRate' },
                { text: 'Loan Date', value: 'loanDate' },
                { text: 'Action', sortable: false }
            ],
            rules: {
                required:       value =>
                                !!value
                                || Constants.common.required,
            },
            snackbar: {
                state:      false,
                color:      '',
                mode:       '',
                timeout:    5000,
                text:       'Success',
                top:        true,
              },
            loans: [],
            title: '',
            search: '',
        }
    },
    mounted()  {
        Requests.loan.get(this);
    },
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? Constants.user.newUser : Constants.user.editUser
        },
    },
    watch: {
        dialog (val) {
            val || this.close()
        },
    },
    methods: {
        edit: function (loan) {
            this.states.edit = true;
            this.states.table = false;
            this.title = loan.loanName;

            this.formData.loanId = loan.loanId;
            this.formData.loanName = loan.loanName;
            this.formData.interestRate = loan.interestRate;
        },
        add: function () {
            this.clearForms(this.formData);
            this.clearErrors(this.errors);
            this.clearSuccess(this.success);
            this.states.add = true;
            this.states.table = false;
        },
        close () {
            this.dialog = false
            setTimeout(() => {
              this.editedLoan = Object.assign({}, this.defaultLoan)
              this.editedIndex = -1
            }, 300)
        },
        delete: function(loan) {
            for (var index in this.loans){
                if (id == this.loans[index].id) {
                  confirm(Constants.loan.deleteLoan) && this.loans.splice(index, 1);
                  let data = {
                    'id': id
                  }
                  Requests.loan.delete(data);
                  return;
                }
              }
        },
        save () {

        },
    },
    template:
    `
    <div>
    <template>
    <v-snackbar
    v-model="snackbar.state"
    :color="snackbar.color"
    :multi-line="'multi-line'"
    :timeout="snackbar.timeout"
    :top="snackbar.top"
    :vertical="'vertical'"
    >
      {{ snackbar.text }}
      <v-btn
        dark
        flat
        color="white"
        @click="snackbar.state = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-divider class="mx-2" inset vertical></v-divider>
    <v-toolbar flat color="white">
      <v-toolbar-title>Loans</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>

      <v-divider class="mx-2" inset vertical></v-divider>
    

    <!--- ADD AND EDIT FORM -->
      <v-dialog v-model="dialog" max-width="500px">
      
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Loan</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>


          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
<!-- EDIT USER -->
                <template v-if='editedIndex > -1'>
                  <v-flex xs12 sm6 md12>
                    <v-text-field 
                    v-model="editedLoan.loanName"
                    label="Loan Name"
                    outline
                    clearable
                    disabled
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md12>
                    <v-text-field 
                     clearable
                     v-model="editedLoan.loanType"
                     label="Type"
                     outline
                     clearable
                     ></v-text-field>
                  </v-flex>
                  
                  </v-flex>
                </template>

<!-- ADD USER -->
                <template v-else>
                  <v-flex xs12 sm6 md12>
                    <v-text-field
                     v-model="editedLoan.loanName"
                     label="Loan Name"
                     outline
                     clearable


                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md12>
                    <v-text-field
                     v-model="editedLoan.loanType"
                     label="loanType"
                     outline
                     clearable
                     ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md12>
                    <v-text-field
                     v-model="editedLoan.loanTotal"
                     label="Confirm type"
                     clearable
                     outline
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md12>
                    <v-text-field 
                     clearable
                     v-model="editedLoan.loanType"
                     label="loanType"
                     outline
                     ></v-text-field>
                  </v-flex>
                 
                </template>                    
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="blue-grey" @click="close">
              <v-icon left dark>cancel</v-icon>  
              Cancel</v-btn>
            <v-btn flat color="blue darken-2" @click="save">
              <v-icon left dark>person_add</v-icon>
              Save
            
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    
    
    <v-app>
      <v-data-table :headers="headers" :items="loans" :search="search" class="elevation-1">

        <template v-slot:no-data>
            <v-alert :value="true" color="error" icon="warning">
            Sorry, nothing to display here :(
            </v-alert>
        </template>


        <template v-slot:items="props">
          <td>{{ props.item.loanName }}</td>
          <td class="text-xs-left">{{ props.item.loanType }}</td>
          <td class="text-xs-left">{{ props.item.debt }}</td>
          <td class="text-xs-left">{{ props.item.interestRate }}</td>
          <td class="text-xs-left">{{ props.item.loanDate }}</td>  
          <td class="text-xs-left">
            <v-icon color='green darken-2' small class="mr-2" @click="edit(props.item)">
              edit
            </v-icon>
            <v-icon color='red darken-2' small @click="deleteUser(props.item.id)">
              delete
            </v-icon>
          </td>
        </template>
      </v-data-table>
    </v-app>


  </template>
    </div>
    `
  }