<template>
    <div class="manage-container">
        <div class="user-info">
            <div class="info-item" v-for="(item,index) in userInfo" :class="`item-${index}`">
                <div class="info-head">{{ item.label }}</div>
                <div class="info-content">{{ item.value }}</div>
            </div>
        </div>
        <div class="table-part">
            <div class="option-wrap">
                <el-button @click="agreeSelectData">通过所选</el-button>
                <el-button @click="defuseSelectData">拒绝所选</el-button>
                <el-button @click="defuseUser(userId)">拒绝账户</el-button>
                <el-button @click="shelveUser(userId)">搁置</el-button>
                <el-button @click="nextMission()">下一个任务</el-button>
            </div>
            <div class="table-wrap">
                <Table 
                    :columns="columns"
                    :header-cell-style="{background:'#f7f7f7','line-hight':'50px'}"
                    height = "700px"
                    :data="tableData"
                    :loading="loading"
                    :span-method="spanMethod"
                    @selection-change="selectionChange"
                >
                    <template #selection>
                        <el-table-column type="selection"  width="50"/> >
                    </template>
                    <template #description>
                        <el-table-column label="描述" >
                            <template #default="{ row }">
                                <div>{{ row.description }}</div>
                            </template>
                        </el-table-column>
                    </template>
                    <template #image>
                        <el-table-column label="图片" width="200">
                            <template #default="{ row }">
                                <div class="image"><img :src="row.image" alt=""></div>
                            </template>
                        </el-table-column>
                    </template>
                    <template #optionsA>
                        <el-table-column label="操作" width="250">
                            <template #default="{ row }">
                                <div class="options">
                                    <span @click="agreeCurCdItemData(row.adItemId)">同意</span>
                                    <span @click="refuseCurCdItemData(row.adItemId)">拒绝</span>
                                </div>
                            </template>
                        </el-table-column>
                    </template>
                    <template #page>
                        <el-table-column label="落地页" >
                            <template #default="{ row }">
                                <div class="pageImage"><img :src="row.pageImage" alt=""></div>
                            </template>
                        </el-table-column>
                    </template>
                    <template #optionsB>
                        <el-table-column label="操作" width="250">
                            <template #default="{ row }">
                                <div class="options">
                                    <span @click="agreeCurCdData(row.adId)">同意 </span>
                                    <span @click="refuseCurCdData(row.adId)">拒绝</span>
                                </div>
                            </template>
                        </el-table-column>
                    </template>
                </Table>
            </div>
        </div>
    </div>
</template>
<script setup>
import { getAuditUserInfoApi,getAuditAdDataApi } from "@/api/auditManage.js"
import { ref,reactive ,onMounted,watch } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import Table from '../components/Table.vue';

const route = useRoute()
const router = useRouter()
const userId = ref(0)




onMounted(() => {
    console.log(route.query);
    userId.value = Number(route.query.id)
    getAuditUserInfo(userId.value)
    getAuditAdData(userId.value)
})

watch(()=>route.query.id,(newVal,oldVal)=>{
    console.log("变化了",newVal,oldVal);
    getAuditUserInfo(userId.value)
    getAuditAdData(userId.value)
})

//用户基础数据
const userInfo = reactive([
{field:'userName',label:"用户名称",value:''},
{field:'id',label:"用户id",value:''},
{field:'website',label:"公司网站",value:''},
{field:'qualification',label:"资质",value:''},
{field:'industryClassA',label:"一级行业",value:''},
{field:'industryClassB',label:"二级行业",value:''},
{field:'userType',label:"用户类型",value:''},
{field:'notes',label:"批注",value:''},
])
const getAuditUserInfo = async function(id){
    const res = await getAuditUserInfoApi(id)
    if(res.error === 0){
        console.log(res.content);
        userInfo.forEach(item=>{
            item.value = res.content[item.field]
        })
    }
    console.log(userInfo);
}




//表格头部
const columns = [
    {
        slot:"selection"
    },
    {
      prop: 'title',
      label: '标题',
      align: 'left',
      resizable: false,
    },
    {
      slot: 'description',
    },
    {
      slot: 'image',
    },
    {
      slot: 'optionsA',
    },
    {
      slot: 'page',
    },
    {
      slot: 'optionsB',
    },
]
//表格合并
const spanMethod = function({row,column,rowIndex,columnIndex,}){
   if([5,6].includes(columnIndex)){
    if(row.spanNum !== 1){
        return [row.spanNum,1]
    } else{
        return [0,0]
   }
   }
}


//表格数据
const tableData = ref([])
const getAuditAdData = async function(id){
    const res = await getAuditAdDataApi(id)
    if(res.error===0){
        let len = res.content[0].adList.length
        tableData.value = res.content[0].adList.map((item,index)=>{
            if(index === 0){
                item['spanNum'] = len
            }else{
                item['spanNum'] = 1
            }

            return item
        })
        
    }
}

//选数据操作
const selectData = ref([])
const selectionChange = function(selection){
    selectData.value = selection
    console.log("111",selectData.value);
}


// 表格操作
const agreeSelectData = function(){
    if(selectData.value.length === 0){
        ElMessage({
            message: '请选择数据',
            type: 'warning',
        })
        return
    }
    const ids = selectData.value.map(item=>{
        return item.adItemId
    })
    console.log(ids);
    ElMessageBox.alert(`params:{ adIds:${JSON.stringify(ids)} }`, 'Title', {
        confirmButtonText: 'OK',
    })
}

const defuseSelectData = function(){
    if(selectData.value.length === 0){
        ElMessage({
            message: '请选择数据',
            type: 'warning',
        })
        return
    }
    const ids = selectData.value.map(item=>{
        return item.adItemId
    })
    console.log(ids);
    ElMessageBox.alert(`params:{ adIds:${JSON.stringify(ids)} }`, 'Title', {
        confirmButtonText: 'OK',
    })
}


const defuseUser = function(id){
    ElMessageBox.confirm(
    '确定要拒绝该账户吗？',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
        ElMessageBox.alert(`params:{ adIds:${id} }`, 'Title', {
             confirmButtonText: 'OK',
        })
    })

}


const shelveUser = function(id){
    ElMessageBox.confirm(
    '确定要搁置该账户吗？',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
        nextMission()
    })

}

const nextMission = function(){
    const nextId = geNextUserId()
    router.replace({
      name:'auditManage',
      query:{
        id:nextId
      }
    })

}

const geNextUserId = function(){
    return parseInt((Math.random()*100)+1)
}

const agreeCurCdItemData = function(id){
    ElMessageBox.alert(`params:{ adItemId:${id} }`, 'Title', {
        confirmButtonText: 'OK',
    })
}
const refuseCurCdItemData = function(id){
    ElMessageBox.alert(`params:{ adItemId:${id} }`, 'Title', {
        confirmButtonText: 'OK',
    })
}


const agreeCurCdData = function(id){
    ElMessageBox.alert(`params:{ adId:${id} }`, 'Title', {
        confirmButtonText: 'OK',
    })
}
const refuseCurCdData = function(id){
    ElMessageBox.alert(`params:{ adId:${id} }`, 'Title', {
        confirmButtonText: 'OK',
    })
}


</script>
<style lang="scss" scoped>
.manage-container{
    position: absolute;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    min-width: 1370px
    
}
.user-info{
    display: grid;
    min-width: 1370px;
    grid-template-columns: repeat(3,minmax(100px,1fr));
    justify-content: center;
    background-color: #ffffff;
    .info-item{
        height: 40px;
        border: 1px solid rgb(175, 175, 175);
        // background-color: aquamarine;
        line-height: 40px;
        display: inline-grid;
        grid-template-columns: 100px auto;
        .info-head{
            box-sizing: border-box;
            padding-left: 10px;
            width: 100px;
        }
        .info-content{
            text-align: center;
            border-left: 1px solid rgb(175, 175, 175);
        }
    }
    .item-1,.item-4{
        border-left:0;
        border-right: 0;
    }
    .item-3,.item-4,.item-5{
        border-top: 0;
        border-bottom: 0;
    }
    .item-7{
        border-left: 0;
        grid-column-start: span 2;
    }
}
.table-part{
    background-color: #ffffff;
    padding: 10px;
    box-sizing: border-box;
    overflow: hidden;
    height: calc(100% - 124px);
    margin-top: 10px;
    .option-wrap{
        margin:10px;
    }
    .table-wrap{
        .image{
            
            img{
                width: 100px;
                height: 100px;
                display: flex;
                margin: 0 auto;
            }
        }
        .pageImage{
            img{
                width:250px;
                height: 500px;
                display: flex;
                margin: 0 auto;
            }
        }
    }
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
}
</style>