<template>
    <div class="box">
        <!-- <span class="span">3333</span> -->
        <a-date-picker @change="onChange" />
        <br />
        <a-month-picker @change="onChange" placeholder="Select month" />
        <br />
        <a-range-picker @change="onChange" />
        <br />
        <a-week-picker @change="onChange" placeholder="Select week" />
        <a-button type="primary">Primary</a-button>
    </div>
</template>
<script>
export default {
    name: "Address",
    components:{
        
    },
    data() {
        return{

        }
    }
}
</script>
<style  scoped>
    .box {
        
    }
    
</style>