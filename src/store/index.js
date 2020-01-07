import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    nodeID: 0,
    statisticsX: [],
    statisticsY: [],
    neoNodes: [],
    neoSelectedNetNodes: []
  },

  mutations: {
    setNodeID(state, payload) {
      state.nodeID = payload;
    },
    setStatisticsX(state, payload) {
      state.statisticsX = payload;
    },
    setStatisticsY(state, payload) {
      state.statisticsY = payload;
    },
    setNeoNodes(state, payload) {
      state.neoNodes = payload;
    },
    setNeoSelectedNetNodes(state, payload) {
      state.neoSelectedNetNodes = payload;
    }
  },

  actions: {
    setNodeIDAction({ commit }, payload) {
      commit("setNodeID", payload);
    },
    setStatisticsX({ commit }, payload) {
      commit("setStatisticsX", payload);
    },
    setStatisticsY({ commit }, payload) {
      commit("setStatisticsY", payload);
    },
    setNeoNodesAction({ commit }, payload) {
      commit("setNeoNodes", payload);
    },
    setNeoSelectedNetNodesAction({ commit }, payload) {
      commit("setNeoSelectedNetNodes", payload);
    }
  },

  getters: {
    getNodeID(state) {
      return state.nodeID;
    },
    getStatisticsX(state) {
      return state.statisticsX;
    },
    getStatisticsY(state) {
      return state.statisticsY;
    },
    getNeoNodes(state) {
      return state.neoNodes;
    },
    getNeoSelectedNetNodes(state) {
      return state.neoSelectedNetNodes;
    }
  },

  strict: process.env.NODE_ENV !== 'production'
});
