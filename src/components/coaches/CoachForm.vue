<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{invalid : !firstName.isValid}">
      <label for="firstname">Firstname</label>
      <input type="text" name="firstname" id="firstname" v-model.trim="firstName.val" @blur="clearValidity('firstName')"/>
      <p v-if="!firstName.isValid">First Name is Missing</p>
     
    </div>
    <div class="form-control" :class="{invalid : !lastName.isValid}">
      <label for="lastname">Lastname</label>
      <input type="text" name="lastname" id="lastname" v-model.trim="lastName.val" @blur="clearValidity('lastName')" />
      <p v-if="!lastName.isValid">Last Name is Missing</p>
    </div>
    <div class="form-control" :class="{invalid : !description.isValid}" > 
      <label for="description">Description</label>
      <textarea
        name="description"
        id="description"
        rows="5"
        v-model="description.val"
        @blur="clearValidity('description')"
      ></textarea>
      <p v-if="!description.isValid">Description is Missing</p>
    </div>
    <div class="form-control" :class="{invalid : !rate.isValid}" >
      <label for="rate">Hourly Rate</label>
      <input type="number" name="rate" id="rate" v-model.number="rate.val" @blur="clearValidity('rate')"/>
      <p v-if="!rate.isValid">Hourly Rate is Missing</p>
    </div>

    <div class="form-control" :class="{invalid : !areas.isValid}">
      <label>Areas of Expertise</label>
      <div>
        <input
          type="checkbox"
          name="frontend"
          id="frontend"
          value="frontend"
          v-model="areas.val"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="backend"
          id="backend"
          value="backend"
          v-model="areas.val"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="career"
          id="career"
          value="career"
          v-model="areas.val"
        />
        <label for="career">Career Advisory</label>
      </div>
    </div>
    <p v-if="!formIsValid">Please fix the error</p>

    <base-button @click="validateForm">Register</base-button>
  </form>
</template>

<script lang="ts">
import router from "@/router";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  emits: ["save-data"],
  setup(_, { emit }) {
    const firstName = ref({
        val: "",
        isValid: true
    });
    
    const lastName = ref({
        val: "",
        isValid: true
    });
    const description = ref({
        val: "",
        isValid: true
    });
    const rate = ref({
        val: null,
        isValid: true
    });
    const areas = ref({
        val: [],
        isValid: true
    });
    const formIsValid= ref(true)

    const clearValidity=(input: string)=>{
        if(input=== 'firstName'){
            firstName.value.isValid= true
        }
        if(input=== 'lastName'){
            lastName.value.isValid= true
        }
        if(input=== 'description'){
            description.value.isValid= true
        }
        if(input=== 'rate'){
            rate.value.isValid= true
        }
    
            
    }

    const validateForm= ()=>{
        formIsValid.value= true
        if(firstName.value.val === ''){
            firstName.value.isValid= false
            formIsValid.value= false
        }
        if(lastName.value.val === ''){
            lastName.value.isValid= false
            formIsValid.value= false
        }
        if(description.value.val === ''){
            description.value.isValid= false
            formIsValid.value= false
        }
        if(!rate.value.val){
            rate.value.isValid= false
            formIsValid.value= false
        }
        if(areas.value.val.length === 0){
            firstName.value.isValid= false
            formIsValid.value= false
        }
    }

    const submitForm = () => {

      if(!formIsValid.value){
        return
      }      
      const formData = {
        first: firstName.value.val,
        last: lastName.value.val,
        desc: description.value.val,
        rate: rate.value.val,
        areas: areas.value.val,
      };

      emit("save-data", formData);
      console.log(formData.rate);

      router.replace('/coaches')

    };

    return { firstName, lastName, description, rate, areas, submitForm, formIsValid, validateForm, clearValidity };
  },
});
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label,
.invalid p {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>


