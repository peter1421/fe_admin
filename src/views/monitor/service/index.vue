<template>
  <div class="app-container">
    <el-row>
      <el-col>
        <el-card class="box-card">
          <svg-icon icon-class="system" style="margin-right: 5px" />
          <span>
            系統：{{ service.platform }}
          </span>
          <span>
            IP：{{ service.ip }}
          </span>
          <span v-if="service_data.time.date">
            系統時間: {{ service_data.time.date }} {{ service_data.time.time }}
          </span>
          <span>
            項目已不間斷運行：{{ service_data.sys.run_time }}
          </span>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-weight: bold;color: #666;font-size: 18px">狀態</span>
        </div>
        <el-col :span="8">
          <div class="title">CPU使用率</div>
          <div class="title">
            <el-progress type="circle" :percentage="service_data.cpu.percent" />
          </div>
          <div class="title">{{ service_data.cpu.count }}</div>
        </el-col>
        <el-col :span="8">
          <div class="title">內存使用率</div>
          <div class="title">
            <el-progress type="circle" :percentage="service_data.mem.percent" />
          </div>
          <div v-if="service_data.mem.used" class="title">{{ service_data.mem.used }} / {{ service_data.mem.total }}</div>
        </el-col>
        <el-col :span="8">
          <div class="title">磁盤使用率</div>
          <div class="title">
            <el-progress type="circle" :percentage="service_data.disk.percent" />
          </div>
          <div v-if="service_data.disk.used" class="title">{{ service_data.disk.used }} / {{ service_data.disk.total }}</div>
        </el-col>
      </el-card>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-weight: bold;color: #666;font-size: 18px">CPU使用率監控</span>
          </div>
          <v-chart ref="cpuLine" :options="cpuInfo" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-weight: bold;color: #666;font-size: 18px">內存使用率監控</span>
          </div>
          <div style="width: 100%">
            <v-chart ref="memLine" :options="memInfo" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ECharts from 'vue-echarts'
import 'echarts-gl'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import { getToken } from '@/utils/auth'
import { getService } from '@/api/monitor/service'
export default {
  name: 'Service',
  components: { 'v-chart': ECharts },
  data() {
    return {
      websock: null,
      monitor: null, // 監控定時器
      service: {
        'platform': '',
        'ip': ''
      },
      service_data: {
        'cpu': {
          'percent': 0,
          'count': ''
        },
        'mem': {
          'percent': 0,
          'total': '',
          'free': '',
          'used': ''
        },
        'disk': {
          'percent': 0,
          'total': '',
          'free': '',
          'used': ''
        },
        'sys': {
          'run_time': ''
        },
        'time': {
          'date': '',
          'time': ''
        }
      },
      cpuInfo: {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 100,
          interval: 20
        },
        series: [{
          data: [],
          type: 'line',
          areaStyle: {
            normal: {
              color: 'rgb(32, 160, 255)' // 改變區域顏色
            }
          },
          itemStyle: {
            normal: {
              color: '#6fbae1',
              lineStyle: {
                color: '#6fbae1' // 改變折線顏色
              }
            }
          }
        }]
      },
      memInfo: {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 100,
          interval: 20
        },
        series: [{
          data: [],
          type: 'line',
          areaStyle: {
            normal: {
              color: 'rgb(32, 160, 255)' // 改變區域顏色
            }
          },
          itemStyle: {
            normal: {
              color: '#6fbae1',
              lineStyle: {
                color: '#6fbae1' // 改變折線顏色
              }
            }
          }
        }]
      }
    }
  },
  created() {
    this.initWebSocket()
    this.getService()
  },
  mounted() {
    const cpuLine = this.$refs.cpuLine
    const memLine = this.$refs.memLine
    window.addEventListener('resize', () => {
      cpuLine.resize()
      memLine.resize()
    })
  },
  destroyed() {
    // 清除定時器
    if (this.monitor) {
      clearInterval(this.monitor)
    }
    // 關閉socket
    if (this.websock) {
      this.websock.close()
    }
  },
  methods: {
    getService() {
      getService().then(res => {
        this.service = res.data
      })
    },
    initWebSocket() { // 初始化weosocket
      const wsuri = process.env.VUE_APP_WS_API + '/monitor/service?token=' + getToken()
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen() { // 連接建立之後執行send方法發送數據
      const data = { 'tonken': getToken() }
      this.monitor = setInterval(this.websocketsend, 2000, JSON.stringify(data))
    },
    websocketonerror() { // 連接建立失敗重連
      this.initWebSocket()
    },
    websocketonmessage(e) { // 數據接收
      const data = JSON.parse(e.data)
      this.service_data = data
      // 添加echarts數據,且最多8個
      if (this.cpuInfo.xAxis.data.length >= 8) {
        this.cpuInfo.xAxis.data.shift()
        this.memInfo.xAxis.data.shift()
        this.cpuInfo.series[0].data.shift()
        this.memInfo.series[0].data.shift()
      }
      this.cpuInfo.xAxis.data.push(data.time.time)
      this.memInfo.xAxis.data.push(data.time.time)
      this.cpuInfo.series[0].data.push(parseFloat(data.cpu.percent))
      this.memInfo.series[0].data.push(parseFloat(data.mem.percent))
    },
    websocketsend(Data) { // 數據發送
      this.websock.send(Data)
    },
    websocketclose(e) { // 關閉
      console.log('斷開連接', e)
    }
  }
}
</script>
<style lang="scss" scoped>
 ::v-deep .box-card {
    margin-bottom: 5px;
    span {
      margin-right: 40px;
    }
  }
.title {
    text-align: center;
    margin: 10px 0
  }
.echarts{
    width: 100%;
    min-width: 400px;
}
</style>
