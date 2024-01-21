<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <span class="filter-option">
      <input
        type="checkbox"
        name="frontend"
        id="frontend"
        checked
        @change="setFilter"
      />
      <label for="frontend">frontend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" name="backend" id="backend" checked @change="setFilter"/>
      <label for="backend">backend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" name="career" id="career" checked @change="setFilter"/>
      <label for="career">career</label>
    </span>
  </base-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    emit: ['change-filter'],
  setup(context, { emit }) {

    const updatedFilters = ref({})
    const filters = ref({
      frontend: true,
      backend: true,
      career: true,
    });

    const setFilter = (event: Event) => {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      updatedFilters.value = {
        ...filters.value,
        [inputId]: isActive,
      };
      filters.value = updatedFilters.value;
    
    };

    emit("change-filter", updatedFilters);

    return { setFilter };
  },
});
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>