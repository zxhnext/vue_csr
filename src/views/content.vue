<template>
    <div class="select">
        <div class="box" v-for="(item,index) of result" :key="item.user_id">
            <div class="line small">{{item.id}}</div>
            <div class="line small">{{item.user_id}}</div>
            <div class="line small">{{item.name}}</div>
            <div class="line small">{{item.sex}}</div>
            <div class="line small">{{item.age}}</div>
            <div class="line small" v-if="index != 0">聊天</div>
            <div class="line small" v-if="index == 0"></div> 
            <div class="line small" v-if="index != 0">编辑</div>
            <div class="line small" v-if="index == 0"></div> 
            <div class="line small" v-if="index != 0">删除</div>                  
        </div>
        <Button>呜呜呜</Button>
    </div>
</template>
<script>
// const chatState = {
//     1: '无意向',
//     2: '有意向',
//     3: '待沟通',
//     4: '已成单'
// }
const sex = {
    1: '男',
    2: '女'
}
const header = {
    id: "uuid",
    user_id: "用户id",
    name: "姓名",
    sex: "姓名",
    age: "年龄"
}
export default {
    name: "Address",
    components:{
    },
    data() {
        return{
            result: []
        }
    },
    mounted() {
        let data = {
                name: "张六",
                sex: 1,
                age: 29,
                user_id: 1078
            }
        fetch('/search/userinfo')
            .then(response => response.json())
            .then(res => {
                res.forEach((item, index) => {
                    item.sex = sex[item.sex]
                })
                res.unshift(header)
                this.result = res
            });
        fetch('/set/chatinfo',{
            method: 'post',
            body: JSON.stringify(data),
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(res => {
                // console.log("res", res)
            });
    }
}
</script>
<style scoped>
    .select {
        width: 90%;
        margin: 30px auto;
    }
    .box{
        height: 28px;
        line-height: 28px;
        font-size: 16px;
        display: flex;
        justify-content: space-between;
        border: 1px solid #fff;
    }
    .line{
        overflow: hidden;
        text-align: center;
        box-sizing: border-box;
        padding: 0 5px;
    }
    .small{
        width: 5%;
    }
    .medium{
        width: 10%;
    }
    .large{
        width: 20%;
    }
</style>