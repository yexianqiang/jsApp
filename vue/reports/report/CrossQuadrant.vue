<template>
  <div id="ten-wrap">
    <canvas id="coordinate-system" width="400" height="400"></canvas>
  </div>
</template>

<style lang="scss">
  #ten-wrap {
    width: 100%; height: 6rem; background: #fff; margin-top: 0.25rem; position: relative;

    #coordinate-system {
      position: absolute; left: 50%; top: 50%; margin-left: -2.5rem; margin-top: -2.5rem;
    }
  }
</style>

<script>

  export default {
    mounted() {
      this.init(zzhJs.rem.convert(0.1), zzhJs.rem.convert(0.86), 10, 86);
    },
    methods: {
      init(paraX, paraY, gradX, gradY) {
        var x = zzhJs.rem.convert(5);
        var y = zzhJs.rem.convert(5);
        var offset = zzhJs.rem.convert(0.05);

        // 偏移量
        // $(window).resize(resizeCanvas);
        this.resizeCanvas();
        let canvas = document.getElementById('coordinate-system');
        canvas.width = x;
        canvas.height = y;
        var context = canvas.getContext('2d');
        context.lineWidth = zzhJs.rem.convert(0.02);

        // 横坐标
        context.strokeStyle = "#009ea1";
        context.moveTo(0, y / 2);
        context.lineTo(x, y / 2);

        // 横坐标-正方向标识
        context.lineTo(x - zzhJs.rem.convert(0.05), y / 2 - zzhJs.rem.convert(0.05));
        context.font =  '20px Arial';
        context.fillStyle='#009ea1';
        context.fillText('行为表达',x - zzhJs.rem.convert(0.85),y / 2 - zzhJs.rem.convert(0.1) + offset);

        // 纵坐标
        context.moveTo(x / 2, y);
        context.lineTo(x / 2, 0);

        // 纵坐标-正方向标识
        context.lineTo(x / 2 - zzhJs.rem.convert(0.05), zzhJs.rem.convert(0.05));
        context.fillStyle='#009ea1';
        context.fillText('情感表达',x / 2 - zzhJs.rem.convert(0.85),zzhJs.rem.convert(0.2));
        context.stroke();

        // 横坐标刻度
        context.fillStyle = '#009ea1';
        context.fillText('0', x * (0 / zzhJs.rem.convert(0.04)), y / 2 + zzhJs.rem.convert(0.15) + zzhJs.rem.convert(0.02) * offset);
        context.fillText('37', x * (1 / 4), y / 2 + zzhJs.rem.convert(0.15) + zzhJs.rem.convert(0.02) * offset);
        context.fillText('75', x * (2 / 4) + zzhJs.rem.convert(0.05), y / 2 + zzhJs.rem.convert(0.15) + zzhJs.rem.convert(0.02) * offset);
        context.fillText('113', x * (3 / 4), y / 2 + zzhJs.rem.convert(0.15) + zzhJs.rem.convert(0.02) * offset);
        context.fillText('150', x * (4 / 4) - zzhJs.rem.convert(0.35), y / 2 + zzhJs.rem.convert(0.15) + zzhJs.rem.convert(0.02) * offset);

        // 纵坐标刻度
        context.fillstyle = '#009ea1';
        context.fillText('0', x / 2 + zzhJs.rem.convert(0.05), y * (4 / 4) - zzhJs.rem.convert(0.05));
        context.fillText('37', x / 2 + zzhJs.rem.convert(0.05), y * (3 / 4) - zzhJs.rem.convert(0.05));
        // context.fillText('37',x/2+5,y*(2/4)-5);
        context.fillText('113', x / 2 + zzhJs.rem.convert(0.05), y * (1 / 4) - zzhJs.rem.convert(0.05));
        context.fillText('150', x / 2 + zzhJs.rem.convert(0.05), y * (0 / 4) + zzhJs.rem.convert(0.2));

        // 安全范围
        context.lineWidth = zzhJs.rem.convert(0.01);
        context.strokeStyle = '#009ea1';
        context.beginPath();
        context.setLineDash([zzhJs.rem.convert(0.04), zzhJs.rem.convert(0.05)]);
        context.moveTo(x * (1 / 4), y * (1 / 4));
        context.lineTo(x * (3 / 4), y * (1 / 4));
        context.lineTo(x * (3 / 4), y * (3 / 4));
        context.lineTo(x * (1 / 4), y * (3 / 4));
        context.lineTo(x * (1 / 4), y * (1 / 4));
        context.stroke();
        context.setLineDash([0, 0]);

        // 用户xy扫过的面积
        var userX = paraX, userY = paraY;
        userX = userX - zzhJs.rem.convert(0.75);
        userY = zzhJs.rem.convert(0.75) - userY;
        var ratio = x / zzhJs.rem.convert(1.5),ratioY = y / zzhJs.rem.convert(1.5);
        context.strokeStyle = 'RGBA(0,158,161,0.5)';
        context.strokeRect(x / 2, y / 2 , ratio * userX, ratioY * userY);
        context.fillStyle = 'RGBA(0,158,161,0.3)';
        context.fillRect(x / 2, y / 2 , ratio * userX, ratioY * userY);

        // 小圆点x
        var userX = paraX, userY = paraY;
        var arcX = userX * ratio, arcY = (zzhJs.rem.convert(1.5) - userY) * ratioY;

        context.beginPath();
        context.fillStyle = '#009ea1';
        context.arc(arcX, arcY+offset, zzhJs.rem.convert(0.03), 0, Math.PI * 2, false);
        context.fill();
        context.fillStyle = 'rgba(0,158,161,0.5)';
        context.arc(arcX, arcY+offset, zzhJs.rem.convert(0.06), 0, Math.PI * 2, false);
        context.stroke();

        // 小圆点-具体
        context.font= zzhJs.rem.convert(0.48) + ' Arial';
        context.fillStyle='#009ea1';
        context.fillText('行为：'+gradX,arcX - zzhJs.rem.convert(0.1),arcY - zzhJs.rem.convert(0.005) * offset);
        context.fillText('情感：'+gradY,arcX - zzhJs.rem.convert(0.1),arcY - zzhJs.rem.convert(0.045) * offset);
      },
      resizeCanvas() {
        var diviceWidth=$(window).get(0).innerWidth;
        var diviceHeight=$(window).get(0).innerHeight;
        var ratio=zzhJs.rem.convert(7.5)/zzhJs.rem.convert(6.9);
        $('#coordinate-system').attr("width", diviceWidth/ratio);
        $('#coordinate-system').attr("height", diviceWidth/ratio);
        var x = diviceWidth/ratio;
        var y = diviceWidth/ratio;
      }
    }
  }
</script>
