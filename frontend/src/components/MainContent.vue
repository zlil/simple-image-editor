<template>
    <div class="container">
        <div class="row">
            <form class="col s12">
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
                    <ImageComponent :urlChanges="urlChanges" :textToAppend="textToAppend" :color="color"></ImageComponent>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { colors } from '../assets/colors'
    export default{
        async mounted () {
            let self = this;
            $(document).ready(function () {
                Materialize.updateTextFields();

                $(self.$refs.textColor).autocomplete({
                    data: self.colors,
                    onAutocomplete: function(val, item) {
                        self.lastFromList = val
                        $(self.$refs.textColor).addClass(val);
                        self.colorToSend(val);
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
                lastFromList: ''
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

          }
        },
        methods: {
          colorToSend(val) {
            this.color = val.split(" ")[0]

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
