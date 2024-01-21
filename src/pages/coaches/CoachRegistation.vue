<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script lang="ts">
import BaseCard from "@/components/ui/BaseCard.vue";
import { defineComponent } from "vue";
import { useStore } from "vuex";
import CoachForm from "../../components/coaches/CoachForm.vue";

export default defineComponent({
  components: { CoachForm, BaseCard },
  setup(){
    const store= useStore()
    const saveData= (data: object)=>{
        store.dispatch('registerCoach', data)
    }

    return {saveData}
  }
});
</script>