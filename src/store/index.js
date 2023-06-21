import { createStore } from 'vuex'

export default createStore({
   state :{
    faqs: JSON.parse(localStorage.getItem('faqs')) || []
   },
   mutations: {
    createFaq(state, faq) {
      state.faqs.push(faq)
      localStorage.setItem('faqs', JSON.stringify(state.faqs))
    },
    updateFaq(state, { id, updatedFaq }) {
      const index = state.faqs.findIndex(faq => faq.id === id)
      if (index !== -1) {
        state.faqs.splice(index, 1, updatedFaq)
        localStorage.setItem('faqs', JSON.stringify(state.faqs))
      }
    },
    deleteFaq(state, id) {
      const index = state.faqs.findIndex(faq => faq.id === id)
      if (index !== -1) {
        state.faqs.splice(index, 1)
        localStorage.setItem('faqs', JSON.stringify(state.faqs))
      }
    }
  },
   actions: {
    createFaq({ commit }, faq) {
      commit('createFaq', faq)
    },
    updateFaq({ commit }, { id, updatedFaq }) {
      commit('updateFaq', { id, updatedFaq })
    },
    deleteFaq({ commit }, id) {
      commit('deleteFaq', id)
    }
  },
   getters: {
    getFaqs: state => state.faqs
  }
})
