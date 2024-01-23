<template>
    <form @submit.prevent="submitForm">
        <div class="form-control">
            <label for="email">Email</label>
            <input type="text" name="email" id="email" v-model.trim="email">
        </div>
        <div class="form-control">
            <label for="message">Messase</label>
            <textarea name="messase" id="message" cols="30" rows="10" v-model.trim="message"></textarea>
        </div>
        <div>
            <p v-if="!isValid" class="errors">Please fill the form</p>
        </div>
        <div class="actions">
            <base-button>Send Message</base-button>
        </div>
    </form>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store= useStore()
    const route= useRoute()
    const email= ref('')
    const message= ref('')
    const isValid= ref(true)

    const submitForm= ()=>{
        isValid.value= true
        if(email.value === "" || message.value=== ""){
            isValid.value= false
            return
        }



        store.dispatch("addRequest",{
            coachId: route.params.id,
            userEmail: email.value,
            message: message.value
        })

        router.replace('/coaches')
    }

    return {email, message, isValid, submitForm}
  },
});
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>