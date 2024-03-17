import myAxios from "../plugins/myAxios.ts";
import {setCurrentUserState} from "../states/user.ts";

export const getCurrentUser = async () => {
    // const currentUser = getCurrentUserState();
    // if (currentUser) {
    //     return currentUser;
    // }
    // 如果用户不存在，就去获取用户
    const res = await myAxios.get("/user/current");
    if (res.code === 0) {
        setCurrentUserState(res.data);
        return res.data;
    }
    return null;
}
