<template>
  <div id="ten-wrap">
    <div class="align-box">
      <canvas id="coordinate-system" width="400" height="400"></canvas>
    </div>
  </div>
</template>

<style lang="scss">
  #ten-wrap {
    width: 100%; height: auto; background: #fff; margin-top: 0.25rem; position: relative; margin-left: auto; margin-right: auto;

    .align-box {
      display: flex; align-items: center; justify-content: center; width: auto; height: auto;
    }
    #coordinate-system {
      /*position: absolute; left: 50%; top: 50%; margin-left: -2.5rem; margin-top: -2.5rem;*/
      margin: 0 auto;
    }
  }
</style>

<script>
  export default {
    mounted() {
      let defaultData = {
        paraX: 25,
        paraY: 75,
        gradX: 25,
        gradY: 75,
        xAxisSet: {
          start: 0,
          end: 100,
          scale: 8
        },
        yAxisSet: {
          start: 0,
          end: 100,
          scale: 8
        },
        xyCrossAt: {
          x: 50,
          y: 50
        },
        dashLineZone: {
          parallelX: [0.25, 0.75],
          parallelY: [0.25, 0.75]
        }
      };
      this.init(defaultData.paraX, defaultData.paraY,
        defaultData.gradX, defaultData.gradY,
        defaultData.xAxisSet, defaultData.yAxisSet,
        defaultData.xyCrossAt,
        defaultData.dashLineZone
      );
    },
    methods: {

      /*----------------------------------------
       * init 包含参数
       * 1、x轴起点；x轴终点；x轴刻度（单位长度） xAsisSet array
       * 2、y轴起点；y轴终点；y轴刻度（单位长度） yAsisSet array
       * 3、x轴y轴交叉点 xyCrossAt
       * 4、横穿x轴，平行于y轴的虚线（N条） dashLineZone.parallelX
       * 5、横穿y轴，平行于x轴的虚线（N条） dashLineZone.parallelY
       * 6、扫过的面积
       * ----------------------------------------*/

      init(paraX, paraY, gradX, gradY, xAxisSet, yAxisSet, xyCrossAt, dashLineZone) {
        let xyCrossAtCopy = _.clone(xyCrossAt);
        xyCrossAt.y = yAxisSet.end + yAxisSet.start - xyCrossAt.y; // canvas是左上->右下的方式铺开。坐标系的Y轴是下->上的方式展开，所以取反值
        xyCrossAt.x = xyCrossAt.x-xAxisSet.start;
        xyCrossAt.y = xyCrossAt.y-yAxisSet.start;

        // 画布区域的宽高
        let x = zzhJs.rem.convert(6);
        let y = zzhJs.rem.convert(6);
        let offset = zzhJs.rem.convert(0.06);

        // 偏移量
        // $(window).resize(resizeCanvas);
        this.resizeCanvas();
        let canvas = document.getElementById('coordinate-system');
        canvas.width = x;
        canvas.height = y;
        // 可用区域的宽高
        x = x * 0.9;
        y = y * 0.9;
        offset = offset * 0.9;
        let context = canvas.getContext('2d');
        context.lineWidth = zzhJs.rem.convert(0.02);

        let xRange = xAxisSet.end - xAxisSet.start;
        let yRange = yAxisSet.end - yAxisSet.start;
        let xRatio = x / xRange;
        let yRatio = y / yRange;

        // 生成刻度值的方法
        function createScales(array) {
          let realRange = array.end - array.start;// 总长
          let stepLength = realRange / array.scale;// 步长
          let collection = [];
          collection[0] = array.start; // 起始值
          for (let i = 1; i <= array.scale; i++) {
            collection.push(stepLength * i + array.start);
          }
          for (let j = 0; j < collection.length; j++) {
            collection[j] = collection[j].toFixed(0)
          }
          return collection;
        }

        /*-----------------------横坐标计算法---------------------------------
         * moveTo起始坐标（x，y），x = 0 、y = （交叉点 / y轴总长 * 画布高度）
         * lineTo终点坐标（x，y），x = 比例 * x轴总长、 y = 如上
         * 偏移量为4倍offset值（可以更改
         * -----------------------------------------------------------------*/
        function xAxisMaker(){
          // 横坐标轴
          context.strokeStyle = '#009ea1';
          context.moveTo(0 + offset * 4, xyCrossAt.y / yRange * y + offset * 4);
          context.lineTo(xRange * xRatio + offset * 4, xyCrossAt.y / yRange * y + offset * 4);
          // 横坐标-正方向标识
          // 延长线
          context.moveTo(xRange * xRatio + offset * 4, xyCrossAt.y / yRange * y + offset * 4);
          context.lineTo(xRange * xRatio + offset * 10, xyCrossAt.y / yRange * y + offset * 4);
          // 指向箭头
          context.moveTo(xRange * xRatio + offset * 10, xyCrossAt.y / yRange * y + offset * 4);
          context.lineTo(xRange * xRatio + offset * 8, xyCrossAt.y / yRange * y - offset * 2 + offset * 4);
          context.moveTo(xRange * xRatio + offset * 10, xyCrossAt.y / yRange * y + offset * 4);
          context.lineTo(xRange * xRatio + offset * 8, xyCrossAt.y / yRange * y + offset * 2 + offset * 4);
          context.font = '20px Arial';
          context.fillStyle = '#009ea1';
          context.fillText('行为表达', xRange * xRatio - offset * 8, xyCrossAt.y / yRange * y - offset * 2);
          // 向坐标轴添加数字刻度
          let xScaleGroup = createScales(xAxisSet);
          // 横坐标刻度
          context.fillStyle = '#009ea1';
          for (let i = 0; i < xScaleGroup.length; i++) {
            if(xScaleGroup[i]==xyCrossAt.x){
              context.fillText(xScaleGroup[i], x * (i / xAxisSet.scale) + offset * 4, xyCrossAt.y / yRange * y + offset*4 + offset * 4);
              continue;
            }
            // 刻度值
            context.fillText(xScaleGroup[i], x * (i / xAxisSet.scale) + offset, xyCrossAt.y / yRange * y + offset*4 + offset * 4);
            // 刻度痕
            context.moveTo(x * (i / xAxisSet.scale) + offset * 4, xyCrossAt.y / yRange * y + offset * 4);
            context.lineTo(x * (i / xAxisSet.scale) + offset * 4, xyCrossAt.y / yRange * y - zzhJs.rem.convert(0.02) * offset + offset * 4);
            context.stroke();
          }
        }
        xAxisMaker();

        /*-----------------------纵坐标计算法---------------------------------
         *
         *
         * -----------------------------------------------------------------*/
        function yAxisMaker() {
          // 纵坐标轴
          context.moveTo(xyCrossAt.x / xRange * x + offset * 4, yRange * yRatio + offset * 4);
          context.lineTo(xyCrossAt.x / xRange * x + offset * 4, 0 + offset * 4);
          // 纵坐标-正方向标识
          // 延长线
          context.moveTo(xyCrossAt.x / xRange * x + offset * 4, 0 + offset * 4);
          context.lineTo(xyCrossAt.x / xRange * x + offset * 4, 0 + offset * 4 - offset*4);
          // 指向箭头
          context.moveTo(xyCrossAt.x / xRange * x + offset * 4, 0 + offset * 4 - offset*4);
          context.lineTo(xyCrossAt.x / xRange * x + offset * 4 - offset*2, 0 + offset * 4 - offset*4 + offset*2);
          context.moveTo(xyCrossAt.x / xRange * x + offset * 4, 0 + offset * 4 - offset*4);
          context.lineTo(xyCrossAt.x / xRange * x + offset * 4 + offset*2, 0 + offset * 4 - offset*4 + offset*2);
          context.font = '20px Arial';
          context.fillStyle = '#009ea1';
          context.fillText('情感表达', xyCrossAt.x / xRange * x - offset*20 + offset * 4 , 0 + offset*2 + offset * 4);
          // 向纵坐标添加数字刻度
          let yScaleGroup = createScales(yAxisSet);
          context.fillstyle = '#009ea1';
          for (let i = 0; i < yScaleGroup.length; i++) {
            // 去掉xy轴交点坐标的重复
            if (yScaleGroup[i] == xyCrossAt.y && xyCrossAt.x == xyCrossAt.y) {
              continue;
            }
            // 刻度值
            context.fillText(yScaleGroup[yScaleGroup.length - 1 - i], xyCrossAt.x / xRange * x + offset + offset * 4, y * (i / yAxisSet.scale) + offset + offset * 4);
            // 刻度痕
            context.moveTo(xyCrossAt.x / xRange * x + offset * 4, y * (i / yAxisSet.scale) + offset * 4);
            context.lineTo(xyCrossAt.x / xRange * x - offset * 2 + offset * 4, y * (i / yAxisSet.scale) + offset * 4);
            context.stroke();
          }
        }
        yAxisMaker();

        /*--------------------------虚线区域---------------------------------
        * 参数：dashLineZone数组，包含一些小于1的数，表示所占比例
        * -----------------------------------------------------------------*/
        function dashLineZoneMaker(){
          // 安全范围
          context.lineWidth = zzhJs.rem.convert(0.01);
          context.strokeStyle = '#009ea1';
          context.setLineDash([zzhJs.rem.convert(0.1), zzhJs.rem.convert(0.1), zzhJs.rem.convert(0.1)]);
          // 画横轴的虚线集合->平行于X轴，与Y轴交叉
          for(let i=0;i<dashLineZone.parallelX.length;i++){
            // 确定虚线的横坐标(0 和 x轴宽度）
            // 确定虚线的纵坐标(dashLineZone.parallelX[i]*y轴高度《-需要取反数)
            context.moveTo(0 + offset * 4, (1-dashLineZone.parallelX[i]) * y + offset * 4);
            context.lineTo(xRange * xRatio + offset * 4, (1-dashLineZone.parallelX[i]) * y + offset * 4);
            // 画线
            context.stroke();
          }
          for(let i=0;i<dashLineZone.parallelY.length;i++){
            // 确定虚线的横坐标(dashLineZone.parallelY[i]*x轴宽度）
            // 确定虚线的纵坐标(0,y轴高度)
            context.moveTo(dashLineZone.parallelY[i] * x + offset * 4, yRange * yRatio + offset * 4);
            context.lineTo(dashLineZone.parallelY[i] * x + offset * 4, 0 + offset * 4);
            // 画线
            context.stroke();
          }
          context.setLineDash([0, 0]);
        }
        dashLineZoneMaker();

        // x轴扫过面积坐标所占的x轴整体的比例;Y轴同理
        let ratioX = x/(xAxisSet.end - xAxisSet.start),ratioY=y/(yAxisSet.end - yAxisSet.start);

        /*--------------------------扫过的面积-------------------------------
         * 扫过的面积
         * -----------------------------------------------------------------*/
        function userOccupiedArea() {
          // 用户的结果
          let userX = paraX,userY =paraY;
          userX = userX - xyCrossAtCopy.x;
          userY = xyCrossAtCopy.y - userY;
          context.strokeStyle = 'RGBA(0,158,161,0.5)';
          context.fillStyle = 'RGBA(0,158,161,0.3)';

          let startX = xyCrossAt.x / xRange * x + offset * 4;
          let endX = ratioX * userX;

          let startY = xyCrossAt.y / yRange * y + offset * 4;
          let endY = ratioY * userY;

          context.strokeRect(startX,startY, endX , endY );
          context.fillRect(startX,startY, endX , endY );
        }
        userOccupiedArea();

        /*--------------------------用户定位点区域-------------------------------
         * 用户定位点
         * -----------------------------------------------------------------*/
        function userPointAtArea(){
          // 小圆点x
          let arcX = paraX * ratioX + offset * 4;
          let arcY = (yAxisSet.end - yAxisSet.start - paraY) * ratioY + offset * 4;
          context.beginPath();
          context.fillStyle = '#009ea1';
          context.arc(arcX,arcY, 3, 0, Math.PI * 2, false);
          context.fill();
          context.fillStyle = 'rgba(0,158,161,0.5)';
          context.arc(arcX,arcY, 6, 0, Math.PI * 2, false);
          context.stroke();

          // 小圆点-具体
          context.font = zzhJs.rem.convert(0.48) + ' Arial';
          context.fillStyle = '#009ea1';
          context.fillText('行为：' + gradX, arcX - zzhJs.rem.convert(0.1), arcY - offset*2);
          context.fillText('情感：' + gradY, arcX - zzhJs.rem.convert(0.1), arcY - offset*7);
        }
        userPointAtArea();









      },
      resizeCanvas() {
        let deviceWidth = $(window).get(0).innerWidth;
        let deviceHeight = $(window).get(0).innerHeight;
        let ratio = zzhJs.rem.convert(7.5) / zzhJs.rem.convert(6.9);
        $('#coordinate-system').attr("width", deviceWidth / ratio);
        $('#coordinate-system').attr("height", deviceWidth / ratio);
        let x = deviceWidth / ratio;
        let y = deviceWidth / ratio;
      }
    }
  }
</script>
