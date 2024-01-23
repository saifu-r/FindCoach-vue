<template>
  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <ul v-if="hasRequests">
        <request-items
          v-for="req in receivedRequests"
          :key="req.id"
          :email="req.userEmail"
          :message="req.message"
        ></request-items>
      </ul>
      <h3 v-else></h3>
    </base-card>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import RequestItems from "../../components/requests/RequestItems.vue";

export default defineComponent({
  components: { RequestItems },
  setup() {
    const store = useStore();

    const receivedRequests = computed(() => store.getters.requests);
    const hasRequests = computed(() => store.getters.hasRequests);

    return { hasRequests, receivedRequests };
  },
});
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>