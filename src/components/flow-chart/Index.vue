<template>
    <div id="flow-chart-container" class="flow-chart-container">
        <div
            :key="item.id"
            :id="item.id"
            :class="['node', item.state]"
            :style="{ left: item.left, top: item.top }"
            v-for="item in nodeList"
            @click="clickNode(item.id, $event)"
            @contextmenu="showNodeContextMenu(item.id, $event)"
        >
            <i :class="[item.icon, 'flow-node-drag']"></i>
            {{ item.name }}
            <i :class="[getIconByState(item.state), 'flow-node-drag']"></i>
        </div>
    </div>
</template>
<script>
import { jsPlumb } from "jsplumb";
import config, { setting } from "./config";
import eventBus from "../../../util/eventBus";
import data from "./data";
export default {
    name: "flow-chart",
    data() {
        return {
            data: null,
            jsPlumb: null,
            container: null,
            nodeList: null,
            lineList: null
        };
    },
    mounted() {
        this.init();
        eventBus.$on("addNode", this.addNode);
    },
    methods: {
        init() {
            this.data = data;
            this.nodeList = data.nodeList;
            this.lineList = data.lineList;
            jsPlumb.ready(() => {
                this.jsPlumb = jsPlumb.getInstance(config);
                this.jsPlumb.setContainer("flow-chart-container");
                this.container = this.jsPlumb.getContainer();
                // 导入默认配置
                this.jsPlumb.importDefaults(setting.jsplumbSetting);
                // 添加流程图的节点和连线
                this.$nextTick(() => {
                    // add Nodes
                    const nodes = jsPlumb.getSelector(
                        "#flow-chart-container .node"
                    );
                    nodes.forEach((item) => this.generateNode(item));
                    // add Connectors
                    data.lineList.forEach((item) =>
                        this.generateConnector(item)
                    );
                });
                // 设置事件监听
                this.jsPlumb.bind("click", (conn, evt) => {
                    console.info("click", conn, evt);
                });
                this.jsPlumb.bind("connection", (evt) => {
                    console.info("connection", evt);
                });
                this.jsPlumb.bind("connectionDetached", (evt) => {
                    console.info("connectionDetached", evt);
                });
                // 连线右击
                this.jsPlumb.bind("contextmenu", (evt) => {
                    console.log("contextmenu", evt);
                });
            });
        },
        generateNode(id) {
            //  设置节点作为源和目标节点
            this.jsPlumb.makeSource(id, setting.jsplumbSourceOptions);
            this.jsPlumb.makeTarget(id, setting.jsplumbTargetOptions);
            this.jsPlumb.draggable(id, {
                containment: "parent",
                stop: function (el) {
                    // 拖拽节点结束后的回调
                    console.log("Node Drag", el.pos);
                }
            });
        },
        getIconByState(state) {
            let icon = "";
            switch (state) {
                case "success":
                    icon = "el-icon-circle-check";
                    break;
                case "running":
                    icon = "el-icon-loading";
                    break;
                case "error":
                    icon = "el-icon-circle-close";
                    break;
                case "waiting":
                    icon = "el-icon-remove-outline";
                    break;
                default:
                    break;
            }
            return icon;
        },
        generateConnector({ from, to }) {
            this.jsPlumb.connect(
                {
                    source: from,
                    target: to,
                    label: "hahs"
                },
                setting.jsplumbConnectOptions
            );
        },
        clickNode(id, evt) {
            console.info("Node Click", id, evt);
        },
        showNodeContextMenu(id, evt) {
            console.info("Node Context Mneu", id, evt);
        },
        addNode(evt, node) {
            let screenX = evt.originalEvent.clientX,
                screenY = evt.originalEvent.clientY;
            let efContainer = document.querySelector("#flow-chart-container");
            var containerRect = efContainer.getBoundingClientRect();
            let left = screenX,
                top = screenY;
            // 计算是否拖入到容器中
            if (
                left < containerRect.x ||
                left > containerRect.width + containerRect.x ||
                top < containerRect.y ||
                containerRect.y > containerRect.y + containerRect.height
            ) {
                this.$message.error("请把节点拖入到画布中");
                return;
            }
            left = left - containerRect.x + efContainer.scrollLeft;
            top = top - containerRect.y + efContainer.scrollTop;
            // 居中
            left -= 79;
            top -= 14;
            node.left = left + "px";
            node.top = top + "px";
            node.id = this.getUUID();
            this.nodeList.push(node);
            this.$nextTick(() => {
                this.generateNode(node.id);
            });
        },
        getUUID() {
            return Math.random().toString(36).substr(3, 10);
        }
    }
};
</script>

<style lang="scss">
$border: 1px solid #ddd;
$runningColor: #409eff;
$successColor: #67c23a;
$errorColor: #f56c6c;
$waitingColor: #909399;
.flow-chart-container {
    position: relative;
    height: 100%;
    // width: 100%;
    border: 1px solid #eee;

    overflow: auto;
    padding: 30px;
    .node {
        font-size: 10px;
        position: absolute;
        box-sizing: content-box;
        height: 24px;
        min-width: 150px;
        padding: 0 3px;
        line-height: 24px;
        text-align: center;
        border-radius: 3px;
    }
    .node:hover {
        cursor: move;
    }
    .node:focus {
        outline: none;
    }
    .running {
        color: $runningColor;
        border: 1px solid $runningColor;
        background-color: #ecf5ff;
        &:hover {
            color: #fff;
            background-color: $runningColor;
        }
    }
    .success {
        color: $successColor;
        border: 1px solid $successColor;
        background-color: #f0f9eb;
        &:hover {
            color: #fff;
            background-color: $successColor;
        }
    }
    .error {
        color: $errorColor;
        border: 1px solid $errorColor;
        background-color: #fef0f0;
        &:hover {
            color: #fff;
            background-color: $errorColor;
        }
    }
    .waiting {
        color: $waitingColor;
        border: 1px solid $waitingColor;
        background-color: #f4f4f5;
        &:hover {
            color: #fff;
            background-color: $waitingColor;
        }
    }
    .flow-node-drag {
        cursor: crosshair;
        padding: 0 5px;
    }
    /* 连线中的label 样式*/
    .jtk-overlay.flowLabel:not(.aLabel) {
        padding: 4px 10px;
        background-color: white;
        color: #565758 !important;
        border: 1px solid #e0e3e7;
        border-radius: 2px;
    }
}
</style>
