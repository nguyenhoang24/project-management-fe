<script>
import Vue from 'vue';
import {mapActions} from 'vuex';
import {dataNode} from "@/components/campaign/script/dataNode";

import PvInitial from "@/components/campaign/script/PvInitial.vue";
import PvTest from "@/components/campaign/script/PvTest.vue";
import PvAct from "@/components/campaign/script/PvAct.vue";
import PvEndGame from "@/components/campaign/script/PvEndGame.vue";

import MdScriptTestBranchingKH from '~/components/campaign/modal/MdScriptTestBranchingKH.vue';
import MdScriptTestBranchingEvent from '~/components/campaign/modal/MdScriptTestBranchingEvent.vue';
import MdScriptTestBranchingContext from '~/components/campaign/modal/MdScriptTestBranchingContext.vue';

import MdScriptTestConvertDefault from '~/components/campaign/modal/MdScriptTestConvertDefault.vue';
import MdScriptTestConvertTime from '~/components/campaign/modal/MdScriptTestConvertTime.vue';
import MdScriptTestWaitByTime from '~/components/campaign/modal/MdScriptTestWaitByTime.vue';

import MdScriptActRatioAB from '~/components/campaign/modal/MdScriptActRatioAB.vue';
import MdScriptActSendSMS from '~/components/campaign/modal/MdScriptActSendSMS.vue';
import MdScriptActSendZalo from '~/components/campaign/modal/MdScriptActSendZalo.vue';

import MdScriptActAVB from '~/components/campaign/modal/MdScriptActAVB.vue';
import MdScriptActSendVideoSMS from '~/components/campaign/modal/MdScriptActSendVideoSMS.vue';
import MdScriptActSendUSSD from '~/components/campaign/modal/MdScriptActSendUSSD.vue';
import Swal from "sweetalert2";

export default {
    name: "comp-form-campaign",
    props: {
        campaignId: {
            type: Number,
            default: 0
        },
        nodeStartName: {
            type: String,
            default: 'Initial1'
        }
    },
    components: {
        MdScriptTestBranchingKH,
        MdScriptTestBranchingEvent,
        MdScriptTestBranchingContext,
        MdScriptTestConvertDefault,
        MdScriptTestConvertTime,
        MdScriptTestWaitByTime,
        MdScriptActSendVideoSMS,
        MdScriptActSendSMS,
        MdScriptActSendZalo,
        MdScriptActSendUSSD,
        MdScriptActAVB,
        MdScriptActRatioAB
    },
    data() {
        return {
            dragEventType: "",
            nodeType: "",
            allEventsInfoArray: [],
            dialogVisible: false,
            nodeCount: 1,
            identifiersNodeCounter: 1,
            dialogData: {},
            listNodes: dataNode,
            listDataModalAll: [],
            objDataNodeModalTemp: null,
            nodeIdTemp: 0,
            payloadFormData: {
                campaignId: -1,
                name: '',
                flowType: 'TESTING',
                rawData: '',
                rawDataView: ''
            }
        }
    },
    async mounted() {
        const vm = this;

        const importedModule = await import("drawflow");
        const Drawflow = importedModule.default;
        Vue.prototype.$df = new Drawflow(this.$refs.drawflow, Vue, this);

        this.$df.reroute = false;
        this.$df.force_first_input = true;
        this.$df.editor_mode = 'edit';

        this.$df.curvature = 0;
        this.$df.reroute_curvature_start_end = 0;
        this.$df.reroute_curvature = 0;

        this.$df.createCurvature = function (start_x, start_y, end_x, end_y, curvature_value, type) {
            let center_y = ((end_y - start_y) / 2) + start_y;
            let default_round_radius = 10;
            let round_radius = Math.min(default_round_radius, Math.abs(start_x - end_x), Math.abs(start_y - end_y));

            let isRight = end_x > start_x;
            let isDown = end_y > start_y;

            return `M ${start_x} ${start_y}
            L ${start_x} ${isDown ? center_y - round_radius : center_y + round_radius}
            A ${round_radius} ${round_radius} 0 0 ${isRight ^ !isDown ? 0 : 1} ${isRight ? start_x + round_radius : start_x - round_radius} ${center_y}
            L ${isRight ? end_x - round_radius : end_x + round_radius} ${center_y}
            A ${round_radius} ${round_radius} 0 0 ${isRight ^ !isDown ? 1 : 0} ${end_x} ${isDown ? center_y + round_radius : center_y - round_radius}
            L ${end_x} ${end_y}`;
        }

        this.$df.start();

        this.$df.registerNode("PvInitial", PvInitial, {}, {});
        this.$df.registerNode("PvTest", PvTest, {}, {});
        this.$df.registerNode("PvAct", PvAct, {}, {});
        this.$df.registerNode("PvEndGame", PvEndGame, {}, {});

        this.$df.on("nodeCreated", function (nodeId) {
            const dataNode = vm.$df.getNodeFromId(nodeId);
            console.log("Node Created data : ", dataNode);

            if (dataNode['data'].type === "PvInitial") {
                let nodeStart = {
                    id: parseInt(nodeId),
                    title: "Bắt đầu chiến dịch",
                    node_type: "START"
                };

                vm.listDataModalAll.push(nodeStart);
            } else if (dataNode['data'].type === "PvEndGame") {
                let nodeEnd = {
                    id: parseInt(nodeId),
                    title: "Kết thúc chiến dịch",
                    node_type: "END"
                };

                vm.listDataModalAll.push(nodeEnd);
            }

            // nếu push dữ liệu default mặc định thì làm ở đây
        });

        this.$df.on("nodeSelected", function (nodeId) {
            const dataNode = vm.$df.getNodeFromId(nodeId);
            console.log("Node Created data : ", dataNode);
        });

        this.$df.on("nodeRemoved", function (nodeId) {
            console.log("Node nodeRemoved nodeId : ", nodeId);

            let foundIndex = vm.listDataModalAll.findIndex(x => x.id === parseInt(nodeId));
            if (foundIndex > -1) {
                vm.listDataModalAll.splice(foundIndex, 1);
            }
        });
    },
    methods: {
        ...mapActions('campaign/script', {
            apiAddWorkflowCamp: 'apiAddWorkflowCamp'
        }),
        drag(event, eventType) {
            event.dataTransfer.setData(
                "node",
                event.target.getAttribute("data-node")
            );
            this.dragEventType = eventType;
        },
        handleDbClick(e) {
            console.log("NODE : handleDbClick");
            if (e.target.closest(".drawflow_content_node") != null || e.target.classList[0] === 'drawflow-node') {
                let input_id = '';
                if (e.target.closest(".drawflow_content_node") != null) {
                    input_id = e.target.closest(".drawflow_content_node").parentElement.id;
                } else {
                    input_id = e.target.id;
                }

                let idNodeNumber = input_id.slice(5);
                console.log("handleDbClick idNodeNumber : ", idNodeNumber);

                this.nodeIdTemp = parseInt(idNodeNumber);

                let foundIndex = this.listDataModalAll.findIndex(x => x.id === parseInt(idNodeNumber));
                if (foundIndex > -1) {
                    this.objDataNodeModalTemp = this.listDataModalAll[foundIndex];
                } else {
                    this.objDataNodeModalTemp = null;
                }

                console.log("NODE data this.objDataNodeModalTemp : ", this.objDataNodeModalTemp);

                const dataNode = this.$df.getNodeFromId(idNodeNumber);
                console.log("NODE data : ", dataNode);

                const idNode = dataNode['data'].id;

                let idModal = null;

                if (idNode === 3) {
                    idModal = "MdScriptTestBranchingKH";
                } else if (idNode === 4) {
                    idModal = "MdScriptTestWaitByTime";
                } else if (idNode === 5) {
                    idModal = "MdScriptTestBranchingEvent";
                } else if (idNode === 6) {
                    idModal = "MdScriptTestConvertTime";
                } else if (idNode === 7) {
                    idModal = "MdScriptTestBranchingContext";
                } else if (idNode === 8) {
                    idModal = "MdScriptTestConvertDefault";
                } else if (idNode === 9) {
                    idModal = "MdScriptActRatioAB";
                } else if (idNode === 10) {
                    idModal = "MdScriptActAVB";
                } else if (idNode === 11) {
                    idModal = "MdScriptActSendSMS";
                } else if (idNode === 12) {
                    idModal = "MdScriptActSendVideoSMS";
                } else if (idNode === 13) {
                    idModal = "MdScriptActSendZalo";
                } else if (idNode === 14) {
                    idModal = "MdScriptActSendUSSD";
                }

                if (idModal) {
                    this.$bvModal.show(idModal);
                }
            }
            // this.$emit('dbClickOpenModal', this.ID)
        },
        drop(event) {
            event.preventDefault();
            const data = event.dataTransfer.getData("node");
            console.log('event.data', data);
            this.addNodeToDrawFlow(data, event.clientX, event.clientY);
        },
        allowDrop(event) {
            event.preventDefault();
        },
        addNodeToDrawFlow(name, posX, posY) {
            // Find the position of the event
            posX =
                posX *
                (this.$df.precanvas.clientWidth /
                    (this.$df.precanvas.clientWidth * this.$df.zoom)) -
                this.$df.precanvas.getBoundingClientRect().x *
                (this.$df.precanvas.clientWidth /
                    (this.$df.precanvas.clientWidth * this.$df.zoom));
            posY =
                posY *
                (this.$df.precanvas.clientHeight /
                    (this.$df.precanvas.clientHeight * this.$df.zoom)) -
                this.$df.precanvas.getBoundingClientRect().y *
                (this.$df.precanvas.clientHeight /
                    (this.$df.precanvas.clientHeight * this.$df.zoom));

            const nodeSelected = this.listNodes.find(
                (ele) => ele.name === this.dragEventType
            );

            console.log('nodeSelected: ', nodeSelected);

            this.nodeType = nodeSelected.type;

            const nodeCount = this.identifiersNodeCounter;

            this.$df.addNode(
                name,
                nodeSelected.input,
                nodeSelected.output,
                posX,
                posY,
                nodeSelected.name,
                nodeSelected,
                nodeSelected.type,
                "vue"
            );

            this.nodeCount++;
        },
        handleModalCallback(obj) {
            let objClone = Object.assign({}, obj);
            console.log('handleModalCallback obj: ', objClone);

            let foundIndex = this.listDataModalAll.findIndex(x => x.id === objClone.id);
            if (foundIndex > -1) {
                this.listDataModalAll[foundIndex] = objClone;
            } else {
                this.listDataModalAll.push(objClone);
            }

            console.log('listDataModalAll all: ', this.listDataModalAll);
        },
        handleActionDone() {
            let exportData = this.$df.export();
            let dataNode = exportData['drawflow']['Home']['data'];

            let linksBuild = [];
            for (const property in dataNode) {

                let objNode = dataNode[property];
                let source = objNode['id'];
                let connectionArr = objNode['outputs']['output_1']['connections'];

                if (connectionArr.length > 0) {
                    for (let ck = 0; ck < connectionArr.length; ck++) {
                        let desObj = connectionArr[ck];
                        let srcDes = {
                            source: source,
                            destination: parseInt(desObj['node'])
                        };

                        linksBuild.push(srcDes);
                    }
                }
            }

            let rawData = {
                nodes: this.listDataModalAll,
                links: linksBuild
            };

            this.payloadFormData.campaignId = this.campaignId;
            this.payloadFormData.rawData = JSON.stringify(rawData);
            this.payloadFormData.rawDataView = JSON.stringify(exportData);

            console.log('handleActionDone payloadFormData: ', this.payloadFormData);

            if (this.payloadFormData.name === '') {
                Swal.fire("", "Vui lòng nhập tên kịch bản", "warning");
                return;
            }

            this.apiAddWorkflowCamp(this.payloadFormData)
                .then(response => {
                    console.log('apiUploadVideoDone', response);
                    if (response.err_code === 0) {
                        Swal.fire("", response.err_message, "success");
                        this.$router.push({
                            path: "/campaign",
                        });
                    } else {
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    // this.commonLoadingPage(false);
                });
        }
    }
}
</script>
<style scoped>
.height-55 {
    height: 55px;
}
</style>

<style>
.drawflow-main {
    position: relative;
    width: calc(100%);
    height: calc(100vh - 383px);
    min-height: calc(100vh - 383px);
    background: var(--background-color);
    background-size: 25px 25px;
    background-image: linear-gradient(to right, #f1f1f1 1px, transparent 1px),
    linear-gradient(to bottom, #f1f1f1 1px, transparent 1px);
}

.drawflow .drawflow-node {
    display: block;
}

.drawflow .drawflow-node .inputs, .drawflow .drawflow-node .outputs {
    display: flex;
    width: auto;
    height: 2px;
    justify-content: center;
    align-items: center;
}

.drawflow .drawflow-node .input {
    top: -10px;
    left: 0;
}

.drawflow .drawflow-node .output {
    top: 15px;
    right: 0;
}

.drawflow-delete {
    background: red !important;
    border: none !important;
}

.drawflow .drawflow-node .input {
    /*left: -23px !important;*/
}

.drawflow .connection .main-path {
    stroke-width: 2px !important;
}

.drawflow .drawflow-node {
    /*width: 280px !important;*/
    padding: 0 !important;
    border: 2px solid #fff !important;
    border-radius: 6px !important;
    background: none !important;
}
</style>

<template>
    <div>
        <div class="row">
            <div class="col-3">
                <div class="card">
                    <div class="card-body pt-0">
                        <div class="row">
                            <div class="col-12">
                                <label class="col-form-label font-size-18">Danh sách kịch bản</label>
                            </div>
                            <hr>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <ul class="list-group">
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-7">
                                                <label>Kịch bản 1</label>
                                            </div>
                                            <div class="col-5 d-flex">
                                                <button type="button" class="btn btn-warning btn-block me-2" title="Sửa" @click="handleActionDone">
                                                    <i class="fa fa-edit"></i>
                                                </button>
                                                <button type="button" class="btn btn-warning me-2" title="Tạm dừng" @click="handleActionDone">
                                                    <i class="fa fa-pause-circle"></i>
                                                </button>
                                                <button type="button" class="btn btn-success" title="Tiếp tục" @click="handleActionDone">
                                                    <i class="fa fa-play-circle"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item active">
                                        <div class="row">
                                            <div class="col-7">
                                                <label>Kịch bản 2</label>
                                            </div>
                                            <div class="col-5 d-flex">
                                                <button type="button" class="btn btn-warning me-2" title="Sửa" @click="handleActionDone">
                                                    <i class="fa fa-edit"></i>
                                                </button>
                                                <button type="button" class="btn btn-warning me-2" title="Tạm dừng" @click="handleActionDone">
                                                    <i class="fa fa-pause-circle"></i>
                                                </button>
                                                <button type="button" class="btn btn-success" title="Tiếp tục" @click="handleActionDone">
                                                    <i class="fa fa-play-circle"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-7">
                                                <label>Kịch bản 3</label>
                                            </div>
                                            <div class="col-5 d-flex">
                                                <button type="button" class="btn btn-warning me-2" title="Sửa" @click="handleActionDone">
                                                    <i class="fa fa-edit"></i>
                                                </button>
                                                <button type="button" class="btn btn-warning me-2" title="Tạm dừng" @click="handleActionDone">
                                                    <i class="fa fa-pause-circle"></i>
                                                </button>
                                                <button type="button" class="btn btn-success" title="Tiếp tục" @click="handleActionDone">
                                                    <i class="fa fa-play-circle"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-12 d-grid">
                                <button type="button" class="btn btn-outline-info" @click="handleActionDone">
                                    <i class="fa fa-plus"></i> Thêm kịch bản mới
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-9">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-9">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-3 mb-3">
                                                <select class="form-select" v-model="payloadFormData.flowType">
                                                    <option value="TESTING">Kịch bản thử nghiệm</option>
                                                    <option value="PRODUCTION">Kịch bản chính thức</option>
                                                </select>
                                            </div>
                                            <div class="col-4">
                                                <div class="input-group">
                                                    <div class="input-group-text">Tên kịch bản</div>
                                                    <input type="text" class="form-control" placeholder="Nhập tên kịch bản ..." v-model="payloadFormData.name"/>
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <button type="button" class="btn btn-outline-info">
                                                    <i class="uil uil-plus-square me-2"></i> Tải kịch bản mẫu
                                                </button>
                                            </div>
                                            <div class="col-2 text-end">
                                                <button type="button" class="btn btn-success" @click="handleActionDone">
                                                    <i class="uil uil-save me-2"></i> Hoàn thành
                                                </button>
                                            </div>
                                            <hr>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="drawflow-main"
                                                     ref="drawflow"
                                                     @dblclick="handleDbClick"
                                                     @drop="drop"
                                                     @dragover="allowDrop"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="card mb-0">
                                    <div class="card-body pt-0 pb-2">
                                        <div class="row">
                                            <div class="col-12">
                                                <label class="col-form-label font-size-18">Cài đặt các bước</label>
                                            </div>
                                            <hr>
                                        </div>
                                        <div class="row">
                                            <label class="col-12">Điều kiện ban đầu</label>
                                            <div class="col-6 mb-2 drag-drawflow cursor-pointer" draggable="true"
                                                 v-for="obj in listNodes"
                                                 v-if="obj.type === 'PvInitial' && obj.name === nodeStartName"
                                                 :key="obj.id"
                                                 :data-node="obj.item"
                                                 @dragstart="drag($event, obj.name)"
                                            >
                                                <label class="rounded bg-success d-block p-2 height-55 text-white">
                                                    {{ obj.textView }}
                                                </label>
                                            </div>
                                            <div class="col-6 mb-2 drag-drawflow cursor-pointer" draggable="true"
                                                 v-for="obj in listNodes"
                                                 v-if="obj.type === 'PvEndGame'"
                                                 :key="obj.id"
                                                 :data-node="obj.item"
                                                 @dragstart="drag($event, obj.name)"
                                            >
                                                <label class="rounded bg-danger d-block p-2 height-55 text-white">
                                                    {{ obj.textView }}
                                                </label>
                                            </div>
                                            <hr>
                                        </div>
                                        <div class="row">
                                            <label class="col-12">Điều kiện kiểm tra</label>
                                            <div class="col-6 mb-2 drag-drawflow cursor-pointer" draggable="true"
                                                 v-for="obj in listNodes"
                                                 v-if="obj.type === 'PvTest'"
                                                 :key="obj.id"
                                                 :data-node="obj.item"
                                                 @dragstart="drag($event, obj.name)"
                                            >
                                                <label class="rounded bg-danger d-block p-2 height-55 text-white">
                                                    {{ obj.textView }}
                                                </label>
                                            </div>
                                            <hr>
                                        </div>
                                        <div class="row">
                                            <label class="col-12">Hành động</label>
                                            <div class="col-6 mb-2 drag-drawflow cursor-pointer" draggable="true"
                                                 v-for="obj in listNodes"
                                                 v-if="obj.type === 'PvAct'"
                                                 :key="obj.id"
                                                 :data-node="obj.item"
                                                 @dragstart="drag($event, obj.name)"
                                            >
                                                <label class="rounded bg-primary d-block p-2 height-55 text-white">
                                                    {{ obj.textView }}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <md-script-test-branching-k-h @handleModalCallback="handleModalCallback" :node-id="nodeIdTemp" :data-node-modal="objDataNodeModalTemp"/>
        <md-script-test-branching-context @handleModalCallback="handleModalCallback" :node-id="nodeIdTemp" :data-node-modal="objDataNodeModalTemp"/>
        <md-script-test-branching-event @handleModalCallback="handleModalCallback" :node-id="nodeIdTemp" :data-node-modal="objDataNodeModalTemp"/>
        <md-script-test-convert-default @handleModalCallback="handleModalCallback" :node-id="nodeIdTemp" :data-node-modal="objDataNodeModalTemp"/>
        <md-script-test-convert-time @handleModalCallback="handleModalCallback" :node-id="nodeIdTemp" :data-node-modal="objDataNodeModalTemp"/>
        <md-script-test-wait-by-time @handleModalCallback="handleModalCallback" :node-id="nodeIdTemp" :data-node-modal="objDataNodeModalTemp"/>
        <md-script-act-ratio-a-b @handleModalCallback="handleModalCallback" :node-id="nodeIdTemp" :data-node-modal="objDataNodeModalTemp"/>
        <md-script-act-send-s-m-s @handleModalCallback="handleModalCallback" :node-id="nodeIdTemp" :data-node-modal="objDataNodeModalTemp"/>
        <md-script-act-send-zalo @handleModalCallback="handleModalCallback" :node-id="nodeIdTemp" :data-node-modal="objDataNodeModalTemp"/>
        <md-script-act-send-u-s-s-d @handleModalCallback="handleModalCallback" :node-id="nodeIdTemp" :data-node-modal="objDataNodeModalTemp"/>
        <md-script-act-send-video-s-m-s @handleModalCallback="handleModalCallback" :node-id="nodeIdTemp" :data-node-modal="objDataNodeModalTemp"/>
        <md-script-act-a-v-b @handleModalCallback="handleModalCallback" :node-id="nodeIdTemp" :data-node-modal="objDataNodeModalTemp"/>
    </div>
</template>
