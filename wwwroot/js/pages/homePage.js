import Requests from '../services/requests.js'

export default {
  name: 'user-table',
    data: function() {
        return {
          label: {
            mbti: 'MBTI statistics',
            NT: 'Analysts',
            NF: 'Diplomats', 
            SJ: 'Sentinels',
            SP: 'Explorers',
          },
          mbtis: [],
          state: {
            NF: true,
            NT: true,            
            SJ: true,
            SP: true,
          },
          temperament: {
            NF: {},
            NT: {},
            SJ: {},
            SP: {}
          },
          toggle_multiple: [1, 2, 3, 4],
          total: 0,
        }
    },
    methods: {
      /*
       *  Purpose: This will aggregate the total based on which
       *           temperament is active. 
       */
      nfButton() {
        let nfTotal = this.temperament.NF.total;
        this.state.NF = !this.state.NF;
        this.total += this.state.NF ? nfTotal : -1 * nfTotal;
      },
      ntButton() {
        let ntTotal = this.temperament.NT.total;
        this.state.NT = !this.state.NT;
        this.total += this.state.NF ? ntTotal : -1 * ntTotal;
      },      
      sjButton() {
        let sjTotal = this.temperament.SJ.total;
        this.state.SJ = !this.state.SJ;
        this.total += this.state.SJ ? sjTotal : -1 * sjTotal;
      },
      spButton() {
        let spTotal = this.temperament.SP.total;
        this.state.SP = !this.state.SP;
        this.total += this.state.SP ? spTotal : -1 * spTotal;
      },
    },
    mounted()  {
      Requests.mbti.get(this);
      Requests.mbti.getNF(this);
      Requests.mbti.getNT(this);
      Requests.mbti.getSJ(this);
      Requests.mbti.getSP(this);
    },
    template:
`
<div>
  <h1>Home Page</h1>
  <h3> TO DO </h3>
  <ol>
      <li> MBTI: Introvert:Extrovert pie chart </li>
      <li> MBTI: N:S pie chart </li>
      <li> MBTI: T:F pie chart </li>
      <li> MBTI: J:P pie chart </li>
      <li> MBTI: Male:Female pie chart </li>
      <li> MBTI: type bar chart </li>
      <li> MBTI: NF vs NT vs SJ vs SP pie chart </li>
      <li> MBTI: add </li>
      <li> MBTI: edit feature </li>
      <li> SHOWS: bar chart for 1-10 shows for half ints and ints</li>
      <li> SHOWS: create entity </li>
      <li> SHOWS: create controller </li>
      <li> SHOWS: create model </li>
      <li> SHOWS: create page.js </li>
      <li> LOANS: graph  </li>
      <li> LOANS: delete  </li>
      <li> LOANS: Edit  </li>
      <li> BANKS: graph  </li>
      <li> BANKS: delete  </li>
      <li> BANKS: Edit  </li>
  </ol> 
  <v-app id="inspire">
    <v-card flat class="py-5">
      <v-card-text>
        <v-container fluid class="pa-0">
          <v-layout row wrap>
            <v-flex xs12 sm6 class="py-2">
              <h3 class="text-md-center">{{ label.mbti }}</h3>

              <v-btn-toggle v-model="toggle_multiple" multiple>
                <v-btn 
                flat
                color="error"
                v-on:click="ntButton"
                :value="1">
                  <v-icon>local_cafe</v-icon>
                  {{ label.NT }}
                </v-btn>
                
                <v-btn
                flat
                color="success"
                v-on:click="nfButton"
                :value="2">
                  <v-icon>pets</v-icon>
                  {{ label.NF }}
                </v-btn>

                <v-btn
                flat
                color="primary"
                v-on:click="sjButton"
                :value="3">
                  <v-icon>mood</v-icon>
                  {{ label.SJ }}
                </v-btn>

                <v-btn
                flat
                color="warning"
                v-on:click="spButton"
                :value="4">
                  <v-icon>directions_run</v-icon>
                  {{ label.SP }}
                </v-btn>

              </v-btn-toggle>
              <template v-if="state.NT">
                  <p>{{ temperament.NT.total }}</p>
              </template>
              <template v-if="state.NF">
                  <p>{{ temperament.NF.total }}</p>
              </template>
              <template v-if="state.SJ">
                  <p>{{ temperament.SJ.total }}</p>
              </template>
              <template v-if="state.SP">
                  <p>{{ temperament.SP.total }}</p>
              </template>
              <p>{{ total }}</p>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-app>
</div>
`
}