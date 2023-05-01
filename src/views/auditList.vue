<template>
    <div class="search-part">
      <div class="search-form">
        <el-form
          ref="searchFormRef"
          :model="searchForm"
          :inline="true"
          label-width="70px"
        >
          <el-form-item
            label="用户名"
            prop="userName"
          >
            <el-input
              v-model="searchForm.userName"
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item
            label="产品线"
            prop="productLine"
          >
            <el-select
              v-model="searchForm.productLine"
              placeholder="请选择产品线"
            >
              <el-option
                v-for="item in productInfo"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="行业"
            prop="industry"
          >
            <el-select
              v-model="searchForm.industry"
              placeholder="请选择行业"
            >
              <el-option
                v-for="item in industryInfo"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>

          <el-form-item
            label="创建任务时间"
            label-width="98px"
            prop="createTime"
          >
          <el-date-picker
              v-model="searchForm.createTime"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width:265px"
            />
          </el-form-item>
          
        </el-form>
      </div>
      <div class="search-button">
        <div>
          <el-button @click="resetForm(searchFormRef)">
            重置
          </el-button>
          <el-button
            type="primary"
            color="#3370FF"
            @click="getAuditList"
          >
            查询
          </el-button>
        </div>
      </div>
    </div>
    <div class="table-part">
        <Table 
            :columns="columns"
            :header-cell-style="{background:'#f7f7f7','line-hight':'50px'}"
            height = "700px"
            :data="tableData"
            :loading="loading"
        >
            <template #productLineId>
                <el-table-column label="产品线" >
                    <template #default="{ row }">
                        <div>{{ convert(productInfo,row.productLineId) }}</div>
                    </template>
                </el-table-column>
            </template>
            <template #industryId>
                <el-table-column label="行业" >
                    <template #default="{ row }">
                        <div>{{ convert(industryInfo,row.productLineId) }}</div>
                    </template>
                </el-table-column>
            </template>
            <template #options>
                <el-table-column label="操作" width="250">
                    <template #default="{ row }">
                        <div class="options">
                            <span @click="auditUserData(row.id)">审核</span>
                            <span @click="deleteTableData(row.id)">删除</span>
                        </div>
                    </template>
                </el-table-column>
            </template>
        </Table>
        <div class="pagination">
            <Pagination
            :current-page="currentPage"
            :page-size="pageRows"
            :total="total"
            @onSizeChange="handleSizeChange"
            @onCurrentChange="handleCurrentChange"
            />
        </div>
    </div>
  </template>
  
<script setup>
import { getAuditListApi,deleteTableDateApi } from '../api/auditList'
import Table from '../components/Table.vue';
import Pagination from '../components/Pagination.vue';
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 搜索
const searchFormRef = ref()
const searchForm = reactive({
    userName: '',
    productLine:'',
    industry:'',
    createTime:[]
})

const industryInfo = [
    {name:'互联网', id:1},
    {name:'餐饮', id:2},
    {name:'服装', id:3},
    {name:'体育', id:4},
    {name:'艺术', id:5},
]
const productInfo = [
    {name:'小说', id:1},
    {name:'地图', id:2},
    {name:'AI', id:3},
    {name:'广告', id:4},
    {name:'中台', id:5},
]

const resetForm = (formEl) => {
    if (!formEl) {
        return
    }
    formEl.resetFields()
    getAuditList()
}
  

const columns = [
    {
      prop: 'userName',
      label: '用户名',
      align: 'left',
      resizable: false,
    },
    {
      slot: 'productLineId',
    },
    {
      slot: 'industryId',
    },
    {
      prop: 'createTime',
      label: '创建时间',
      align: 'left',
      resizable: false,
    },
    {
      slot: 'options',
    },
  ]


const loading = ref(false)
const tableData = ref([])
const getAuditList = async() => {
    const data = {
        userName: searchForm.userName,
        productLine:searchForm.productLine,
        industry:searchForm.industry,
        createTime:searchForm.createTime,
        currentPage: currentPage.value,
        pageRows:pageRows.value
    }
    loading.value = true
    const res = await getAuditListApi(data)
    loading.value = false
    console.log(res);
    if(res.error === 0){
        tableData.value = res.content.dataList
        total.value = res.content.page.total
    }

}

//映射转换
const convert = function(arr, id ) {
   const idx =  arr.findIndex(item=>{
        return item.id === id
    })
    return arr[idx].name
}
  
//页面page
const currentPage = ref(1)
const pageRows = ref(10)
const total = ref(0)

const handleSizeChange = (val) => {
    pageRows.value = val
    currentPage.value = 1
    getAuditList()
}
const handleCurrentChange = (val) => {
    currentPage.value = val
    getAuditList()
}

//操作表格
const deleteTableData = async(id)=> {
    const res = await deleteTableDateApi(id)
    const status = 1
    if(res.error !== 0) status = 0
    ElMessage({
        message: status === 1?'删除成功':'删除失败',
        type: status === 1?'success':'error',
    })
    getAuditList()
}

const auditUserData = function(id){
    router.push({
      name:'auditManage',
      query:{
        id:id
      }
    })
}
  

onMounted(()=>{
    getAuditList()
})
  </script>
  <style lang="scss" scoped>
  .search-part{
    display: flex;
    box-sizing: border-box;
    min-width: 1370px;
    background-color: #ffffff;
    margin-bottom: 16px;
    border-radius: 4px;
    padding: 16px 16px 0px;
    >div{
      display: inline-block;
    }
    &:deep(.search-form){
      min-width: 1125px;
      height: 100%;
      .el-input{
        width: 240px;
      }
    //   .el-select .el-input{
    //     width: 120px;
    //   }
      .el-form--inline .el-form-item{
        margin-right: 64px;
      }
      .el-form-item:nth-child(5),
      .el-form-item:nth-child(6),
      .el-form-item:nth-child(7){
          margin-right: 43px;
      }
    }
    .search-button{
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      flex: none;
      width: 215px;
    }
  }
  .table-part{
    box-sizing: border-box;
    min-width: 1370px;
    background-color: #ffffff;
    border-radius: 4px;
    padding: 14px 16px 14px 16px;
    .options{
        color: blue;
        text-align: center;
        >span{
            cursor: pointer;
        }
        span:first-child{
            margin-right: 20px;
        }
    }
    .pagination{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 10px;
        background-color: #ffffff;
        margin-top: 10px;
    }
  }
  </style>
  