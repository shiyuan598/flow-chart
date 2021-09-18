<template>
    <div class="chart-container">
        <node-list class="side" />
        <flow-chart class="main" />
    </div>
</template>
<script>
import NodeList from "../components/node-list/Index.vue";
import FlowChart from "../components/flow-chart/Index.vue";
export default {
    name: "chart",
    components: {
        NodeList,
        FlowChart
    }
};
</script>

<style lang="scss" scoped>
.chart-container {
    height: 100%;
    width: 100%;
    display: flex;
    .sdie {
        width: 200px;
    }
    .main {
        width: calc(100% - 200px);
    }
}
</style>
