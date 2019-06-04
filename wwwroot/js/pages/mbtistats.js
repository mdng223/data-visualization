import Requests from '../services/requests.js'
import constants from '../services/constants.js';


export default {
    name: 'user-table',
    created() {
        console.log('created');
        Requests.mbti.get(this);
        Requests.mbti.getNF(this);
        Requests.mbti.getNT(this);
        Requests.mbti.getSJ(this);
        Requests.mbti.getSP(this);
    },
    computed: {
        formTitle() {
            this.title = constants.mbtiStats.title;
        },
        
    },
    data: function() {
        return {
          label: {
            NT: 'Analysts',
            NF: 'Diplomats', 
            SJ: 'Sentinels',
            SP: 'Explorers',
            temperamentPieChart: {
                categories: {
                    NF: {
                        advocate: 'INFJ',
                        campaigner: 'ENFP',
                        mediator: 'INFP',
                        protagonist: 'ENFJ'
                    },
                    NT: {

                    },
                    SJ: {

                    },
                    SP: {

                    },
                },
                subTitle: 'NT, NF, SJ, SP',
                title: 'Temperaments',
            },
            title: 'MBTI statistics',
            total: 'Total',
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
          title: '',
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
        this.total += this.state.NT ? ntTotal : -1 * ntTotal;
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
        advocatePercentage() {
            console.log(typeof(this.temperament.NF.infjPercentage), this.temperament.NF.infjPercentage)
            return this.temperament.NF.infjPercentage;
        },
        colors() {
            var colors = Highcharts.getOptions().colors,
            categories = [
                this.label.NF,
                this.label.SJ,
                this.label.SP,
                this.label.NT,
            ],
            data = [
                {
                    y: this.temperament.NF.totalPercentage,
                    color: colors[2],
                    drilldown: {
                        name: this.label.NF,
                        categories: [
                            this.temperament.NF.mbtiTypes[0].name,
                            this.temperament.NF.mbtiTypes[1].name,
                            this.temperament.NF.mbtiTypes[2].name,
                            this.temperament.NF.mbtiTypes[3].name,
                        ],
                        data: [
                            this.temperament.NF.mbtiTypes[0].totalPercentage,
                            this.temperament.NF.mbtiTypes[1].totalPercentage,
                            this.temperament.NF.mbtiTypes[2].totalPercentage,
                            this.temperament.NF.mbtiTypes[3].totalPercentage,
                        ]
                    }
                },
                {
                y: 7.23,
                color: colors[0],
                drilldown: {
                    name: this.label.SJ,
                    categories: [
                    'Internet Explorer v11.0',
                    'Internet Explorer v10.0',
                    'Internet Explorer v9.0',
                    'Internet Explorer v8.0'
                    ],
                    data: [
                    6.2,
                    0.29,
                    0.27,
                    0.47
                    ]
                }
                },
                {
                y: 5.58,
                color: colors[3],
                drilldown: {
                    name: this.label.SP,
                    categories: [
                    'Safari v11.0',
                    'Safari v10.1',
                    'Safari v10.0',
                    'Safari v9.1',
                    'Safari v9.0',
                    'Safari v5.1'
                    ],
                    data: [
                    3.39,
                    0.96,
                    0.36,
                    0.54,
                    0.13,
                    0.2
                    ]
                }
                },
                {
                y: 4.02,
                color: colors[5],
                drilldown: {
                    name: this.label.NT,
                    categories: [
                    'Edge v16',
                    'Edge v15',
                    'Edge v14',
                    'Edge v13'
                    ],
                    data: [
                    2.6,
                    0.92,
                    0.4,
                    0.1
                    ]
                }
                },
            ],
            browserData = [],
            versionsData = [],
            i,
            j,
            dataLen = data.length,
            drillDataLen,
            brightness;


            // Build the data arrays
            for (i = 0; i < dataLen; i += 1) {
            // add browser data
            browserData.push({
                name: categories[i],
                y: data[i].y,
                color: data[i].color
            });

            // add version data
            drillDataLen = data[i].drilldown.data.length;
            for (j = 0; j < drillDataLen; j += 1) {
                brightness = 0.2 - (j / drillDataLen) / 5;
                versionsData.push({
                name: data[i].drilldown.categories[j],
                y: data[i].drilldown.data[j],
                color: Highcharts.Color(data[i].color).brighten(brightness).get()
                });
            }
            }

            // Create the chart
            Highcharts.chart('container', {
            chart: {
                type: 'pie'
            },
            title: {
                text: this.label.temperamentPieChart.title
            },
            subtitle: {
                text: this.label.temperamentPieChart.subTitle
            },
            plotOptions: {
                pie: {
                shadow: false,
                center: ['50%', '50%']
                }
            },
            tooltip: {
                valueSuffix: '%'
            },
            series: [{
                name: 'Browsers',
                data: browserData,
                size: '60%',
                dataLabels: {
                formatter: function () {
                    return this.y > 5 ? this.point.name : null;
                },
                color: '#ffffff',
                distance: -30
                }
            }, {
                name: 'Versions',
                data: versionsData,
                size: '80%',
                innerSize: '60%',
                dataLabels: {
                formatter: function () {
                    // display only if larger than 1
                    return this.y > 1 ? '<b>' + this.point.name + ':</b> ' +
                    this.y + '%' : null;
                }
                },
                id: 'versions'
            }],
            responsive: {
                rules: [{
                condition: {
                    maxWidth: 400
                },
                chartOptions: {
                    series: [{
                    id: 'versions',
                    dataLabels: {
                        enabled: false
                    }
                    }]
                }
                }]
            }
            });
        }
    },
    mounted()  {
        console.log('mounted');
      console.log(this.temperament.NF.infjPercentage);
      
    },
    template:
`
<div>
  <v-divider class="mx-2" inset vertical></v-divider>
  <v-toolbar flat color="white">
    <v-toolbar-title>{{ label.title }}</v-toolbar-title>
    <v-spacer></v-spacer>
  </v-toolbar>

  <v-app id="inspire">
    <v-card flat class="py-5">
      <v-card-text>
        <v-container fluid class="pa-0">
          <v-layout row wrap>
            <v-flex xs12 sm6 class="py-2">

            <v-btn 
            flat
            color="error"
            v-on:click="colors"
            :value="1">
              show stats
            </v-btn>

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
                  <p>{{ label.NT }} {{ temperament.NT.total }}</p>
              </template>
              <template v-if="state.NF">
                  <p>{{ label.NT }} {{ temperament.NF.total }}</p>
              </template>
              <template v-if="state.SJ">
                  <p>{{ label.NT }} {{ temperament.SJ.total }}</p>
              </template>
              <template v-if="state.SP">
                  <p>{{ label.NT }} {{ temperament.SP.total }}</p>
              </template>
              <p>{{ label.total }} {{ total }}</p>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
    <div id="container"></div>
  </v-app>
</div>
`
}