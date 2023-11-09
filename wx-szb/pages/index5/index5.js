import * as echarts from "../../ec-canvas/echarts";
const app = getApp()
function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  wx.request({
    url:  'http://127.0.0.1:5500/server/db.json',
    method:'GET',
    header:{
      'content-type':'application/json'
    },
    success:(res)=>{
      console.log(res)
        this.wu=res.data.wu
      var option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          left: 'center',
          top: 'bottom',
          itemHeight: 5,
          itemWidth: 5,
          textStyle: {
            color: "rgba(255,255,255,0.)"
          }
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '60%',
            center:[180,60],
            data:this.wu,
            label: {
              show: false
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
            }
          }
        ]
      };
      chart.setOption(option);
      return chart;
    }
  })
}
function initChart1(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  var option = {
    xAxis: {
      type: 'category',
      axisLabel: {
        color: "#66ccff",
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255,255,255,.1)"
        },
      },
      data: this.tu
      
    },
    yAxis: {
      type: 'value',
      show:false
    },
    series: [
      {
        data: this.tu1,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };
  chart.setOption(option);
  return chart;
}
Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    },
    ec1: {
      onInit: initChart1
    },
    baseUrl:'',
  },
  onLoad() {
    var _this=this;
    var baseUrl = app.globalData.baseUrl;
    // 获取baseUrl,赋值给当前页面的baseUrl变量
    this.setData({
      baseUrl:baseUrl   
    })
    wx.request({
      url: baseUrl+"card",
      method:'GET',
      header:{
        'content-type':'application/json'
      },
      success:(res)=>{
        _this.setData({
          card:res.data
        })
      }
    })
    wx.request({
      url: baseUrl+"head",
      method:'GET',
      header:{
        'content-type':'application/json'
      },
      success:(res)=>{
        _this.setData({
          head:res.data
        })
      }
    })
    wx.request({
      url:  baseUrl+"tu",
      method:'GET',
      success:(res)=>{
        _this.setData({
          tu:res.data
        })
      }
    })
    wx.request({
      url:  baseUrl+"tu1",
      method:'GET',
      header:{
        'content-type':'application/json'
      },
      success:(res)=>{
        _this.setData({
          tu1:res.data
        })
      }
    })
  },
  
  onReady() {
  }
});

