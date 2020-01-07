<template>
  <div>
    <div class="contanier mt-3 col-12">
      <div class="form-group has-search mb-2 col-3 float-right">
        <span class="fa fa-search form-control-feedback"></span>
        <input
          type="text"
          v-model="filter"
          placeholder="Filter by Name"
          icon="search"
          class="form-control"
        />
      </div>
      <b-table
        responsive
        striped
        hover
        bordered
        :items="nodes"
        :fields="fields"
        :filter="filter"
        :filter-function="filterTable"
        class="node-table"
      >
        <template v-slot:cell(exceptionCount)="data">
          <router-link to="/nodeinfo">
            <span v-on:click="setNodeID(data.item.id)">{{ data.value }}</span>
          </router-link>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nodes",
  data() {
    return {
      fields: [
        {
          key: "id",
          label: "ID",
          sortable: true
        },
        {
          key: "url",
          label: "Name",
          sortable: true
        },
        {
          key: "height",
          label: "Current Height",
          sortable: true
        },
        {
          key: "version",
          label: "Version",
          sortable: true
        },
        {
          key: "latency",
          label: "Latency",
          sortable: true
        },
        {
          key: "peers",
          label: "Peers",
          sortable: true
        },
        {
          key: "memPool",
          label: "Mempool",
          sortable: true
        },
        {
          key: "exceptionCount",
          label: "Exceptions",
          sortable: true
        }
      ],
      nodes: [],
      filter: null
    };
  },
  mounted() {
    this.nodes = this.$store.getters.getNeoSelectedNetNodes;
    this.getNodes();
  },
  methods: {
    getNodes() {
      let data = this.$store.getters.getNeoSelectedNetNodes;
      if (data.length === 0) return;

      let array = [];
      data.forEach(item => {
        let newItem = { ...item };
        if (item.latency === -1) {
          newItem.height = "-";
          newItem.version = "-";
          newItem.latency = "-";
          newItem.peers = "-";
          newItem.memPool = "-";
        }
        array.push(item);
      });
      this.nodes = array;
    },
    setNodeID(param) {
      this.$store.dispatch("setNodeIDAction", param);
    },
    filterTable(row, filter) {
      return row.url.toLowerCase().includes(filter.toLowerCase());
    }
  },
  computed: {
    nodeID() {
      return this.$store.getters.getNodeID;
    },
    refreshNodes() {
      return this.$store.getters.getNeoSelectedNetNodes;
    }
  },
  watch: {
    refreshNodes: function() {
      this.getNodes();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.has-search .form-control {
  padding-left: 2.375rem;
}

.has-search .form-control-feedback {
  position: absolute;
  z-index: 2;
  display: block;
  width: 2.375rem;
  height: 2.375rem;
  line-height: 2.375rem;
  text-align: center;
  pointer-events: none;
  color: #777;
}
</style>
