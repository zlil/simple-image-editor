<template>
  <div class="img-container1 img-container   z-depth-4" id="img-container1">
    <!--<img class="img-to-edit" :src="this.urlChanges">-->
    <!--<div class="image-label">-->
    <!--<textarea class="text-append">{{textToAppend}}</textarea>-->
    <!--</div>-->
    <div class="transbox">

      <textarea style="color: black" row="1" class="materialize-textarea">{{textToAppend}}</textarea>
    </div>
  </div>
</template>

<script>
  //todo check: https://tomelliott.com/html-css/css-position-child-div-parent
  //todo check: https://jsfiddle.net/736mh8so/21/
  //todo check: https://www.w3schools.com/howto/howto_css_image_text.asp
  //todo check: https://stackoverflow.com/questions/18229230/dynamically-changing-the-size-of-font-size-based-on-text-length-using-css-and-ht
  //https://stackoverflow.com/questions/14142378/how-can-i-fill-a-div-with-an-image-while-keeping-it-proportional

  export default {
    props: ['urlChanges', 'textToAppend'],
    methods: {
      resize_to_fit() {
        let fontsize = $('div#outer div').css('font-size');
        $('div#outer div').css('fontSize', parseFloat(fontsize) - 1);

        if ($('div#outer div').height() >= $('div#outer').height()) {
          resize_to_fit();
        }
      },
      ChangeBackgroungImageOfTab(imagePrefix) {
        let urlString = 'url(' + imagePrefix + ')';
        document.getElementById('img-container1').style.backgroundImage = urlString;
      }

    },
    watch: {
      urlChanges(){

        this.ChangeBackgroungImageOfTab(this.urlChanges)

      },
      textToAppend(){
        $('.materialize-textarea').trigger('autoresize');
        Materialize.updateTextFields();
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
    /*color: white;*/
    background-repeat: no-repeat;
    background-size: 100% 100%;

  }

  .img-to-edit {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
    flex-shrink: 0;
    min-width: 100%;
    min-height: 100%;
  }

  /*.text-append{*/
  /*position: absolute;*/
  /*top: 80%;*/
  /*left: 50%;*/
  /*transform: translate(-50%, -50%);*/
  /*}*/

  /*.textpanel textarea {*/
  /*position: absolute;*/
  /*top: 50px;*/
  /*left: 50px;*/
  /*height: 200px;*/
  /*width: 200px;*/
  /*background-color: rgba(255, 255, 255, 0.5);*/
  /**/
  /*}*/



</style>
