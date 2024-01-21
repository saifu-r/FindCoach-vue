<template>
  <section>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h3>${{ rate }}/hour</h3>
      <p>{{ description }}</p>
    </base-card>
  </section>
  <section>
    <base-card>
      <header>
        <h2>Interested? Reach out Now!</h2>
        <base-button link :to="contactLink">Contact</base-button>
      </header>
      <router-view></router-view>
    </base-card>
  </section>

  <section>
    <base-card>
      <base-badge
        v-for="area in areas"
        :key="area"
        :title="area"
        :type="area"
      ></base-badge>
    </base-card>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  props: ["id"],
  setup(props) {
    const store= useStore()
    const selectedCoach = ref(null);

    onBeforeMount(() => {
        selectedCoach.value= store.getters.coaches.find((coach)=> coach.id=== props.id)

    });

    const fullName= computed(()=>{
        return selectedCoach.value.firstName + " " + selectedCoach.value.lastName
    })
    const contactLink= computed(()=>{
        return '/coaches/' + props.id + '/contact'
    })

    const rate=computed(()=>{
        return selectedCoach.value.hourlyRate 
    })
    const areas=computed(()=>{
        return selectedCoach.value.areas 
    })
    const description=computed(()=>{
        return selectedCoach.value.description 
    })

    return {fullName, contactLink, rate, areas, description}
  },
});
</script>