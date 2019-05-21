import Constants from '../services/constants.js'
import Requests from '../services/requests.js'
import Common from '../services/common.js'

export default{
    name: 'user-table',
    data: function() {
        return {
            headers: [
                {
                  text:     'Name',
                  align:    'left',
                  sortable: false,
                  value:    'firstName' + ' ' + 'lastName'
                },
                { text: 'Type', value: 'type' },
                { text: 'Gender', value: 'gender' },
              ],
            mbtis: [],
        }
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
        


    </v-toolbar>
        
        <v-app>
          <v-data-table :headers="headers" :items="mbtis" :search="search" class="elevation-1">

            <template v-slot:no-data>
                <v-alert :value="true" color="error" icon="warning">
                Sorry, nothing to display here :(
                </v-alert>
            </template>


            <template v-slot:items="props">
              <td>{{ props.item.firstName }}</td>
              <td class="text-xs-left">{{ props.item.type }}</td>
              <td class="text-xs-left">{{ props.item.gender }}</td>  
            </template>
          </v-data-table>
        </v-app>


      </template>
    </div>
    `
}