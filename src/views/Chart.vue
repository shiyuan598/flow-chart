<template>
    <div class="chart-container">
        <flow-chart />
    </div>
</template>
<script>
import FlowChart from "../components/FlowChart/Index.vue";
export default {
    name: "chart",
    components: {
        FlowChart
    }
};
</script>

<style lang="scss" scoped>
.chart-container {
    height: 100%;
    width: 100%;
}
</style>
