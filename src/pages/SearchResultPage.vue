<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {showToast} from "vant/es";
import myAxios from "../plugins/myAxios.js";
import qs from 'qs';

const route = useRoute();
const {tags} = route.query;

const userList = ref([]);

onMounted(async () => {
  // 在 node.js 用GET请求获取远程图片
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: function (params: any) {
      return qs.stringify(params, { indices: false });
    },
  })
      .then(function (response: any) {
        console.log("user/search/tags success",response);
        showToast("请求成功");
        return response.data?.data;
      })
      .catch(function (error: any) {
        console.log("user/search/tags failed", error);
        showToast("请求失败");
      });
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
  <van-card
      v-for="user in userList"
      :desc="user.profile"
      :title="`${user.username} (${user.planetCode})`"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px">
        {{tag}}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空" />
</template>

<style scoped>

</style>