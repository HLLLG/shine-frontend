<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showToast} from "vant/es";

const route = useRoute();
const router = useRouter();

const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue,
})

const onSubmit = async () => {
  const res = await myAxios.post("/user/update", {
    'id': 1,
    [editUser.value.editKey as String]: editUser.value.currentValue,
  })
  console.log(res, "更新请求");
  if (res.code == 0 && res.data > 0) {
    showToast("修改成功");
    router().back();
  } else {
    showToast("修改失败");
  }
}
</script>

<template>
  <van-form @submit="onSubmit">
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="'请输入' + editUser.editName"
      />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>