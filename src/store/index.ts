import { createStore } from 'vuex'
import axios from "axios";
import { ref } from 'vue';

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
    ],
    userId: 'c3',
    requests: [
      {coachId: "",
        userEmail: "",
        message: ""}
    ]
  },
  getters: {
    coaches(state){
      return state.coaches
    },
    hasCoaches(state){
      return state.coaches && state.coaches.length> 0
    },
    userId(state){
      return state.userId
    },
    requests(state){
      return state.requests
    },
    hasRequests(state){
      return state.requests && state.requests.length >0
    }
    
  },
  mutations: {
    registerCoach(state, payload){
      state.coaches.push(payload)
    },
    addRequest(state, payload){
      state.requests.push(payload)
    },

  },
  actions: {
    async registerCoach(context, payload){
      const id= ref(context.rootGetters.userId)
      const coachData={
        id: context.rootGetters.userId, //rootGetters
        firstName: payload.first,
        lastName: payload.last,
        hourlyRatexz: payload.rate,
        description: payload.description,
        areas: payload.areas
      }

      try{
        const response= await axios.put(
          `https://vue-find-coach-fe079-default-rtdb.firebaseio.com/coaches/${id.value}.json`, coachData
        )
      }catch(error){
        console.error("Error loading coach:", error); 
      }

      

      context.commit('registerCoach', coachData)
    },
    addRequest(context, payload){
      const newRequest= {
        id: new Date().toISOString(),
        coachId: payload.coachId,
        userEmail: payload.userEmail,
        message: payload.message
      }

      context.commit("addRequest", newRequest)
      
    }


  },
  modules: {
  }
})
