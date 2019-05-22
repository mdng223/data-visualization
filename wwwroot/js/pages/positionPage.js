import Constants from '../services/constants.js'
import Requests from '../services/requests.js'
import Common from '../services/common.js'

export default{
    name: 'position-table',
    data: function() {
        return {
            positions:      [],
            editedIndex:    -1,
            dialog:         false,
            search:         '',
            users:          [],
            temp: {
                positionName: '',
                symbol: '',
            },
            headers: [
                {
                  text:     'Position Name',
                  align:    'left',
                  sortable: true,
                  value:    'positionName'
                },
                { text: 'Symbol', value: 'symbol' },
                { text: 'Username', value: 'username' },
                { text: 'Action', sortable: false }
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
                positionLength: value =>
                                !!value
                                && value.length >= 4
                                && value.length <= 20
                                || Constants.position.positionLength,
                uniquePosition: value =>
                                Common.uniqueValue(value, this.getPositions(this.positions.length),
                                                   this.positions.length, this.temp.positionName)
                                || Constants.position.uniquePosition,
                uniqueSymbol:   value =>
                                Common.uniqueValue(value, this.getSymbols(this.positions.length),
                                                   this.positions.length, this.temp.symbol)
                                || Constants.position.uniqueSymbol,
              },
            editedPosition: {
                positionId:     0,
                positionName:   '',
                symbol:         '',
                accountTypeId:  0,
                username:       '',
            },
            defaultUser: {
                positionId:     0,
                positionName:   '',
                symbol:         '',
                accountTypeId:  0,
                username:       '',
            },
        }
    },
    mounted()  {
        Requests.position.get(this);
        Requests.user.get(this);
    },
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? Constants.position.newPosition
                                           : Constants.position.editPosition
          },
    },
    watch: {
        dialog (val) {
            val || this.close()
        },
    },
    methods: {
        close () {
            this.dialog = false
            setTimeout(() => {
              this.editedPosition = Object.assign({}, this.defaultPosition)
              this.editedIndex = -1
            }, 300)
        },
        edit (position) {
            this.dialog = true;
            Object.assign(this.editedPosition, position);
            this.editedIndex = this.editedPosition.positionId;
            this.temp.symbol = this.editedPosition.symbol;
        },
        save () {
            let data = {
              'positionName':   this.editedPosition.positionName,
              'Id':     this.editedPosition.positionId,
              'symbol':         this.editedPosition.symbol,
            };
            if (this.editedIndex > -1) { /* EDIT USER */
              if (this.rules.required(this.editedPosition.symbol)
                  == Constants.common.required
                  || this.rules.uniqueSymbol(this.editedPosition.symbol)
                  == Constants.position.uniqueSymbol) {
                this.snackbar.text = Constants.common.editFailure + this.editedPosition.positionName;
                this.snackbar.color = "red";
                this.snackbar.state = true;
              } else {
                Object.assign(this.positions[this.editedIndex - 1], this.editedPosition);
                data.userId = this.getUserId(this.editedPosition.username);
                console.log(data);
                Requests.position.edit(data);
                this.snackbar.text = Constants.common.editSuccess + this.editedPosition.username;
                this.snackbar.color = "success";
                this.snackbar.state = true;
                this.close();
              }
            }
          },
        getSymbols (length) {
            let symbols = [];
            for (let i = 0; i < length; i++){
                symbols.push(this.positions[i].symbol);
            }
            return symbols;
        },
        getPositions (length) {
            let positions = [];
            for (let i = 0; i < length; i++){ 
                positions.push(this.positions[i].positionName);
            }
            return positions;
        },
        getUserId (username) {
            console.log(username);
            for (var i in this.users){
                if (username == this.users[i].username) {
                    return this.users[i].id;
                }
            }
        }
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
                    :vertical="'vertical'">
                {{ snackbar.text }}
                <v-btn  dark
                        flat
                        color="white"
                        @click="snackbar.state = false">
                    Close
                </v-btn>
            </v-snackbar>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-toolbar flat color="white">
            <v-toolbar-title>Positions</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details>
                </v-text-field>
                <v-divider class="mx-2" inset vertical></v-divider>
<!--- ADD/EDIT FORM -->
                <v-dialog v-model="dialog" max-width="500px">
                
                    <template v-slot:activator="{ on }">
                        <v-btn  color="primary"
                                dark class="mb-2"
                                v-on="on">
                            New Position
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
        
        
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
<!-- EDIT -->
                                <template v-if='editedIndex > -1'>
                                    <v-flex xs12 sm6 md12>
                                        <v-text-field 
                                            v-model="editedPosition.positionName"
                                            label="Position Name"
                                            outline
                                            disabled>
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md12>
                                        <v-text-field 
                                            v-model="editedPosition.symbol"
                                            label="Symbol"
                                            outline
                                            :rules="[rules.uniqueSymbol, rules.required]">
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md12>
                                    <v-text-field 
                                        v-model="editedPosition.username"
                                        label="Username"
                                        outline
                                        disabled>
                                    </v-text-field>
                                  </v-flex>
                                </template>
                                
                                
                                </v-layout>
                            </v-container>
                        </v-card-text>
            
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat color="blue-grey" @click="close">
                                <v-icon left dark>cancel</v-icon>  
                                Cancel
                            </v-btn>
                            <v-btn flat color="blue darken-2" @click="save">
                                <v-icon left dark>person_add</v-icon>
                                Save
                            
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>

        <v-app>
            <v-data-table :headers="headers" :items="positions" :search="search" class="elevation-1">
  
              <template v-slot:no-data>
                  <v-alert :value="true" color="error" icon="warning">
                  Sorry, nothing to display here :(
                  </v-alert>
              </template>
  
  
              <template v-slot:items="props">
                <td>{{ props.item.positionName }}</td>
                <td class="text-xs-left">{{ props.item.symbol }}</td>
                <td class="text-xs-left">{{ props.item.username }}</td>  
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