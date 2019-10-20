<template>
    <div>
        <el-button @click="back" icon="el-icon-arrow-left">返回学生信息管理界面</el-button>
        <div id="mountNode"></div>
    </div>
</template>

<script>
    class treeNode {
        constructor(data, fatherNode){
            this.data = data;  //树数据
            this.fatherNode = fatherNode;  //父亲节点指针
            this.sonNode = [];
            //如果父节点不为空（即不是根节点）
            if(this.fatherNode != null){
                //在添加建立节点时，添加进父节点中的子节点数组
                this.fatherNode.sonNode.push(this);
            }
        }
    }
    export default {
        name: "Relation",
        data() {
            return {
                graph: '',
                graphData: [],
                nodes: [],
            }
        },
        methods: {
            //遍历寻找父亲节点
            preOrder(T){
                //递归调用结束条件
                if(T == null){
                    return;
                }else {
                    console.log(T.data);  //访问节点T的数据域
                    this.preOrder(T.fatherNode);  //递归往上寻找父亲节点
                }
            },
            //前序遍历寻找子节点
            pre(T){
                if(T == null){
                    return;
                }else{
                    this.nodes.push(T);
                    console.log(T.data);
                    for(let i in T.sonNode){
                        this.pre(T.sonNode[i]);  //前序遍历寻找子节点
                    }
                }
            },
            back(){
                this.$router.push('main');
            }
        },
        mounted() {
            let xz = new treeNode("校长", null);
            let ls1 = new treeNode("老师1", xz);
            let ls2 = new treeNode("老师2", xz);
            let ls3 = new treeNode("老师3", xz);
            let xs1 = new treeNode("学生1", ls1);
            let xs2 = new treeNode("学生2", ls2);
            let xs3 = new treeNode("学生3", ls2);
            let xs4 = new treeNode("学生4", ls3);
            console.log("前序遍历寻找子节点");
            console.log("------start------");
            this.pre(xz);
            console.log("-------end-------");
            console.log("遍历寻找父亲节点");
            console.log("------start------");
            this.preOrder(xs3);
            console.log("-------end-------");

            let data = {
                "id": xz.data,
                "children": []
            };
            for(let i in xz.sonNode){
                let child = {
                    "id": xz.sonNode[i].data,
                    "children": []
                };
                for(let j in xz.sonNode[i].sonNode){
                    let children = {
                        "id": xz.sonNode[i].sonNode[j].data
                    };
                    child.children.push(children);
                }
                data.children.push(child);
            }

            this.graph = new this.G6.TreeGraph({
                container: 'mountNode',
                width: window.innerWidth - 200,
                height: window.innerHeight - 200,
                pixelRatio: 2,
                fitView: true,
                modes: {
                    default: [{
                        type: 'collapse-expand',
                        onChange: function onChange(item, collapsed) {
                            var data = item.get('model').data;
                            data.collapsed = collapsed;
                            return true;
                        }
                    }, 'drag-canvas', 'zoom-canvas']
                },
                defaultNode: {
                    size: 16,
                    anchorPoints: [[0, 0.5], [1, 0.5]],
                    style: {
                        fill: '#40a9ff',
                        stroke: '#096dd9'
                    }
                },
                defaultEdge: {
                    shape: 'cubic-horizontal',
                    style: {
                        stroke: '#A3B1BF'
                    }
                },
                layout: {
                    type: 'compactBox',
                    direction: 'LR',
                    getId: function getId(d) {
                        return d.id;
                    },
                    getHeight: function getHeight() {
                        return 16;
                    },
                    getWidth: function getWidth() {
                        return 16;
                    },
                    getVGap: function getVGap() {
                        return 10;
                    },
                    getHGap: function getHGap() {
                        return 100;
                    }
                }
            });

            this.graph.node(function(node) {
                return {
                    size: 26,
                    style: {
                        fill: '#40a9ff',
                        stroke: '#096dd9'
                    },
                    label: node.id,
                    labelCfg: {
                        position: node.children && node.children.length > 0 ? 'left' : 'right'
                    }
                };
            });

            this.graph.read(data);
        }
    }
</script>

<style scoped>

</style>
