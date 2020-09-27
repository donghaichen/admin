<template>
    <div class="dashboard">
        <a-row :gutter="[16,16]">
            <a-col :span="6">
                <a-card  :bordered="false">
                    <div class="chartCard">
                        <div class="chartHeader">
                            <div class="metaWrap">
                                <div class="meta"><span>访客</span></div>
                                <div class="total"><span>{{view.total.toLocaleString()}}</span></div>
                            </div>
                            <div class="action">
                                <a-tooltip>
                                    <template v-slot:title>
                                        全站总访客量
                                    </template>
                                    <QuestionCircleOutlined />
                                </a-tooltip>
                            </div>
                        </div>
                        <div class="chartContent">
                            <canvas id="canvas-0" width="310" height="55" style="width: 100%; height:auto; cursor: default;"></canvas>
                        </div>
                        <div class="chartFooter">
                            <span class="label">近一月访客量</span>
                            <span class="number">{{parseInt(view.total / 100 + Math.random() * 10).toLocaleString()}}</span>
                        </div>
                    </div>
                </a-card>
            </a-col>
            <a-col :span="6">
                <a-card  :bordered="false">
                    <div class="chartCard">
                        <div class="chartHeader">
                            <div class="metaWrap">
                                <div class="meta"><span>产品</span></div>
                                <div class="total"><span>{{view.product.toLocaleString()}}</span></div>
                            </div>
                            <div class="action">
                                <a-tooltip>
                                    <template v-slot:title>
                                        产品总浏览量
                                    </template>
                                    <QuestionCircleOutlined />
                                </a-tooltip>
                            </div>
                        </div>
                        <div class="chartContent">
                            <canvas id="canvas-1" width="310" height="55" style="width: 100%; height:auto; cursor: default;"></canvas>
                        </div>
                        <div class="chartFooter">
                            <span class="label">产品总量</span>
                            <span class="number">99</span>
                        </div>
                    </div>
                </a-card>
            </a-col>
            <a-col :span="6">
                <a-card  :bordered="false">
                    <div class="chartCard">
                        <div class="chartHeader">
                            <div class="metaWrap">
                                <div class="meta"><span>新闻</span></div>
                                <div class="total"><span>{{view.news.toLocaleString()}}</span></div>
                            </div>
                            <div class="action">
                                <a-tooltip>
                                    <template v-slot:title>
                                       新闻总浏览量
                                    </template>
                                    <QuestionCircleOutlined />
                                </a-tooltip>
                            </div>
                        </div>
                        <div class="chartContent">
                            <canvas id="canvas-2" width="310" height="55" style="width: 100%; height:auto; cursor: default;"></canvas>
                        </div>
                        <div class="chartFooter">
                            <span class="label">新闻总量</span>
                            <span class="number">299</span>
                        </div>
                    </div>
                </a-card>
            </a-col>
            <a-col :span="6">
                <a-card  :bordered="false">
                    <div class="chartCard">
                        <div class="chartHeader">
                            <div class="metaWrap">
                                <div class="meta"><span>系统负载</span></div>
                                <div class="total"><span>{{system.load}}%</span></div>
                            </div>
                            <div class="action">
                                <a-popover title="负载百分比的含意">
                                    <template v-slot:content>
                                        <p>50% 以下  - 低负载状态运行</p>
                                        <p>50 ~ 80%  - 负载正常</p>
                                        <p>80% ~ 100% - 负载超核，需尽快排查</p>
                                    </template>
                                    <QuestionCircleOutlined />
                                </a-popover>
                            </div>
                        </div>
                        <div class="chartContent">
                            <a-progress :showInfo="false" :percent="system.load" status="active" :stroke-color="{'0%': '#1890ff','100%': '#f5222d',}" />
                            <a-progress style="margin-top: 10px;" :showInfo="false" :percent="system.storage" status="active" :stroke-color="{'0%': '#13c2c2','100%': '#f5222d',}"/>
                        </div>
                        <div class="chartFooter">
                            <a-row :gutter="[16,16]">
                                <a-col :span="12">
                                    <span class="label">系统负载</span>
                                    <span class="number">{{system.load}}%</span>
                                </a-col>
                                <a-col :span="12">
                                    <span class="label">硬盘使用</span>
                                    <span class="number">{{system.storage}}%</span>
                                </a-col>
                            </a-row>
                        </div>
                    </div>
                </a-card>
            </a-col>
        </a-row>
        <a-row :gutter="[16,16]">
            <a-col :span="24">
                <a-card :bordered="false" >
                    <a-tabs @change="callback">
                        <a-tab-pane key="1" tab="流量分析">
                            <canvas width="100%" height="400" id="canvas"></canvas>
                        </a-tab-pane>
                    </a-tabs>
                </a-card>

            </a-col>
        </a-row>
        <a-row :gutter="[16,16]">
            <a-col :span="12">
                <a-card :bordered="false" style="height: 420px; overflow: hidden;">
                    <a-tabs @change="callback" style="margin-top: -10px;">
                        <a-tab-pane key="1" tab="新闻">
                            <a-table :columns="columns" :data-source="data" :pagination="false">
                                <template v-slot:name="{ text }">
                                    <a>{{ text }}</a>
                                </template>
                            </a-table>
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="产品" force-render>
                            Content of Tab Pane 2
                        </a-tab-pane>
                    </a-tabs>
                </a-card>
            </a-col>
            <a-col :span="6">
                <a-card title="登录日志" :bordered="false" style="height:420px; overflow: hidden;">
                    <a-table :columns="columns1" :data-source="data1" :pagination="false" style="margin-top: -3px;">
                        <template v-slot:name="{ text }">
                            <a>{{ text }}</a>
                        </template>
                    </a-table>
                </a-card>
            </a-col>
            <a-col :span="6">
                <a-card title="更新日志" :bordered="false" style="height: 420px; overflow: hidden;">
                    <a-timeline style="margin-top: -10px;">
                        <a-timeline-item style="padding: 13px 0;">创建服务现场 2015-09-01</a-timeline-item>
                        <a-timeline-item style="padding: 13px 0;">初步排除网络异常 2015-09-01</a-timeline-item>
                        <a-timeline-item style="padding: 13px 0;">技术测试异常 2015-09-01</a-timeline-item>
                        <a-timeline-item style="padding: 13px 0;">网络异常正在修复 2015-09-01</a-timeline-item>
                        <a-timeline-item style="padding: 13px 0;">Create a services site 2015-09-01</a-timeline-item>
                        <a-timeline-item style="padding: 13px 0;">Create a services site 2015-09-01</a-timeline-item>
                        <a-timeline-item style="padding: 13px 0;">Create a services site 2015-09-01</a-timeline-item>
                    </a-timeline>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>
<script>
  import {
    QuestionCircleOutlined,
  } from '@ant-design/icons-vue';
  const columns = [
    {
      title: '标题',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '分类',
      dataIndex: 'money',
      ellipsis: true,
    },
    {
      title: '发布时间',
      dataIndex: 'address',
      ellipsis: true,
    },
  ];
  const data = [
    {
      key: '1',
      name: '中国科学报：“中科院解决卡脖子问题”靠不靠谱？',
      money: '行业新闻',
      address: '2020年9月27日 02:21:40',
    },
    {
      key: '2',
      name: '英超-B费压哨点杀 曼联门框4度救险3-2逆转险胜',
      money: '行业新闻',
      address: '2020年9月27日 02:21:40',
    },
    {
      key: '3',
      name: '校场：看似重要的空降坦克为何成了鸡肋？',
      money: '行业新闻',
      address: '2020年9月27日 02:21:40',
    },
    {
      key: '4',
      name: '校场：看似重要的空降坦克为何成了鸡肋？',
      money: '行业新闻',
      address: '2020年9月27日 02:21:40',
    },
    {
      key: '5',
      name: '校场：看似重要的空降坦克为何成了鸡肋？',
      money: '行业新闻',
      address: '2020年9月27日 02:21:40',
    },
  ];

  const columns1 = [
    {
      title: '用户名',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '登录时间',
      dataIndex: 'money',
      ellipsis: true,
    },
    {
      title: '登录 IP',
      ellipsis: true,
      dataIndex: 'address',
    },
  ];
  const data1 = [
    {
      key: '1',
      name: 'admin',
      money: '2020年9月27日 02:21:40',
      address: '127.0.0.1',
    },
    {
      key: '2',
      name: 'admin',
      money: '2020年9月27日 02:21:40',
      address: '127.0.0.1',
    },
    {
      key: '3',
      name: 'admin',
      money: '2020年9月27日 02:21:40',
      address: '127.0.0.1',
    },
    {
      key: '3',
      name: 'admin',
      money: '2020年9月27日 02:21:40',
      address: '127.0.0.1',
    },
    {
      key: '3',
      name: 'admin',
      money: '2020年9月27日 02:21:40',
      address: '127.0.0.1',
    },
  ];

  export default {
    components: {
      QuestionCircleOutlined

    },
    data() {
      return {
        Chart: false,
        data,
        columns,
        data1,
        columns1,
        system: {
          load: 79.57,
          storage: 65.38
        },
        view: {
          news: 50,
          product: 90,
          total: 90
        },

      }
    },
    watch(){

    },
    created() {
      // if (!this.Chart){
      //   this.appendChild('https://www.chartjs.org/dist/2.9.3/Chart.min.js')
      //   this.appendChild('https://www.chartjs.org/samples/latest/utils.js')
      // }
    },
    mounted() {
      this.init()
    },
    methods: {
       appendChild(url, type = 'script') {
         let head = document.head || document.getElementsByTagName('head')[0];
         let script = document.createElement(type);
         script.setAttribute("src", url);
         head.appendChild(script);
       },
      init() {
        setInterval(() => {
          this.system.load = this.randomNum(5000, 9500) / 100
          this.system.storage = this.randomNum(6000, 7000) / 100
        }, 3000)
        this.view.news = this.randomNum(3000, 4000)
        this.view.product = this.randomNum(3000, 3500)
        this.view.total = this.randomNum(8000, 10000)
        this.initCanvas()
      },
      randomNum(minNum, maxNum) {
        return parseInt(Math.random() * ( maxNum - minNum + 1 ) + minNum, 10)
      },
      getOptions() {
        return {
          animation:{
            duration: 3000
          },
          layout: {
            padding: {
              left: -15,
              right: 0,
              top: 0,
              bottom: -10
            }
          },
          scales: {
            xAxes: [{
              gridLines: {
                display:false
              },
              ticks: { //刻度
                display:false
              }
            }],
            yAxes: [{
              gridLines: {
                display:false
              },
              ticks: { //刻度
                display:false,
                beginAtZero: true
              }
            }]
          },
          legend: {
            display: false
          },
          tooltips: {
            enabled: false
          }
        }
      },
      getData(index,data, color, borderWidth, fill) {
        return  {
          labels: ['','','','','','','','','','','',''],
          datasets: [{
            data:  data[index],
            backgroundColor: color[index],
            borderWidth: borderWidth[index],
            borderColor: color[index],
            pointRadius: 0,
            fill: fill[index],
          }]
        }
      },
      initCanvas() {
        this.h5Canvas()
      },
      h5Canvas() {
        this.Chart = true
        let color = [
          'rgb(24, 144, 255)',
          'rgb(255, 99, 132)',
          'rgb(153, 102, 255)',
        ]
        let borderWidth = [
          0, 0, 3
        ]
        let fill = [
          true,true,false
        ]
        let data = [
          [
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
          ],
          [
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
          ],
          [
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
            this.randomNum(10, 100),
          ]
        ]
        let ctx1 = document.getElementById('canvas-0').getContext('2d');
        new window.Chart(ctx1, {
          type: "line",
          data: this.getData(0, data, color, borderWidth, fill),
          options: this.getOptions(0),
        });
        let ctx2 = document.getElementById('canvas-1').getContext('2d');
        new window.Chart(ctx2, {
          type: "bar",
          data: this.getData(1, data, color, borderWidth, fill),
          options: this.getOptions(1),
        })
        let ctx3 = document.getElementById('canvas-2').getContext('2d');
        new window.Chart(ctx3, {
          type: "line",
          data: this.getData(2, data, color, borderWidth, fill),
          options: this.getOptions(2),
        })
        var config = {
          type: 'line',
          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
              label: '总访问量',
              backgroundColor: color[0],
              borderColor: color[0],
              data: [
                this.randomNum(8000, 30000),
                this.randomNum(8000, 30000),
                this.randomNum(8000, 30000),
                this.randomNum(8000, 30000),
                this.randomNum(8000, 30000),
                this.randomNum(8000, 30000),
                this.randomNum(8000, 30000),
              ],
              fill: false,
            }, {
              label: '产品访问量',
              fill: false,
              backgroundColor: color[1],
              borderColor: color[1],
              data: [
                this.randomNum(1000, 10000),
                this.randomNum(1000, 10000),
                this.randomNum(1000, 10000),
                this.randomNum(1000, 10000),
                this.randomNum(1000, 10000),
                this.randomNum(1000, 10000),
                this.randomNum(1000, 10000),
              ],
            }, {
              label: '新闻访问量',
              fill: false,
              backgroundColor: color[2],
              borderColor: color[2],
              data: [
                this.randomNum(1000, 10000),
                this.randomNum(1000, 10000),
                this.randomNum(1000, 10000),
                this.randomNum(1000, 10000),
                this.randomNum(1000, 10000),
                this.randomNum(1000, 10000),
                this.randomNum(1000, 10000),
              ],
            }]
          },
          options: {
            responsive: true,
            title: {
              display: false,
            }
          }
        };
        let ctx = document.getElementById('canvas').getContext('2d');
        window.myLine = new window.Chart(ctx, config);
      }
    },
  }
</script>

<style scoped>
    .chartCard {
        position: relative;
    }
    .chartHeader {
        position: relative;
        width: 100%;
        overflow: hidden;
    }
    .chartHeader .metaWrap {
        float: left;
    }
    .chartHeader .metaWrap .meta {
        height: 22px;
        color: rgba(0,0,0,.45);
        font-size: 14px;
        line-height: 22px;
    }
    .chartHeader .action {
        position: absolute;
        top: 4px;
        right: 0;
        line-height: 1;
        cursor: pointer;
    }
    .chartHeader .total {
        height: 38px;
        margin-top: 4px;
        margin-bottom: 0;
        overflow: hidden;
        color: rgba(0,0,0,.85);
        font-size: 30px;
        line-height: 38px;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;
    }
    .chartContent {
        position: relative;
        width: 100%;
        height: 55px;
    }
    .chartHeader .chart {
        position: absolute;
        bottom: -28px;
        width: 100%;
    }
    .chartFooter {
        margin-top: 15px;
        padding-top: 10px;
        border-top: 1px solid #f0f0f0;
        height: 33px;
        overflow: hidden;
    }
    .chartFooter .label {
        font-size: 14px;
        line-height: 22px;
    }
    .chartFooter .number {
        margin-left: 8px;
        color: rgba(0,0,0,.85);
    }
</style>
