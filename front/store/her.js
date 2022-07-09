export const state = () => ({
    clothes: [],
    next: null,
    prev: null
  })
  
  export const mutations = {
    setClothes(state, clothes) {
      state.clothes = clothes
    },
    setNext(state, next) {
      state.next = next
    },
    setPrevious(state, prev) {
      state.prev = prev
    },
  }
  
  export const actions = {
    async fetch({commit}) {
      const clothes = await this.$axios.$get('/api/clothes/?limit=2')
      commit('setClothes', clothes);
      commit('setNext', clothes.next)
      commit('setPrevious', clothes.previous);
    },
    async filterByPrice({commit}, clothes) {
      const filteredClothes = [...clothes].filter(clot => clot.price >= 10000);
      commit('setClothes', filteredClothes)
    },
    async fetchAll({commit}) {
      const clothes = await this.$axios.$get('/api/clothes/')
      commit('setClothes', clothes)
      commit('setNext', clothes.next);
      commit('setPrevious', clothes.previous);
    },
    sortByNames({commit}, clothes) {
      const sortedClothes = [...clothes].sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

      commit('setClothes', sortedClothes);
    },
    async fetchNext({commit}, nextLink) {
      const clothes = await this.$axios.$get('/api/' + nextLink.split('/api/')[1]); 
      commit('setClothes', clothes);
      commit('setNext', clothes.next);
      commit('setPrevious', clothes.previous);
    },
    async fetchPrev({commit}, prevLink) {
      const clothes = await this.$axios.$get('/api/' + prevLink.split('/api/')[1]); 
      commit('setClothes', clothes);
      commit('setNext', clothes.next);
      commit('setPrevious', clothes.previous);
    },
  }
  
  export const getters = {
    clothes: s => s.clothes,
    next: s => s.next,
    prev: s => s.prev
  }
  