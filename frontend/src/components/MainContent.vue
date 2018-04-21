<template>
    <div class="container">
        <div class="row">
            <form class="col s12" v-on:submit.prevent>
                <div class="row">
                    <div class="input-field col s12 black-text">
                        <input placeholder="Enter Image Url" id="imageUrl" type="text" class="validate"
                               v-model="imageUrl">
                        <label for="imageUrl">Image Url</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6">
                        <input placeholder="Text Color" id="textColor" type="text" class="validate autocomplete" ref="textColor" v-model="color">
                        <label for="textColor">Text Color</label>
                    </div>
                    <div class="input-field col s6">
                        <textarea id="textarea1" class="materialize-textarea no-padding" data-length="80" v-model="textToAppend" maxlength="80"></textarea>
                        <label for="textarea1">Textarea</label>
                    </div>
                </div>
                <div class="row img-row">
                    <ImageComponent :urlChanges="urlChanges" :textToAppend="textToAppend" :color="color" ref="imageComp"></ImageComponent>
                </div>
              <div class="row">
                <div class="col s5"></div>
                <button class="btn waves-effect waves-light gamebles-background col s2" name="action" @click="clear()">Clear Form
                </button>
                <div class="col s5"></div>
              </div>
              <div class="row">
                <div class="col s5"></div>
                <button class="btn waves-effect waves-light gamebles-background col s2" name="action" @click="save()">Save Changes
                </button>
                <div class="col s5"></div>
              </div>
              <div class="row" v-show="downloadReady">
                <div class="col s5"></div>
                <a class="btn waves-effect waves-light gamebles-background col s2" :href="`data:image/jpeg;base64,${imageSrc}`" download="textedImage.jpg">Download Image
                  <i class="material-icons right">send</i>
                </a>
              </div>
            </form>
        </div>
    </div>
</template>

<script>
    import * as api from '../api';
    import { colors } from '../assets/colors';

    export default{
        async mounted () {
            $(document).ready(() => {
                Materialize.updateTextFields();

                $(this.$refs.textColor).autocomplete({
                    data: this.colors,
                    onAutocomplete: (val, item)=>{
                        this.colorToSend(val);
                    },
                    minLength: 1,
                });
            });
        },
        data() {
            return {
                imageUrl: null,
                textToAppend: null,
                colors: colors['codes'],
                color: " ",
                lastFromList: '',
                downloadReady: false,
                downloadUrl: "",
                imageSrc:null
            }
        },
        computed: {
            urlChanges() {
                return this.imageUrl
            }
        },
        watch: {
          color() {
            $(this.$refs.textColor).removeClass(this.lastFromList);
            $(this.$refs.textColor).css("background-color", this.color);
          }
        },
        methods: {
          colorToSend(val) {
            this.color = val.split(" ")[0]

          },
          clear () {
            this.textToAppend = "";
            this.color = "";
            this.imageUrl = "";
            this.downloadReady = false;
            this.imageSrc = null;
          },
          async save() {
            if(this.imageUrl == "" || this.imageUrl == null || this.color == "" || this.color == null || this.textToAppend == "" || this.textToAppend == null) {
              Materialize.toast('Please fill all the form.', 3000, 'error-occured');
              return;
            }
            let imageData = new Object();
            imageData['url'] = this.urlChanges;
            imageData['color'] = this.color;
            imageData['textToAppend'] = this.textToAppend;
            let txtCoordinates = this.$refs.imageComp.$refs.text.getBoundingClientRect();
            imageData['coordinateX'] = txtCoordinates.x
            imageData['coordinateY'] = txtCoordinates.y
            imageData['fontSize'] = this.$refs.imageComp.font;

            try {
              let newImage = (await api.post('generatePhoto', imageData)).body
              this.imageSrc = newImage
              this.downloadReady = true
              Materialize.toast('You can now enjoy your image!', 3000, 'success');

            }
            catch (e) {
              this.error = e.body || 'Unexpected Error'
              Materialize.toast(this.error || 'Error occurred, please contact administrator!', 3000, 'error-occured');
            }
          }
        }
    }

</script>

<style>
    .no-padding {
        padding: 0px 0px 0px 0px;
    }


    .img-row {
        display: flex;
        justify-content: center;
    }

</style>
