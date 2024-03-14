<script setup lang="ts">
import {useRouter} from "vue-router";

const user = {
  id: 1,
  username: 'hlllg',
  userAccount: 'hl',
  gender:'男',
  avatarUrl: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.j35djiStmSnPwWJMmoQH-gHaJ-?w=208&h=281&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  phone: '231',
  email: '312',
  userRole: 'number',
  planetCode: '1312',
  createTime: new Date(),
}

const router = useRouter();


const toEdit = (editKey: String, editName: String, currentValue: String) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}
</script>

<template>
  <van-cell title="用户名" is-link to="/user/edit"/>
  <van-cell title="账号" is-link to="/user/edit" value="内容" />
  <van-cell title="头像" is-link to="/user/edit" :value="user.avatarUrl" >
    <img height="48px" :src="user.avatarUrl">
  </van-cell>
  <van-cell title="性别" is-link :value="user.gender" @click="toEdit('gender', '性别', user.gender)"/>
  <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone', '电话', user.phone)"/>
  <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" />
  <van-cell title="星球编号" :value="user.planetCode"/>
  <van-cell title="注册时间" :value="user.createTime.toISOString()"/>
</template>

<style scoped>

</style>