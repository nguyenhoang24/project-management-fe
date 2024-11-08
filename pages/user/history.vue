<script>
export default {
    name: "user-history",
    methods: {
        userHisSearch(){

        }
    }
}
</script>

<style scoped>

</style>

<template>
    <div class="row">
        <div class="card">
            <div class="card-header">
                <div class="row" style="float: right">


                </div>
            </div>
            <div class="card-body">
                <div class="row">

                    <div class="col-2">
                        <label>Từ ngày</label>
                        <input type="date" value="2019-08-19" class="form-control form-control-sm"/>
                    </div>
                    <div class="col-2">
                        <label>Đến ngày</label>
                        <input type="date" value="2019-08-19" class="form-control form-control-sm"/>
                    </div>
                    <div class="col-2">
                        <label>Tài khoản</label>
                        <input type="text" class="form-control form-control-sm"/>
                    </div>
                    <div class="col-2">
                        <label>&ensp;</label>
                        <button type="button" @click="userHisSearch" class="btn btn-sm btn-primary d-block"><i class="uil uil-search me-2"></i> Tìm kiếm</button>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-striped mb-0">
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tài khoản</th>
                            <th>Tên sự kiện</th>
                            <th>Thông tin sự kiện</th>
                            <th>Thời gian</th>
                            <th>IP</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Admin</td>
                            <td>Tạo tài khoản</td>
                            <td>Tạo tài khoản: report</td>
                            <td>06/10/2022</td>
                            <td>192.168.10.22</td>

                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
</template>


