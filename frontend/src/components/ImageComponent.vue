<template>
  <div class="img-container z-depth-4">
    <img class="img-to-edit" :src="this.urlChanges">
    <div class="image-label">
    <div class="text-append" style="white-space: pre-line;" ref="text"><pre>{{this.myText(this.flagBreak)}}</pre></div>
    </div>
  </div>
</template>

<script>

  export default {
    props: ['urlChanges', 'textToAppend', 'color'],
    data() {
      return {
        offset: 5,
        limit: 25,
        font: 50,
        breaks: 4,
        flagBreak: false
      }
    },
    methods: {
      myText(br) {
        if (br) {
          let len = Math.floor(this.textToAppend.length / 2);

          let text = [this.textToAppend.slice(0, len), `<br>`, this.textToAppend.slice(len)].join('');
          $('.text-append').innerHTML = text;

        } else {
          return this.textToAppend ? this.textToAppend : ''
        }
      }

    },
    mounted() {
      let self = this
      $(document).ready(function () {
        $('#textarea1').on('keypress', function (e) {
          let that = $(this);
          let textLength = that.val().length;
          if (textLength + self.offset > self.limit) {
            $('.text-append').css('font-size', self.font + 'px');
            if (self.font > 15) {
              self.font -= 5;
            }
            self.offset -= 5;
            self.breaks--;
            if (!self.breaks) {
              this.flagBreak = true;
              self.myText(true);
              $('.text-append').css('top', '90%');
            }
          }
        });
      });
    },
    watch: {
      color(val) {
        $('.text-append').css('color', val);
      }
    }

  }
</script>

<style scoped>
  .img-container {
    width: 800px;
    height: 430px;
    overflow: hidden;
    background: #ccc;
    margin: 10px;
    line-height: 150px;
    position: relative;
    text-align: center;
    color: blue;
  }

  .img-to-edit {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
    flex-shrink: 0;
    min-width: 100%;
    min-height: 100%;
  }

  .text-append {
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 50px;
  }
</style>
