import Constants from '../services/constants.js'
import Requests from '../services/requests.js'
import Common from '../services/common.js'

export default{
    name: 'user-table',
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
        }
    },
    methods: {
      close() {
        this.dialog = false;
        this.editedIndex = -1;
      },
      edit(item) {
        console.log(item)
        this.dialog = true;
        this.edited =  item;
        this.editedIndex = this.edited.id;
      },
      hide(id) {
        for (var index in this.mbtis){
          if (id == this.mbtis[index].id) {
            confirm(Constants.user.deleteUser) && this.mbtis.splice(index, 1);
            let data = {
              'id': id
            }
            Requests.mbti.delete(data);
            return;
          }
        }
      },
      save(){

      },
    },
    mounted()  {
        Requests.mbti.get(this);
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
                    <v-text-field 
                      clearable
                      v-model="edited.gender"
                      label="Gender"
                      outline
                      clearable
                      ></v-text-field>
                  </v-flex>

                  <v-flex xs12 sm6 md12>
                    <v-overflow-btn
                      :items="type"
                      label="Type"
                      outline
                      :placeholder="edited.type"
                      v-model="edited.type"
                    ></v-overflow-btn>
                  </v-flex>
                </template>

<!-- ADD USER -->
                                   
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