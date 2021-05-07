<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :rules="loginFormRules"
        v-bind:model="loginForm"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入账号"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: "yuebihua",
        password: "123456",
      },
      //   这是表单验证规则对象
      loginFormRules: {
        username: [
          { required: true, message: "请输入登录账号", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 重置按钮
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        // this是个vue组件对象，它的原型是Vue，再原型是Object
        // console.log(this);
        // await简化promise对象
        const { data: res } = await this.$http({
          // 发送请求
          method: "get",
          url: "http://localhost:3000/user",
        });
        // console.log(res);
        // 将token保存在window对象中的sessionStorage中
        // sessionStorage.setItem("token", res.data.token);
        // 登录成功后跳转页面
        this.$router.push("/home");
        // 这里关于数据库的操作先省去，直接进入
        return this.$message.success("登录成功!");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  position: relative;
  width: 450px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 3%;
  .avatar_box {
    border: 1px solid #666565;
    border-radius: 50%;
    padding: 10px;
    position: absolute;
    left: 160px;
    top: -65px;
    background-color: #ffffff;
    height: 130px;
    width: 130px;
    img {
      width: 100%;
      height: 100%;
      background-color: #414242;
      border-radius: 50%;
    }
  }
}
.btns {
  display: flex;
  justify-content: center;
}
.login_form {
  position: absolute;
  left: 5%;
  bottom: 0;
  width: 90%;
}
</style>