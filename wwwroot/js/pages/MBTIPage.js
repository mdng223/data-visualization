import Constants from '../services/constants.js'
import Requests from '../services/requests.js'
import Common from '../services/common.js'
import Requests from './requests.js';

export default{
    name: 'mbti-table',
    data: function() {
        return {
          dialog: false,
          formTitle: '',
          search: '',
          editedIndex: -1,
          edited: {
            firstName: '',
            lastName: '',
            gender: '',
            type: '',
          },
          genders: ['male', 'female'],
          headers: [
              {
                text:     'First Name',
                align:    'left',
                sortable: true,
                value:    'firstName'
              },
              {
                text:     'Last Name',
                align:    'left',
                sortable: true,
                value:    'lastName'
              },
              { text: 'Type', value: 'type', sortable: false },
              { text: 'Gender', value: 'gender', sortable: false },
              { text: 'Action', sortable: false }
            ],
          mbtis: [],
          rules: {
            required:       value =>
                            !!value
                            || Constants.common.required,
          },
          types: [],
        }
    },
    methods: {
      close() {
        this.dialog = false;
        this.editedIndex = -1;
        Common.clearObject(this.edited);
      },
      /**
       * This will populate the dialog forms with the current
       * item if it exists. Otherwise, it will output an error.
       * @param {object} item 
       */
      edit(item) {
        if (this.mbtis.includes(item)) {
            this.dialog = true;
            this.edited = item;
            this.editedIndex = this.edited.id;
        } else {
            that.snackbar.color = Constants.color.red;
            that.snackbar.text = Constants.common.editFailure;
            that.snackbar.state = true;
        }
      },
      /**
       * This will send a request to server to try to hide an mbti.
       * It will send -1 to the server if id cannot be found.
       * @param {int} id
       */
      hide(id) {
        let data = {
            id: -1
        };

        if (Common.doesIdExist(Number(id), this.mbtis)){
            confirm(Constants.user.deleteUser) && this.mbtis.splice(index, 1);
            data.id = id;
        }
        Requests.mbti.hide(data);
      },
      save(){
        Requests.mbti.add(this.edited);
      },
    },
    mounted()  {
        Requests.mbti.get(this);
        Requests.mbti.getGenders(this);
        Requests.mbti.getMbtiTypes(this);
    },
    template: `
    <div>
      <template>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-toolbar flat color="white">
          <v-toolbar-title>MBTI</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-toolbar>
        
      <v-dialog v-model="dialog" max-width="500px">
          
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New MBTI</v-btn>
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
                    v-model="edited.firstName"
                    label="First Name"
                    outline
                    clearable                    
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md12>
                    <v-text-field 
                    v-model="edited.lastName"
                    label="Last Name"
                    outline
                    clearable
                    
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md12>
                    <v-overflow-btn
                      :items="genders"
                      label="Gender"
                      outline
                      :placeholder="edited.gender"
                      v-model="edited.gender"
                    ></v-overflow-btn>
                  </v-flex>
                  <v-flex xs12 sm6 md12>
                    <v-overflow-btn
                      :items="types"
                      label="Type"
                      outline
                      :placeholder="edited.type"
                      v-model="edited.type"
                    ></v-overflow-btn>
                  </v-flex>
                </template>
<!-- ADD USER -->
              <template v-else>
                <v-flex xs12 sm6 md12>
                  <v-text-field 
                    v-model="edited.firstName"
                    label="First Name"
                    outline
                    clearable                    
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field 
                  v-model="edited.lastName"
                  label="Last Name"
                  outline
                  clearable
                  
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-overflow-btn
                    :items="genders"
                    label="Gender"
                    outline
                    :placeholder="edited.gender"
                    v-model="edited.gender"
                  ></v-overflow-btn>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-overflow-btn
                    :items="types"
                    label="Type"
                    outline
                    :placeholder="edited.type"
                    v-model="edited.type"
                  ></v-overflow-btn>
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
          <v-data-table 
            :headers="headers"
            :items="mbtis"
            :search="search"
            class="elevation-1">
            <template v-slot:no-data>
                <v-alert :value="true" color="error" icon="warning">
                Sorry, nothing to display here :(
                </v-alert>
            </template>
            <template v-slot:items="props">
              <td>{{ props.item.firstName }}</td>
              <td> {{ props.item.lastName }}</td>
              <td class="text-xs-left">{{ props.item.type }}</td>
              <td class="text-xs-left">{{ props.item.gender }}</td>  
              <td class="text-xs-left">
              <v-icon color='green darken-2' small class="mr-2" @click="edit(props.item)">
                edit
              </v-icon>
              <v-icon color='red darken-2' small @click="hide(props.item.id)">
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