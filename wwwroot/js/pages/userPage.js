import Constants from '../services/constants.js'
import Requests from '../services/requests.js'
import Common from '../services/common.js'

export default{
    name: 'user-table',
    data: function() {
        return {
            search: '',
            roles: [],
            users: [],
            editedIndex: -1,
            dialog: false,
            tempEmail: '',
            tempUsername: '',
            headers: [
              {
                text:     'Username',
                align:    'left',
                sortable: false,
                value:    'username'
              },
              { text: 'Email', value: 'email' },
              { text: 'Role', value: 'role' },
              { text: 'Action', value: 'name', sortable: false }
            ],
            snackbar: {
              state:      false,
              color:      '',
              mode:       '',
              timeout:    5000,
              text:       'Success',
              top:        true,
            },
            rules: {
              required:       value =>
                              !!value
                              || Constants.common.required,
              usernameLength: value =>
                              !!value
                              && value.length >= 4
                              && value.length <= 20
                              || Constants.user.usernameLength,
              passwordLength: value =>
                              !!value
                              && value.length >= 8
                              && value.length <= 50
                              || Constants.user.passwordLength,
              lowercase:      value =>
                              Constants.patterns.lowercase.test(value)
                              || Constants.user.lowercase,
              uppercase:      value =>
                              Constants.patterns.uppercase.test(value)
                              || Constants.user.uppercase,
              number:         value =>
                              Constants.patterns.number.test(value)
                              || Constants.user.number,
              email:          value => 
                              !!value
                              && Constants.patterns.email.test(value)
                              || Constants.user.email,
              uniqueUsername: value =>
                              Common.uniqueValue(value, this.getUsernames(this.users.length),
                                               this.users.length, this.tempUsername)
                              || Constants.user.uniqueUsername,
              uniqueEmail:    value =>
                              Common.uniqueValue(value, this.getEmails(this.users.length),
                                               this.users.length, this.tempEmail)
                              || Constants.user.uniqueEmail,
              passwordMatch:  value =>
                              value == this.editedUser.password
                              || Constants.user.passwordMatch,
            },
            editedUser: {
              id: 0,
              username: '',
              email: '',
              roleId: 0,
              roleName: '',
              password: '',
              password2: '',
            },
            defaultUser: {
              id: 0,
              username: '',
              email: '',
              roleId: 0,
              roleName: '',
              password: '',
              password2: '',
            },
        }
    },
    created() {
    },
    mounted()  {
      Requests.user.get(this);
      Requests.role.get(this);
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
        save () {
          let data = {
            'email': this.editedUser.email,
            'roleId': this.getRoleId(this.editedUser.roleName)
          };
          if (this.editedIndex > -1) { /* EDIT USER */
            if (this.rules.email(this.editedUser.email) == Constants.user.email
                || this.rules.uniqueEmail(this.editedUser.email) == Constants.user.uniqueEmail
                || this.rules.required(this.editedUser.roleName) == Constants.common.required
                || this.rules.required(this.editedUser.username) == Constants.common.required) {
              this.snackbar.text = Constants.common.editFailure + this.editedUser.username;
              this.snackbar.color = "red";
              this.snackbar.state = true;
            } else {
              //this.users[this.editedIndex - 1], this.editedUser);
              Object.assign(this.users.find(u => u.username == this.editedUser.username),
                            this.editedUser);
              data.id = this.editedUser.id;
              Requests.user.edit(data);
              this.snackbar.text = Constants.common.editSuccess + this.editedUser.username;
              this.snackbar.color = "success";
              this.snackbar.state = true;
              this.close();
            }
          } else { /* ADD USER */
            this.tempUsername = this.editedUser.username;
            if (
              this.rules.usernameLength(this.editedUser.username) == Constants.user.usernameLength
              || this.rules.uniqueUsername(this.editedUser.username) == Constants.user.uniqueUsername
              || this.rules.email(this.editedUser.email) == Constants.user.email
              || this.rules.uniqueEmail(this.editedUser.email) == Constants.user.uniqueEmail
              || this.rules.passwordLength(this.editedUser.password) == Constants.user.passwordLength
              || this.rules.lowercase(this.editedUser.password) == Constants.user.lowercase
              || this.rules.uppercase(this.editedUser.password) == Constants.user.uppercase
              || this.rules.number(this.editedUser.password) == Constants.user.number
              || this.rules.passwordMatch(this.editedUser.password2) == Constants.user.passwordMatch
              || this.rules.required(this.editedUser.roleName) == Constants.common.required
              ) {
              this.snackbar.text = Constants.user.addFailure + this.editedUser.username;
              this.snackbar.color = 'red';
              this.snackbar.state = true;
            } else {
              this.users.push(this.editedUser)
              data.username = this.editedUser.username;
              data.password = this.editedUser.password;
              data.roleName = this.editedUser.roleName;
              data.roleId = this.getRoleId(this.editedUser.roleName)
              console.log(data);
              Requests.user.add(data);
              this.snackbar.text = Constants.user.addSuccess + this.editedUser.username;
              this.snackbar.color = 'success';
              this.snackbar.state = true;
              this.close();
            }
          }
        },
        edit (user) {
            this.dialog = true;
            this.editedUser = Object.assign({}, user);
            this.editedIndex = this.editedUser.id;
            this.editedUser.roleId = this.getRoleId(this.editedUser.roleName);
            this.tempEmail = this.editedUser.email;
        },
        getRoleId (roleName) {
            if (roleName == Constants.roles.administrator){
                return 1;
            } else if (roleName == Constants.roles.manager) {
                return 2;
            } else if (roleName == Constants.roles.user) {
                return 3;
            }
            return 0;
        },
        deleteUser (id) {
          for (var user in this.users){
            if (id == this.users[user].id) {
              confirm(Constants.user.deleteUser) && this.users.splice(user, 1);
              let data = {
                'id': id
              }
              Requests.user.delete(data);
              return;
            }
          }
        },
        close () {
          this.dialog = false
          setTimeout(() => {
            this.editedUser = Object.assign({}, this.defaultUser)
            this.editedIndex = -1
          }, 300)
        },
        getUsernames (length) {
          let usernames = [];
          for (let i = 0; i < length; i++){ 
              usernames.push(this.users[i].username);
          }
          return usernames;
        },
        getEmails (length) {
          let emails = [];
          for (let i = 0; i < length; i++) {
              emails.push(this.users[i].email);
          }
          return emails;
        },
    },
    template: `
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
          <v-toolbar-title>Users</v-toolbar-title>
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
              <v-btn color="primary" dark class="mb-2" v-on="on">New User</v-btn>
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
                        v-model="editedUser.username"
                        label="Username"
                        outline
                        clearable
                        disabled
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md12>
                        <v-text-field 
                         clearable
                         v-model="editedUser.email"
                         label="Email"
                         outline
                         clearable
                         :rules="[rules.email, rules.uniqueEmail]"
                         ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md12>
                        <v-overflow-btn
                          :items="roles"
                          label="Roles"
                          outline
                          :placeholder="editedUser.roleName"
                          v-model="editedUser.roleName"
                        ></v-overflow-btn>
                      </v-flex>
                    </template>

<!-- ADD USER -->
                    <template v-else>
                      <v-flex xs12 sm6 md12>
                        <v-text-field
                         v-model="editedUser.username"
                         label="Username"
                         outline
                         clearable
                         :rules="[rules.usernameLength, rules.uniqueUsername]"
                         counter="20"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md12>
                        <v-text-field
                         v-model="editedUser.password"
                         label="Password"
                         outline
                         clearable
                         :rules="[rules.passwordLength, rules.lowercase, rules.uppercase, rules.number]"
                         counter="50"
                         ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md12>
                        <v-text-field
                         v-model="editedUser.password2"
                         label="Confirm Password"
                         clearable
                         outline
                         :rules="[rules.passwordMatch]"
                         counter="50"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md12>
                        <v-text-field 
                         clearable
                         v-model="editedUser.email"
                         label="Email"
                         outline
                         :rules="[rules.email, rules.uniqueEmail]"
                         ></v-text-field>
                      </v-flex>
                      <v-overflow-btn
                        :items="roles"
                        label="Roles"
                        clearable
                        outline
                        :rules="[rules.required]"
                        v-model="editedUser.roleName"
                      ></v-overflow-btn>
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
          <v-data-table :headers="headers" :items="users" :search="search" class="elevation-1">

            <template v-slot:no-data>
                <v-alert :value="true" color="error" icon="warning">
                Sorry, nothing to display here :(
                </v-alert>
            </template>


            <template v-slot:items="props">
              <td>{{ props.item.username }}</td>
              <td class="text-xs-left">{{ props.item.email }}</td>
              <td class="text-xs-left">{{ props.item.roleName }}</td>  
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