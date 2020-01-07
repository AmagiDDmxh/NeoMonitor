<template>
  <div class="contanier mt-3 col-12">
    <div class="form-group has-search mb-2 col-3 float-right">
      <span class="fa fa-search form-control-feedback"></span>
      <input
        type="text"
        v-model="filter"
        placeholder="Filter by Nodes or Height"
        icon="search"
        class="form-control"
      />
    </div>
    <b-table
      responsive
      striped
      hover
      bordered
      :items="nodeInfo"
      :fields="fields"
      :filter="filter"
      :filter-function="filterTable"
    >
      <template v-slot:cell(exceptionHeight)="data">
        <a :href="`http://neoscan.io/block/${data.value}`" target="_blank">{{ data.value }}</a>
      </template>
      <template v-slot:cell(exceptionTime)="data">
        <router-link to="/statistics">
          <span>{{ data.value }}</span>
        </router-link>
      </template>
    </b-table>
  </div>
</template>

<script>
import NodeService from "@/services/NodeService";
export default {
  name: "NodeInfo",
  data() {
    return {
      fields: [
        {
          key: "id",
          label: "ID",
          sortable: true
        },
        {
          key: "nodeName",
          label: "Nodes",
          sortable: true
        },
        {
          key: "exceptionHeight",
          label: "Height",
          sortable: true
        },
        {
          key: "exceptionTime",
          label: "Generate Time(GMT +8)",
          sortable: true
        },
        {
          key: "intervals",
          label: "Interval(s)",
          sortable: true
        }
      ],
      nodeInfo: [],
      filter: null
    };
  },
  mounted() {
    this.getNodeInfo();
  },
  methods: {
    async getNodeInfo() {
      const response = await NodeService.getNodeInfo(this.nodeID);
      let responses = response.status === 200 ? response.data : null;
      this.nodeInfo = responses;

      // setStatisticsData
      let exceptionTimes = [];
      let intervals = [];
      responses.filter(item => {
        exceptionTimes.push(item.exceptionTime);
        intervals.push(item.intervals);
      });

      this.setStatisticsData(exceptionTimes, intervals);
    },
    setStatisticsData(xAxis, yAxis) {
      this.$store.dispatch("setStatisticsX", xAxis);
      this.$store.dispatch("setStatisticsY", yAxis);
    },
    filterTable(row, filter) {
      // filtered by node name and exception height
      return row.NodeName.toLowerCase().includes(filter.toLowerCase()) ||
             row.exceptionHeight.toString().toLowerCase().includes(filter.toLowerCase());
    }
  },
  computed: {
    nodeID() {
      return this.$store.getters.getNodeID;
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
