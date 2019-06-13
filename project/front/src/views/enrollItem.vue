<template>
<div id="app">
  <v-parallax
    dark
    src="http://swagwp1.beantownthemes.com/wp-content/uploads/run11.jpg"
  >
    <v-layout
      align-center
      column
      justify-center
    >
      <h1 class="display-2 font-weight-thin mb-3">{{ $t("message.enrollitem") }}</h1>
    </v-layout>
  </v-parallax>
    <v-container grid-list-xs text-xs-center>
    <v-alert
    class="mb-3"
    :value="isSubmitError"
    type="error"
    >
    {{ $t("message.error") }}
    </v-alert>
    <form>
      <v-text-field
        v-model="item_name"
        :error-messagesd="item_nameErrors"
        v-bind:label="$t('message.itemname')"
        required
        @input="$v.item_name.$touch()"
        @blur="$v.item_name.$touch()"
      ></v-text-field>
      <v-autocomplete
      v-model="brand"
      :items="brand_list"
      attach
      v-bind:label="$t('message.brand')"
      required
      :error-messages="brandErrors"
      @input="$v.brand.$touch()"
      @blur="$v.brand.$touch()"
      ></v-autocomplete>
      <v-autocomplete
      v-model="color"
      :items="color_list"
      attach
      v-bind:label="$t('message.color')"
      :error-messages="colorErrors"
      @input="$v.color.$touch()"
      @blur="$v.color.$touch()"
      ></v-autocomplete>
      <v-textarea
        v-model="detail"
        :error-messages="detailErrors"
        v-bind:label="$t('message.detail')"
        required
        @input="$v.detail.$touch()"
        @blur="$v.detail.$touch()"
      ></v-textarea>
      <v-text-field
        v-model="rental"
        :error-messages="rentalErrors"
        v-bind:label="$t('message.rentalfee')"
        required
        @input="$v.rental.$touch()"
        @blur="$v.rental.$touch()"
        type="number"
      ></v-text-field>
      <v-text-field
        v-model="price"
        :error-messages="priceErrors"
        v-bind:label="$t('message.sellingfee')"
        required
        @input="$v.price.$touch()"
        @blur="$v.price.$touch()"
        type="number"
      ></v-text-field>
      <v-text-field
        v-model="material"
        :error-messages="materialErrors"
        v-bind:label="$t('message.material')"
        required
        @input="$v.material.$touch()"
        @blur="$v.material.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="selected_size"
        :error-messages="sizeErrors"
        v-bind:label="$t('message.size')"
        required
        @input="$v.selected_size.$touch()"
        @blur="$v.selected_size.$touch()"
      ></v-text-field>
    <v-flex xs12 sm6>
        <v-select
        v-model="state"
        :items="state_list"
        attach
        v-bind:label="$t('message.state')"
        :error-messages="stateErrors"
        @input="$v.state.$touch()"
        @blur="$v.state.$touch()"
        ></v-select>
    </v-flex>
    <v-flex xs12 sm6>
        <v-autocomplete
        v-model="selected_category"
        :items="category"
        attach
        v-bind:label="$t('message.category')"
        :error-messages="categoryErrors"
        @input="$v.selected_category.$touch()"
        @blur="$v.selected_category.$touch()"
        ></v-autocomplete>
    </v-flex>
    <v-flex xs12 sm6>
        <v-select
        v-model="selected_tag"
        :items="tag"
        attach
        v-bind:label="$t('message.tag')"
        chips
        multiple
        :error-messages="tagErrors"
        @input="$v.selected_tag.$touch()"
        @blur="$v.selected_tag.$touch()"
        ></v-select>
    </v-flex>
    <!-- <v-flex xs12 sm6>
        <v-select
        v-model="selected_size"
        :items="size"
        attach
        label="Size"
        :error-messages="sizeErrors"
        @input="$v.selected_size.$touch()"
        @blur="$v.selected_size.$touch()"
        ></v-select>
    </v-flex> -->
    <v-text-field
    readonly
    v-bind:label="$t('message.selectitemimages')"
    v-model="imageName"
    prepend-icon='attach_file'
    required
    @click='pickFile'
    @input="$v.imageName.$touch()"
    @blur="$v.imageName.$touch()"
    :error-messages="ImageErrors"
    ></v-text-field>
    <input
        multiple
        type="file"
        style="display: none"
        ref="image"
        @change="onFilePicked"
        accept="image/*"
    >

    <v-text-field
    readonly
    v-bind:label="$t('message.selectgurantee')"
    v-model="certificateName"
    prepend-icon='attach_file'
    required
    @click='pickCertificateFile'
    @input="$v.certificateName.$touch()"
    @blur="$v.certificateName.$touch()"
    :error-messages="CertificateErrors"
    ></v-text-field>
    <input
        type="file"
        style="display: none"
        ref="certificate"
        @change="onCertificatePicked"
        accept="certificate/*"
    >
      <v-checkbox
        v-model="checkbox"
        :error-messages="checkboxErrors"
        v-bind:label="$t('message.agree')"
        required
        @change="$v.checkbox.$touch()"
        @blur="$v.checkbox.$touch()"
      ></v-checkbox>

      <v-btn @click="submit">{{ $t('message.submit') }}</v-btn>
      <v-btn @click="clear">{{ $t('message.clear') }}</v-btn>
    </form>
  </v-container>
</div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import Vue from "vue";
import { mapState, mapActions, mapMutations } from 'vuex' 
import attribute from "./../attribute";
const axios = require("axios");
import store from './../store'

export default {
  mixins: [validationMixin],

  validations: {
    item_name: { required },
    brand: { required },
    color: { required },
    detail: { required },
    state: { required },
    material: { required },
    rental: {required},
    price: { required },
    selected_category: { required },
    selected_size: { required },
    selected_tag: { required },
    imageName: { required },
    certificateName: { required },
    checkbox: {
      checked(val) {
        return val;
      }
    }
  },

  data: () => ({
    item_name: "",
    brand_list: attribute.brand,
    brand: "",
    color_list: attribute.color,
    color: "",
    detail: "",
    state: "",
    state_list: attribute.state,
    material: "",
    rental: "",
    price: "",
    selected_size: "",
    category: attribute.category,
    selected_category: "",
    imageName: [],
    imageUrl: [],
    imageFile: [],
    certificateName: '',
    certificateUrl: '',
    certificateFile: null,
    imageNum: 0,
    tag: attribute.tag,
    selected_tag: [],
    checkbox: false,
  }),

  computed: {
    ...mapState(["isSubmitError"]),
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
    item_nameErrors() {
      const errors = [];
      if (!this.$v.item_name.$dirty) return errors;
      !this.$v.item_name.required && errors.push("Item name is required.");
      return errors;
    },
    brandErrors() {
      const errors = [];
      if (!this.$v.brand.$dirty) return errors;
      !this.$v.brand.required && errors.push("Brand is required");
      return errors;
    },
    colorErrors() {
      const errors = [];
      if (!this.$v.color.$dirty) return errors;
      !this.$v.color.required && errors.push("Color is required");
      return errors;
    },
    detailErrors() {
      const errors = [];
      if (!this.$v.detail.$dirty) return errors;
      !this.$v.detail.required && errors.push("Detail is required");
      return errors;
    },
    stateErrors() {
      const errors = [];
      if (!this.$v.state.$dirty) return errors;
      !this.$v.state.required && errors.push("State is required");
      return errors;
    },
    materialErrors() {
      const errors = [];
      if (!this.$v.material.$dirty) return errors;
      !this.$v.material.required && errors.push("Material is required");
      return errors;
    },
    rentalErrors() {
      const errors = [];
      if (!this.$v.rental.$dirty) return errors;
      !this.$v.rental.required && errors.push("Rental Fee is required");
      return errors;
    },
    priceErrors() {
      const errors = [];
      if (!this.$v.price.$dirty) return errors;
      !this.$v.price.required && errors.push("Selling Price is required");
      return errors;
    },
    categoryErrors() {
      const errors = [];
      if (!this.$v.selected_category.$dirty) return errors;
      !this.$v.selected_category.required && errors.push("Category is required");
      return errors;
    },
    sizeErrors() {
      const errors = [];
      if (!this.$v.selected_size.$dirty) return errors;
      !this.$v.selected_size.required && errors.push("Size is required");
      return errors;
    },
    ImageErrors () {
    const errors = []
    if (!this.$v.imageName.$dirty) return errors
    !this.$v.imageName.required && errors.push('Item Image is required')
    return errors
    },
    CertificateErrors () {
    const errors = []
    if (!this.$v.certificateName.$dirty) return errors
    !this.$v.certificateName.required && errors.push('Guarantee Image is required')
    return errors
    },
    tagErrors() {
      const errors = [];
      if (!this.$v.selected_tag.$dirty) return errors;
      !this.$v.selected_tag.required && errors.push("Tag is required");
      return errors;
    }
  },

  methods: {
    ...mapActions(['enrollItem']),
    submit ()
    {
      this.$v.$touch()
      if(this.formBlankTest())
      {
          if (!this.checkbox) {
          alert(this.$t('message.pleaseagree'));
          return;
          }
              const formData = new FormData();
              formData.append('shop_id', store.state.id);
              formData.append('item_name', this.item_name);
              formData.append('brand', this.brand);
              formData.append('color', this.color);
              formData.append('detail', this.detail);
              formData.append('state', this.state);
              formData.append('material',this.material);
              formData.append('rental',this.rental);
              formData.append('price', this.price);
              formData.append('category', this.selected_category);
              formData.append('size', this.selected_size);
              for (var j = 0; j < this.selected_tag.length; j++)
              {
                  formData.append('tag', this.selected_tag[j]);
              }
              formData.append('imageNum',this.imageNum + 1);
              for (var i = 0; i < this.imageNum; i++)
              {
                  formData.append('img', this.imageFile[i]);
                  formData.append('imageUrl', this.imageName[i]);
              }
              formData.append('img',this.certificateFile);
              formData.append('certificateUrl',this.certificateUrl);
              formData.append('certificateName',this.certificateName);
              this.enrollItem(formData);
      }
    },
    pickFile ()
    {
      this.$refs.image.click();
    },
    pickCertificateFile ()
    {
      this.$refs.certificate.click();
    },
    onFilePicked (e)
    {
      const files = e.target.files
      this.imageNum = files.length
      for(var i = 0; i < this.imageNum; i++)
      {
          const fileElement = files[i];
          if(fileElement !== undefined) {
              this.imageName.push(fileElement.name)
              if(this.imageName[i].lastIndexOf('.') <= 0) {
                  return
              }
              const fr = new FileReader ()
              fr.readAsDataURL(fileElement)
              fr.addEventListener('load', () => {
                  this.imageUrl.push(fr.result)
                  this.imageFile.push(fileElement) // this is an image file that can be sent to server...
              })
          } else {
              this.imageName = []
              this.imageFile = []
              this.imageUrl = []
          }
      }
    },
    onCertificatePicked (e)
    {
      const files = e.target.files;
      const fileElement = files[0];
      if(fileElement !== undefined)
      {
        this.certificateName = fileElement.name;
        if(this.certificateName.lastIndexOf('.') <= 0)
        {
          return
        }
        const fr = new FileReader ();
        fr.readAsDataURL(fileElement)
        fr.addEventListener('load', () => {
          this.certificateUrl = fr.result;
          this.certificateFile = fileElement; // this is an image file that can be sent to server...
        })
      }
      else
      {
        this.certificateName= '';
        this.certificateUrl= '';
        this.certificateFile= null;
      }
    },
    formBlankTest()
    {
        return this.item_name !== '' && this.brand !== '' && this.color !== '' && this.detail !== '' && this.state !== '' && this.material !== '' &&
          this.price !== '' && this.rental !== '' && this.selected_category !== '' && this.selected_size !== '' && this.selected_tag !== [] && this.imageName !== []
          && this.certificateName !== [];
    },
    clear()
    {
      this.$v.$reset();
      this.item_name = "";
      this.brand = "";
      this.color = "";
      this.detail = "";
      this.state = "";
      this.material = "";
      this.rental = "";
      this.price = "";
      this.checkbox = false;
      this.selected_category= "";
      this.selected_size= "";
      this.selected_tag= [];
      this.imageName= [];
      this.imageUrl= [];
      this.imageFile= [];
      this.imageNum= 0;
      this.certificateName= '';
      this.certificateUrl= '';
      this.certificateFile= null;
      store.state.isSubmitError = false;
    },
  }
};
</script>