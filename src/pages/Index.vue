<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {showToast} from "vant/es";
import myAxios from "../plugins/myAxios.ts";
import qs from 'qs';
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const {tags} = route.query;

const userList = ref([]);

onMounted(async () => {
  // 在 node.js 用GET请求获取远程图片
  const userListData = await myAxios.get('/user/recommend', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false });
    },
  })
      .then(function (response: any) {
        console.log("/user/recommend success",response);
        return response?.data;
      })
      .catch(function (error: any) {
        console.log("/user/recommend failed", error);
        showToast("请求失败");
      });
  console.log(userListData)
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
})
</script>

<template>
  <user-card-list :user-list="userList"/>
  <van-empty v-if="!userList || userList.length < 1" description="数据为空" />
</template>

<style scoped>

</style>