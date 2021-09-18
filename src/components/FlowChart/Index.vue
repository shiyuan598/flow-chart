<template>
    <div id="flow-chart-container" class="flow-chart-container"></div>
</template>
<script>
import { jsPlumb } from "jsplumb";
import config, { setting } from "./config";
import data from "./data";
export default {
    name: "flow-chart",
    data() {
        return {
            data: null,
            jsPlumb: null,
            container: null
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.data = data;
            jsPlumb.ready(() => {
                this.jsPlumb = jsPlumb.getInstance(config);
                this.jsPlumb.setContainer("flow-chart-container");
                this.container = this.jsPlumb.getContainer();
                // 导入默认配置
                this.jsPlumb.importDefaults(setting.jsplumbSetting);
                console.info(data);
                // add Nodes
                data.nodeList.forEach((item) => this.generateNode(item));
                // add Connectors
                data.lineList.forEach((item) => this.generateConnector(item));
            });
        },
        generateNode({ id, left, top, name, icon, state }) {
            // 添加节点
            const newNode = document.createElement("div");
            newNode.classList.add("node");
            newNode.classList.add(state);
            newNode.style.left = left;
            newNode.style.top = top;
            console.info(icon);
            newNode.id = id;
            let iconNode = document.createElement("i");
            iconNode.classList.add(icon);
            iconNode.classList.add("flow-node-drag");
            newNode.appendChild(iconNode);
            newNode.appendChild(document.createTextNode(name));
            iconNode = document.createElement("i");
            iconNode.classList.add(this.getIconByState(state));
            iconNode.classList.add("flow-node-drag");
            newNode.appendChild(iconNode);
            this.container.appendChild(newNode);
            //  设置节点作为源和目标节点
            this.jsPlumb.makeSource(id, setting.jsplumbSourceOptions);
            this.jsPlumb.makeTarget(id, setting.jsplumbTargetOptions);
            this.jsPlumb.draggable(id, {
                containment: "parent"
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
                    target: to
                },
                setting.jsplumbConnectOptions
            );
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
    width: 100%;
    background-color: #f9f9f9;

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
}
</style>
