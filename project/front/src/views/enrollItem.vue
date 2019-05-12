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
      <v-text-field
        v-model="color"
        :error-messages="colorErrors"
        label="Color"
        required
        @input="$v.color.$touch()"
        @blur="$v.color.$touch()"
      ></v-text-field>
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
import attribute from "./../attribute";
const axios = require("axios");

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
    checkbox: {
      checked(val) {
        return val;
      }
    }
  },

  data: () => ({
    item_name: "",
    brand: "",
    color: "",
    detail: "",
    precautious: "",
    price: "",
    size: attribute.size,
    selected_size: "",
    category: attribute.category,
    selected_category: "",
    tag: attribute.tag,
    selected_tag: [],
    checkbox: false,
  }),

  computed: {
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
    tagErrors() {
      const errors = [];
      if (!this.$v.selected_tag.$dirty) return errors;
      !this.$v.selected_tag.required && errors.push("Tag is required");
      return errors;
    }
  },

  methods: {
    clear() {
      this.$v.$reset();
      this.item_name = "";
      this.brand = "";
      this.color = "";
      this.detail = "";
      this.precautious = "";
      this.price = "";
      this.select = null;
      this.checkbox = false;
      this.selected_category= "";
      this.selected_size= "";
      this.selected_tag= [];
    },
  }
};
</script>