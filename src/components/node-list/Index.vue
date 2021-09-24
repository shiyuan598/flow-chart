<template>
    <div class="node-list-container">
        <draggable @end="end" @start="move">
            <div class="node" nodeType="input">数据接入</div>
            <div class="node" nodeType="api">接口调用</div>
        </draggable>
    </div>
</template>

<script>
import eventBus from "../../../util/eventBus";
import draggable from "vuedraggable";
export default {
    name: "node-list",
    components: {
        draggable
    },
    created() {
        document.body.ondrop = function (event) {
            this.mousePosition.left = event.layerX;
            this.mousePosition.top = event.clientY - 50;
            event.preventDefault();
            event.stopPropagation();
        };
    },
    methods: {
        // 拖拽开始时触发
        move(evt) {
            // TODO:
            console.info("添加预制节点--开始", evt);
            this.nodeMenu = {
                name: "流程B-节点D",
                type: "task",
                left: "723px",
                top: "215px",
                icon: "el-icon-present",
                state: "waiting"
            };
        },
        // 拖拽结束时触发
        end(evt) {
            eventBus.$emit("addNode", evt, this.nodeMenu);
        }
    }
};
</script>

<style lang="scss" scoped>
.node-list-container {
    height: 100%;
    // width: 100%;
    padding: 20px;
    .node {
        font-size: 10px;
        box-sizing: content-box;
        height: 24px;
        min-width: 150px;
        padding: 0 3px;
        line-height: 24px;
        text-align: center;
        border-radius: 3px;
        border: 1px solid #ddd;
        cursor: move;
    }
    .node + .node {
        margin-top: 20px;
    }
}
</style>
