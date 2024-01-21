import { createStore } from 'vuex'

export default createStore({
  state: {
    coaches: [
      {
        id: 'c1',
        firstName: 'Maximilian',
        lastName: 'Schwarzmüller',
        areas: ['frontend', 'backend', 'career'],
        description:
          "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
        hourlyRate: 30
      },
      {
        id: 'c2',
        firstName: 'Julie',
        lastName: 'Jones',
        areas: ['frontend', 'career'],
        description:
          'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
        hourlyRate: 40
      }
    ]
  },
  getters: {
    coaches(state){
      return state.coaches
    },
    hasCoaches(state){
      return state.coaches && state.coaches.length> 0
    }
  },
  mutations: {
    registerCoach(state, payload){
      state.coaches.push(payload)
    }

  },
  actions: {
    registerCoach(context, payload){
      const coachData={
        id: 'c3',
        firstName: payload.first,
        lastName: payload.last,
        rate: payload.rate,
        description: payload.description,
        areas: payload.areas
      }

      context.commit('registerCoach', coachData)
    }
  },
  modules: {
  }
})
