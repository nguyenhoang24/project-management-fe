<template>
    <div>
        <!-- Search -->
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h3>Sửa Event</h3>
                        <div class="row">
                            <div class="col-6">
                                <label>Tên Event</label>
                                <input type="text" class="form-control form-control-sm"/>
                            </div>
                            <div class="col-6">
                                <label>Tài khoản</label>
                                <input type="text" class="form-control form-control-sm"/>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-6">
                                <label>Trạng thái</label>
                                <input type="text" class="form-control form-control-sm"/>
                            </div>
                            <div class="col-6">
                                <label>Nguồn sự kiện</label>
                                <input type="text" class="form-control form-control-sm"/>
                            </div>
                        </div>
                        <div class="row justify-content-end">
                            <b-button class="col-1 mt-4" variant="primary">Lưu</b-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Table data -->
<!--        <div class="row">-->
<!--            <div class="col-12">-->
<!--                <div class="card">-->
<!--                    <div class="card-body">-->
<!--                        &lt;!&ndash; Table &ndash;&gt;-->
<!--                        <div class="table-responsive mb-1">-->
<!--                            <b-table striped bordered :items="tableData" :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">-->
<!--                                <template v-slot:cell(action)=data>-->
<!--                                    <ul class="list-inline mb-0">-->
<!--                                        <nuxt-link title="Xem tập TB"-->
<!--                                                   to="/setting/view/event/1"-->
<!--                                                   class="text-secondary p-2"-->
<!--                                        ><i class="uil uil-eye font-size-18"></i>-->
<!--                                        </nuxt-link>-->
<!--                                        <nuxt-link title="Sửa tập TB"-->
<!--                                                   to="/setting/edit/event/1"-->
<!--                                                   class="text-secondary pe-2"-->
<!--                                        ><i class="uil uil-pen font-size-18"></i>-->
<!--                                        </nuxt-link>-->
<!--                                        <li class="list-inline-item">-->
<!--                                            <a-->
<!--                                                @click="handleDelete(data.item.id)"-->
<!--                                                class="text-secondary"-->
<!--                                                v-b-tooltip.hover-->
<!--                                                title="Delete"-->
<!--                                            >-->
<!--                                                <i class="uil uil-trash-alt font-size-18"></i>-->
<!--                                            </a>-->
<!--                                        </li>-->
<!--                                        <li class="list-inline-item">-->
<!--                                            <div class="form-check form-switch">-->
<!--                                                <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>-->
<!--                                                <label class="form-check-label" for="flexSwitchCheckChecked"></label>-->
<!--                                            </div>-->
<!--                                        </li>-->
<!--                                    </ul>-->
<!--                                </template>-->
<!--                            </b-table>-->
<!--                        </div>-->
<!--                        <div class="row">-->
<!--                            <div class="col-6 d-inline-flex">-->
<!--                                <label class="d-inline-flex align-items-center mb-0 pb-0">-->
<!--                                    <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;&nbsp;Số/ Trang-->
<!--                                </label>-->
<!--                            </div>-->
<!--                            <div class="col-6">-->
<!--                                <b-pagination-->
<!--                                    class="mb-0" align="right"-->
<!--                                    v-model="currentPage"-->
<!--                                    :total-rows="rows"-->
<!--                                    :per-page="perPage"-->
<!--                                ></b-pagination>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
        <!-- upload list blacklist -->
<!--        <b-modal id="modal-add-event" v-if="showModalEvent" size="lg" title="Thêm định nghĩa Event" title-class="font-18" hide-footer>-->
<!--            <div class="row pb-3">-->
<!--                <div class="col-12 col-sm-12">-->
<!--                    <label>Tên Event</label>-->
<!--                    <input type="text" v-model="nameEvent" placeholder="Tên Event" class="form-control form-control multiselect__tags"/>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="row pb-3">-->
<!--                <div class="col-12 col-sm-12">-->
<!--                    <label>Nguồn sự kiện</label>-->
<!--                    <multiselect v-model="eventSource" :options="optionsEventSource" :multiple="true"></multiselect>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="row pb-3">-->
<!--                <div class="col-12 col-sm-12">-->
<!--                    <label>Loại dữ liệu cần lấy</label>-->
<!--                    <multiselect v-model="eventType" :options="optionsEventType" :multiple="true"></multiselect>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="row pb-3">-->
<!--                <div class="col-12 col-sm-12">-->
<!--                    <label>Các thông tin hiển thị trên giao diện</label>-->
<!--                    <multiselect v-model="eventInfo" :options="optionsEventInfo" :multiple="true"></multiselect>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="row pb-3">-->
<!--                <div class="col-12 col-sm-12">-->
<!--                    <label>Các option</label>-->
<!--                    <multiselect v-model="eventOption" :options="optionsEvent" :multiple="true"></multiselect>-->
<!--                </div>-->
<!--            </div>-->
<!--            &lt;!&ndash; end card-body &ndash;&gt;-->
<!--            <div class="text-end mt-4">-->
<!--                <button type="button" @click="showModalEvent=false" class="btn btn-default">Bỏ qua</button>-->
<!--                <button type="button" class="btn btn-primary px-4">Lưu</button>-->
<!--            </div>-->
<!--        </b-modal>-->
    </div>
</template>

<script>
import Multiselect from "vue-multiselect";

import "vue-multiselect/dist/vue-multiselect.min.css";
import vue2Dropzone from "vue2-dropzone";

export default {
    name: "event",
    components: {
        Multiselect,
    },
    data() {
        return {
            showModalEvent: false,
            nameEvent: '',
            eventSource: '',
            eventType: '',
            eventInfo: '',
            eventOption: '',
            fields: [
                {
                    key: "stt",
                    label: "STT",
                    sortable: true,
                    thStyle: {width: "3%"},
                },
                {
                    key: "name",
                    label: "Tên Event",
                    sortable: true,
                    thStyle: {width: "20%"},
                },
                {
                    key: "account",
                    label: 'Tài khoản',
                    sortable: true,
                    thStyle: {width: "20%"},
                },
                {
                    key: "status",
                    label: 'Trạng thái',
                    sortable: true,
                    thStyle: {width: "20%"},
                },
                {
                    key: "event",
                    label: 'Nguồn sự kiện',
                    sortable: true,
                    thStyle: {width: "20%"},
                },
                {
                    key: "action",
                    label: 'Thao tác',
                    thStyle: {width: "10%"},
                    tdClass: 'text-center',
                },
            ],
            tableData: [
                {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Lucinda Stickley',
                    position: 'Data Coordiator',
                    office: 'Sirnarasa',
                    id: 31,
                    date: '2018/07/29',
                    amount: '$13600',
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Henrietta Carsberg',
                    position: 'Data Coordiator',
                    office: 'Paninggaran',
                    id: 59,
                    date: '2019/07/13',
                    amount: '$13700'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Phylys David',
                    position: 'Senior Developer',
                    office: 'New Glasgow',
                    id: 52,
                    date: '2019/04/08',
                    amount: '$15200'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Brena Shivell',
                    position: 'Graphic Designer',
                    office: 'Caen',
                    id: 50,
                    date: '2018/12/14',
                    amount: '$15800'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Carmon Tuiller',
                    position: 'Marketing Assistant',
                    office: 'Jiangbei',
                    id: 46,
                    date: '2019/06/19',
                    amount: '$12800'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Tina Strattan',
                    position: 'Account Representative III',
                    office: 'São Miguel da Carreira',
                    id: 31,
                    date: '2019/07/08',
                    amount: '$13900'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Jon Tarbox',
                    position: 'Senior Cost Accountant',
                    office: 'Ryazhsk',
                    id: 61,
                    date: '2019/02/22',
                    amount: '$16000'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Carmine Hollibone',
                    position: 'Assistant Manager',
                    office: 'Punta del Este',
                    id: 50,
                    date: '2019/04/23',
                    amount: '$15000'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Cora Germann',
                    position: 'Automation Specialist III',
                    office: 'Heshui',
                    id: 47,
                    date: '2019/03/27',
                    amount: '$11300'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Dawna Hillyatt',
                    position: 'Biostatistician I',
                    office: 'Suresnes',
                    id: 37,
                    date: '2018/12/02',
                    amount: '$14800'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Natty Casini',
                    position: 'Senior Developer',
                    office: 'Pucallpa',
                    id: 31,
                    date: '2018/08/19',
                    amount: '$11900'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Vittorio Lauder',
                    position: 'Developer II',
                    office: 'Tønsberg',
                    id: 54,
                    date: '2018/12/10',
                    amount: '$16200'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Chery Cardenas',
                    position: 'Senior Developer',
                    office: 'Santo Tomas',
                    id: 26,
                    date: '2018/12/07',
                    amount: '$11100'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Hilde McFfaden',
                    position: 'Senior Financial Analyst',
                    office: 'Cruz',
                    id: 43,
                    date: '2018/11/05',
                    amount: '$14100'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Siward Kindred',
                    position: 'Office Assistant III',
                    office: 'Béziers',
                    id: 39,
                    date: '2018/09/26',
                    amount: '$15500'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Tamera Caneo',
                    position: 'Executive Secretary',
                    office: 'Hetian',
                    id: 38,
                    date: '2018/09/28',
                    amount: '$12300'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Munmro Rendell',
                    position: 'Marketing Manager',
                    office: 'Castelo',
                    id: 60,
                    date: '2018/11/15',
                    amount: '$12400'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Nerta Eddisforth',
                    position: 'Social Worker',
                    office: 'Al Ḩayfah',
                    id: 33,
                    date: '2018/12/01',
                    amount: '$14900'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Laraine Hamlyn',
                    position: 'Chemical Engineer',
                    office: 'Baška Voda',
                    id: 44,
                    date: '2019/03/25',
                    amount: '$12800'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Timoteo Lyddy',
                    position: 'Recruiting Manager',
                    office: 'Vidago',
                    id: 29,
                    date: '2018/12/04',
                    amount: '$11700'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Cherye Bleby',
                    position: 'Quality Engineer',
                    office: 'La Concordia',
                    id: 62,
                    date: '2018/10/04',
                    amount: '$14700'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Zacharias O\'Shaughnessy',
                    position: 'Senior Editor',
                    office: 'Maungatapere',
                    id: 26,
                    date: '2018/07/30',
                    amount: '$11600'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Odie Jentin',
                    position: 'Programmer II',
                    office: 'Grabovci',
                    id: 26,
                    date: '2019/05/16',
                    amount: '$11200'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Eugenie Sang',
                    position: 'Operator',
                    office: 'Oxbow',
                    id: 59,
                    date: '2019/07/16',
                    amount: '$15200'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Sammy Guyers',
                    position: 'Mechanical Systems Engineer',
                    office: 'Sanhe',
                    id: 53,
                    date: '2019/07/09',
                    amount: '$14200'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Tarah Blick',
                    position: 'Paralegal',
                    office: 'Fylí',
                    id: 23,
                    date: '2018/12/14',
                    amount: '$15200'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Jemie Ormshaw',
                    position: 'Systems Administrator II',
                    office: 'Vila Fria',
                    id: 28,
                    date: '2019/05/15',
                    amount: '$14400'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Gerrie Semeradova',
                    position: 'Research Associate',
                    office: 'Balykchy',
                    id: 26,
                    date: '2018/09/28',
                    amount: '$14900'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Ottilie Mostyn',
                    position: 'Accounting Assistant II',
                    office: 'Eskilstuna',
                    id: 43,
                    date: '2018/08/20',
                    amount: '$11300'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Lombard Crepin',
                    position: 'Project Manager',
                    office: 'Novoul’yanovsk',
                    id: 63,
                    date: '2019/04/28',
                    amount: '$13300'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Fons Sopp',
                    position: 'Structural Analysis Engineer',
                    office: 'Bealanana',
                    id: 47,
                    date: '2019/02/22',
                    amount: '$13300'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Berenice Wildey',
                    position: 'Sales Representative',
                    office: 'Markópoulo Oropoú',
                    id: 49,
                    date: '2018/10/19',
                    amount: '$14700'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Maybelle Cullotey',
                    position: 'Senior Financial Analyst',
                    office: 'Arcos de Valdevez',
                    id: 33,
                    date: '2019/02/06',
                    amount: '$14700'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Mikkel Lingner',
                    position: 'Assistant Media Planner',
                    office: 'Celestynów',
                    id: 32,
                    date: '2018/08/12',
                    amount: '$11400'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Silvano Hartil',
                    position: 'Assistant Manager',
                    office: 'Leles',
                    id: 26,
                    date: '2019/04/30',
                    amount: '$11500'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Maddi Mansell',
                    position: 'Assistant Media Planner',
                    office: 'Doug An',
                    id: 48,
                    date: '2019/05/29',
                    amount: '$14600'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Mohandas Course',
                    position: 'Staff Accountant II',
                    office: 'Wuping',
                    id: 59,
                    date: '2019/07/18',
                    amount: '$12900'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Ericha Clilverd',
                    position: 'Desktop Support Technician',
                    office: 'Conde',
                    id: 37,
                    date: '2018/09/12',
                    amount: '$14400'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Elspeth Leap',
                    position: 'Paralegal',
                    office: 'Hägersten',
                    id: 42,
                    date: '2019/02/15',
                    amount: '$14400'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Sam Chinge',
                    position: 'Assistant Media Planner',
                    office: 'Arai',
                    id: 55,
                    date: '2019/05/26',
                    amount: '$11800'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Judie Hug',
                    position: 'Operator',
                    office: 'Verkhniy Rohachyk',
                    id: 32,
                    date: '2018/11/18',
                    amount: '$11300'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Lulita Espasa',
                    position: 'Operator',
                    office: 'Sabi',
                    id: 59,
                    date: '2019/06/06',
                    amount: '$13600'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Kandy Fulker',
                    position: 'Human Resources Assistant I',
                    office: 'Murowana Goślina',
                    id: 57,
                    date: '2019/05/01',
                    amount: '$13100'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Bradley Gunbie',
                    position: 'Assistant Media Planner',
                    office: 'Bundoran',
                    id: 34,
                    date: '2019/03/16',
                    amount: '$13700'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Katie Proctor',
                    position: 'Quality Engineer',
                    office: 'Qingxi',
                    id: 34,
                    date: '2018/10/14',
                    amount: '$12400'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Lin Gallaccio',
                    position: 'VP Quality Control',
                    office: 'Rongcheng',
                    id: 23,
                    date: '2018/08/27',
                    amount: '$10300'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Christy Ranaghan',
                    position: 'Nurse Practicioner',
                    office: 'Naval',
                    id: 42,
                    date: '2018/11/02',
                    amount: '$15700'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Concordia Varrow',
                    position: 'Environmental Specialist',
                    office: 'Rashaant',
                    id: 48,
                    date: '2018/12/11',
                    amount: '$12500'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Normand Tropman',
                    position: 'Legal Assistant',
                    office: 'Yläne',
                    id: 52,
                    date: '2019/01/21',
                    amount: '$14600'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Oswald Cruikshank',
                    position: 'Help Desk Operator',
                    office: 'Armenia',
                    id: 57,
                    date: '2019/05/16',
                    amount: '$15700'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Debbie Pinchin',
                    position: 'Tax Accountant',
                    office: 'Seara',
                    id: 35,
                    date: '2018/08/29',
                    amount: '$12100'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Wells Dartan',
                    position: 'Financial Analyst',
                    office: 'Bhalwāl',
                    id: 44,
                    date: '2019/03/03',
                    amount: '$10500'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Kelsey Zucker',
                    position: 'Accountant III',
                    office: 'Douz',
                    id: 44,
                    date: '2018/11/09',
                    amount: '$15700'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Lothaire Rubinchik',
                    position: 'Operator',
                    office: 'Paringin',
                    id: 37,
                    date: '2018/07/26',
                    amount: '$13800'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Dmitri Marrow',
                    position: 'Quality Engineer',
                    office: 'Kirzhach',
                    id: 30,
                    date: '2018/11/25',
                    amount: '$13400'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Virgie Bullivant',
                    position: 'Dental Hygienist',
                    office: 'Mungyeong',
                    id: 34,
                    date: '2019/07/16',
                    amount: '$14600'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Simmonds Moughtin',
                    position: 'Programmer III',
                    office: 'Loma',
                    id: 44,
                    date: '2018/10/20',
                    amount: '$13900'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Ralina Bounds',
                    position: 'Associate Professor',
                    office: 'Cacocum',
                    id: 52,
                    date: '2019/05/12',
                    amount: '$11400'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Bettye Hearons',
                    position: 'Food Chemist',
                    office: 'Guayabetal',
                    id: 30,
                    date: '2018/12/29',
                    amount: '$16000'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Cortie Andreacci',
                    position: 'Assistant Manager',
                    office: 'Yongheshi',
                    id: 33,
                    date: '2018/11/23',
                    amount: '$11200'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Frederic Fozard',
                    position: 'Occupational Therapist',
                    office: 'Wierzbica',
                    id: 29,
                    date: '2019/02/14',
                    amount: '$10500'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Carissa Simeoni',
                    position: 'Developer II',
                    office: 'Huansheng',
                    id: 29,
                    date: '2019/05/21',
                    amount: '$13100'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Ruperto Humblestone',
                    position: 'Clinical Specialist',
                    office: 'Zubūbah',
                    id: 31,
                    date: '2019/07/01',
                    amount: '$13200'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Leontine Sailes',
                    position: 'Quality Control Specialist',
                    office: 'Novocherkassk',
                    id: 33,
                    date: '2018/11/28',
                    amount: '$11800'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Lanny Cregeen',
                    position: 'Programmer I',
                    office: 'Abbeville',
                    id: 60,
                    date: '2018/09/26',
                    amount: '$15400'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Linus Flucker',
                    position: 'Help Desk Operator',
                    office: 'Libofshë',
                    id: 37,
                    date: '2019/03/02',
                    amount: '$10300'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Edd Valentin',
                    position: 'Associate Professor',
                    office: 'Vila Chã do Monte',
                    id: 42,
                    date: '2018/08/26',
                    amount: '$14000'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Rafaela Kingsworth',
                    position: 'Senior Sales Associate',
                    office: 'Penco',
                    id: 41,
                    date: '2019/05/26',
                    amount: '$14800'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Helge Cutajar',
                    position: 'Associate Professor',
                    office: 'Wololele A',
                    id: 42,
                    date: '2019/03/13',
                    amount: '$15000'
                }, {
                    stt: 1,
                    account: 'iop',
                    status: 'Online',
                    event: 'Nguồn sự kiện',
                    name: 'Dusty Abethell',
                    position: 'Mechanical Systems Engineer',
                    office: 'Bodø',
                    id: 36,
                    date: '2018/08/30',
                    amount: '$15300'
                }
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 25, 50, 100],
            optionsEventSource: [
                "Tapping",
                "Leather",
                "Notifications",
                "Sizes",
                "Different Color",
            ],
            optionsEventType: [
                "Call",
                "SMS",
                "Notifications",
                "Sizes",
                "Different Color",
            ],
            optionsEventInfo: [
                "Loại cuộc gọi",
                "Leather",
                "Notifications",
                "Sizes",
                "Different Color",
            ],
            optionsEvent: [
                "Loại cuộc gọi 'normal call clearing' - cuộc gọi thành công",
                "Leather",
                "Notifications",
                "Sizes",
                "Different Color",
            ],
        }
    },
    computed: {
        /**
         * Total no. of records
         */
        rows() {
            return this.tableData.length;
        }
    },
    methods: {
        handleDelete(val) {
            alert('Xóa thành công Event: ' + val);
        },
    }
}
</script>

<style scoped>

</style>
