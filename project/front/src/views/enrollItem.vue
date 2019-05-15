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
      <h1 class="display-2 font-weight-thin mb-3">WearEver에 물품을 등록해보세요!</h1>
    </v-layout>
  </v-parallax>
    <v-container grid-list-xs text-xs-center>
    <v-alert
    class="mb-3"
    :value="isSubmitError"
    type="error"
    >
    장애가 발생했습니다. 잠시만 기다려주세요.
    </v-alert>
    <form>
      <v-text-field
        v-model="item_name"
        :error-messages="item_nameErrors"
        :counter="10"
        label="Item Name"
        required
        @input="$v.item_name.$touch()"
        @blur="$v.item_name.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="brand"
        :error-messages="brandErrors"
        label="Brand"
        required
        @input="$v.brand.$touch()"
        @blur="$v.brand.$touch()"
      ></v-text-field>
      <v-select
      v-model="color"
      :items="color_list"
      attach
      label="Color"
      :error-messages="colorErrors"
      @input="$v.color.$touch()"
      @blur="$v.color.$touch()"
      ></v-select>
      <v-text-field
        v-model="detail"
        :error-messages="detailErrors"
        label="Detail"
        required
        @input="$v.detail.$touch()"
        @blur="$v.detail.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="precautious"
        :error-messages="precautiousErrors"
        label="Precautious"
        required
        @input="$v.precautious.$touch()"
        @blur="$v.precautious.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="price"
        :error-messages="priceErrors"
        label="Price/Day(Won)"
        required
        @input="$v.price.$touch()"
        @blur="$v.price.$touch()"
      ></v-text-field>
    <v-flex xs12 sm6>
        <v-select
        v-model="selected_category"
        :items="category"
        attach
        label="Category"
        :error-messages="categoryErrors"
        @input="$v.selected_category.$touch()"
        @blur="$v.selected_category.$touch()"
        ></v-select>
    </v-flex>
    <v-flex xs12 sm6>
        <v-select
        v-model="selected_tag"
        :items="tag"
        attach
        label="Tag"
        chips
        multiple
        :error-messages="tagErrors"
        @input="$v.selected_tag.$touch()"
        @blur="$v.selected_tag.$touch()"
        ></v-select>
    </v-flex>
    <v-flex xs12 sm6>
        <v-select
        v-model="selected_size"
        :items="size"
        attach
        label="Size"
        :error-messages="sizeErrors"
        @input="$v.selected_size.$touch()"
        @blur="$v.selected_size.$touch()"
        ></v-select>
    </v-flex>

    <v-text-field
    readonly
    label="Select Item Images"
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
    label="Select guarantee of item"
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
        label="Do you agree?"
        required
        @change="$v.checkbox.$touch()"
        @blur="$v.checkbox.$touch()"
      ></v-checkbox>

      <v-btn @click="submit">Submit</v-btn>
      <v-btn @click="clear">Clear</v-btn>
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
    precautious: { required },
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
    brand: "",
    color_list: attribute.color,
    color: "",
    detail: "",
    precautious: "",
    price: "",
    size: attribute.size,
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
    precautiousErrors() {
      const errors = [];
      if (!this.$v.precautious.$dirty) return errors;
      !this.$v.precautious.required && errors.push("Precautious is required");
      return errors;
    },
    priceErrors() {
      const errors = [];
      if (!this.$v.price.$dirty) return errors;
      !this.$v.price.required && errors.push("Price is required");
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
          alert("약관에 동의해주세요");
          return;
          }
              const formData = new FormData();
              formData.append('shop_id', store.state.id);
              formData.append('item_name', this.item_name);
              formData.append('brand', this.brand);
              formData.append('color', this.color);
              formData.append('detail', this.detail);
              formData.append('precautious', this.precautious);
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
        return this.item_name !== '' && this.brand !== '' && this.color !== '' && this.detail !== '' && this.precautious !== '' && 
          this.price !== '' && this.selected_category !== '' && this.selected_size !== '' && this.selected_tag !== [] && this.imageName !== []
          && this.certificateName !== [];
    },
    clear()
    {
      this.$v.$reset();
      this.item_name = "";
      this.brand = "";
      this.color = "";
      this.detail = "";
      this.precautious = "";
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