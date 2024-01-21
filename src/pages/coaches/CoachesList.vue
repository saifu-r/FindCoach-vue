<template>
  <section><coach-filter></coach-filter></section>
  <section>
    <base-card>
    <div class="controls">
      <base-button>Refresh</base-button>
      <base-button link to="/register">Register as Coach</base-button>
    </div>
    <ul v-if="hasCoaches">
      <coach-item
        v-for="coach in filteredCoaches"
        :key="coach.id"
        :id="coach.id"
        :firstName="coach.firstName"
        :lastName="coach.lastName"
        :areas="coach.areas"
        :rate="coach.hourlyRate"
      ></coach-item>
      <!-- <li v-for="coach in filteredCoaches" :key="coach.id">
        {{ coach.firstName }}
      </li> -->
    </ul>
    <h2 v-else>Empty list</h2>
</base-card>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import CoachItem from "../../components/coaches/CoachItem.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";

export default defineComponent({
  components: { CoachItem, CoachFilter},
  setup() {

    const activeFilters= ref({
      frontend: true,
      backend: true,
      career: true,
    })
    const store = useStore();
    const filteredCoaches = computed(() => {
      const coaches= store.getters.coaches
      return coaches.filter(coach=>{
        if(activeFilters.value.frontend && coach.areas.includes('frontend')){
          return true
        } 
        if(activeFilters.value.backend && coach.areas.includes('backend')){
          return true
        } 
        if(activeFilters.value.career && coach.areas.includes('career')){
          return true
        } 
        return false
      })
    });
    const hasCoaches = computed(() => store.getters.hasCoaches);
    const setFilters= (updatedFilters: { frontend: boolean; backend: boolean; career: boolean })=>{
      activeFilters.value= updatedFilters
      
    }
    return { filteredCoaches, hasCoaches, setFilters};

   

  },
});
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>