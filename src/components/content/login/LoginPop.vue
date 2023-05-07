<template>
  <div class="login-pop">
    <!-- 关闭按钮 -->
    <div class="close" @click="closeLogin">
      <span class="iconfont icon-guanbi1"></span>
    </div>

    <!-- 手机号登录 -->
    <div class="phone-login" v-if="loginWay === 0">
      <h2 style="margin-bottom: 20px;">手机号登录</h2>
      <!-- logo -->
      <!-- <div class="imgs">
        <span class="iconfont icon-tel"></span>
      </div> -->
      <!-- 表单 -->
      <div class="form">
        <el-form label-width="70px">
          <el-form-item label="手机号">
            <el-input type="tlephone" v-model="PhoneNum" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="Password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="phoneLogin">登录</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="changeLoginWay(2)">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="other-way" @click="changeLoginWay(1)" style="margin-top: 50px; padding-left: 25px">
        <span><i class="iconfont icon-erweima1"></i> <i class="text">扫码登录</i> </span>
      </div>
    </div>

    <!-- 扫码登录 -->
    <div class="qr-login" v-if="loginWay === 1">
      <div class="qr">
        <h2 v-if="!scanQr">扫码登录</h2>
        <img :src="qrurl" alt="" v-if="!scanQr" />
        <p class="failqr" style="margin-top: 131px;" v-if="failqr">
          二维码已失效，<span @click="qrLogin">点击刷新</span>
        </p>
        <h3 class="text" style="margin-top: 131px;" v-if="scanQr & !failqr">扫描成功，请在手机上确认登录</h3>
        <!-- 其他登录方式 -->
        <div class="footer">
          <div class="other-way" @click="changeLoginWay(0)">
            <span>
              <i class="iconfont icon-tel"></i>
              <i style="color: #409eff;"> 手机号登录</i></span
            >
          </div>
          <div class="other-way" style="padding-top: 10px" @click="changeLoginWay(2)">
            <span style="color: #409eff;">还没有账号，去注册</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 注册新用户 -->
    <div class="register" v-show="loginWay === 2">
      <h2>注册新用户</h2>
      <div class="reg-form">
        <el-form label-position="right" label-width="80px" :model="ruleForm" :rules="rules" ref="from">
          <el-form-item label="手机号" prop="phone">
            <el-input type="telphone" v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              placeholder="密码为8~20位，必须包含字母数字"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" placeholder="请确认密码"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input type="text" v-model="ruleForm.nickname" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="captcha" class="captcha-input">
            <el-input v-model.number="ruleForm.captcha" placeholder="请输入验证码"></el-input>
            <div class="captcha-btn" @click="getCaptcha" v-if="!isGetCaptcha">获取验证码</div>
            <div class="captcha" v-else>{{ tip }}</div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register()">注册</el-button>
            <el-button @click="changeLoginWay(0)">返回登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- <div class="reg-btns">
        <div class="reg-btn">
          <el-button type="primary" @click="register('ruleForm')">注册</el-button>
        </div>
        <div class="reg-btn">
          <el-button @click="changeLoginWay(0)">返回登录</el-button>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import {
  login,
  getQrKey,
  getLoginQr,
  checkLoginQr,
  getUserAccount,
  getAuthcode,
  checkAuthcode,
  register,
  checkPhoneNum,
} from "network/login/login";
import { getUserSonglist, getUserDetail } from "network/userdetail/userdetail";
import { getLikSongList } from "network/playmusic/playmusic.js";
import { isPhone, throttle } from "common/utils.js";
export default {
  name: "LoginPop",
  data() {
    //注册表单验证规则
    var validatePhone = (rule, value, callback) => {
      if (!isPhone(value)) {
        callback(new Error("手机号格式不正确"));
      }
      callback();
    };
    // var validatePass = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入密码"));
    //   } else {
    //     if (this.ruleForm.checkPass !== "") {
    //       this.$refs.ruleForm.validateField("checkPass");
    //     }
    //     callback();
    //   }
    // };
    // var validatePass2 = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请再次输入密码"));
    //   } else if (value !== this.ruleForm.pass) {
    //     callback(new Error("两次输入密码不一致!"));
    //   } else {
    //     callback();
    //   }
    // };
    // var validateName = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入昵称"));
    //   }
    //   callback();
    // };
    // var validateCaptcha = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入验证码"));
    //   }
    //   callback();
    // };
    const samePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      PhoneNum: "", //登录手机号
      Password: "", //登录密码
      loginWay: 1, //登录方式
      qrurl: "", //二维码路径
      timer: "", //轮询二维码的定时器
      failqr: false, //控制二维码失效显示文本
      scanQr: false,
      isGetCaptcha: false, //是否获取验证码
      tip: "", //获取验证码后的文字提示
      ruleForm: {
        phone: "", //注册手机号
        pass: "", //注册密码
        checkPass: "", //验证密码
        nickname: "", //昵称
        captcha: "", //验证码
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: validatePhone, message: "请输入正确的手机号", trigger: "blur" },
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/,
            message: "密码必须是8-20位，包含字母数字",
            trigger: "blur",
          },
        ],
        checkPass: [{ validator: samePwd, trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        captcha: [
          { required: true, message: "请输入验证码" },
          { type: "number", message: "年龄必须为数字值" },
        ],
      },
    };
  },
  created() {
    this.qrLogin();
  },
  methods: {
    // 关闭登录框
    closeLogin() {
      this.$emit("closeLogin");
      clearInterval(this.timer);
    },
    // 切换登录方式
    changeLoginWay(way) {
      this.loginWay = way;
      // 如果是手机号登录就清除二维码登录的定时器
      if (way !== 1) {
        clearInterval(this.timer);
        if (way === 0) {
          this.$refs.from.resetFields(); //重置注册表单
        }
      }
      // 二维码登录
      else if (way === 1) {
        this.qrLogin();
      }
    },

    // 二维码登录
    async qrLogin() {
      this.scanQr = false;
      // 获取二维码key
      let res = await getQrKey();
      let key = res.data.data.unikey;

      // 生成二维码
      let res2 = await getLoginQr(key);
      this.qrurl = res2.data.data.qrimg;
      // 检查二维码状态（利用定时器不断轮询）
      this.timer = setInterval(async () => {
        let statusRes = await checkLoginQr(key);
        console.log(statusRes.data);
        if (statusRes.data.code === 800) {
          this.$message({
            showClose: true,
            message: "二维码已失效",
            type: "error",
            center: true,
          });
          clearInterval(this.timer);
          // 用于显示二维码失效后的文本提示，
          this.failqr = true;
        }
        if (statusRes.data.code === 802) {
          this.scanQr = true;
        }
        if (statusRes.data.code === 803) {
          clearInterval(this.timer);
          this.$message({
            showClose: true,
            message: "登录成功",
            type: "success",
            center: true,
          });
          // 获取用户账户信息
          this.getUserLoginAccount();
        }
      }, 2000);
    },
    // 二维码登录 获取用户登录后的账户信息
    getUserLoginAccount() {
      getUserAccount().then((res1) => {
        console.log(res1);
        let uid = res1.data.account.id;
        // 获取用户个人信息
        getUserDetail(uid).then((res) => {
          console.log(res);
          this.loginSuccess(res);
        });
      });
    },

    // 手机号登录事件
    phoneLogin() {
      if (this.PhoneNum.trim() === "" || this.Password === "") {
        this.$message({
          message: "手机号或密码不能为空",
          type: "warning",
          center: true,
        });
        return;
      } else {
        login(this.PhoneNum, this.Password)
          .then((res) => {
            if (res.data.code === 200) {
              this.$message({
                showClose: true,
                message: "登录成功",
                type: "success",
                center: true,
              });
              // 登录成功后的一些操作
              this.loginSuccess(res);
            } else if (res.data.code === 502) {
              this.$message({
                message: "密码错误",
                type: "warning",
                center: true,
              });
            } else {
              this.$message({
                message: "手机号或密码错误",
                type: "warning",
                center: true,
              });
            }
          })
          .catch((err) => {
            this.$message({
              message: "账号不存在",
              type: "warning",
              center: true,
            });
          });
      }
    },

    // 登录成功后的一些操作
    loginSuccess(res) {
      // 关闭登录框
      this.closeLogin();
      // 更新登录状态
      this.$store.dispatch("updateLogin", true); //isLogin
      this.setItem("isLogin", true);
      //缓存用户信息 防止刷新消失
      // 提交vuex 保存用户信息
      this.setItem("userInfo", res.data.profile);
      this.$store.dispatch("saveUserInfo", res.data.profile);
      // 获取用户歌单数据
      this.getUserSonglistBy(res.data.profile.userId);
    },

    // 获取用户歌单和喜欢的音乐数据
    getUserSonglistBy(uid) {
      getUserSonglist(uid).then((res) => {
        this.setItem("userSongList", res.data.playlist);
        this.$store.dispatch("saveUserSongList", res.data.playlist);
      });
      getLikSongList(uid).then((res) => {
        if (res.data.ids.length != 0) {
          this.$store.dispatch("saveLikeSongIds", res.data.ids);
        }
      });
    },

    // 点击获取验证码
    getCaptcha() {
      // 检测手机号码是否输入
      if (this.ruleForm.phone.trim() === "") {
        this.$message({
          showClose: true,
          message: "请先输入手机号",
          type: "warning",
          center: true,
        });
      } else {
        // 检测手机号是否注册
        checkPhoneNum(this.ruleForm.phone).then((res) => {
          if (res.data.exist === 1) {
            this.$message({
              showClose: true,
              message: "该手机号已注册",
              type: "warning",
              center: true,
            });
          } else {
            // 获取验证码
            getAuthcode(this.ruleForm.phone).then((res) => {
              switch (res.data.code) {
                case 200:
                  this.$message({
                    showClose: true,
                    message: "验证码已发送",
                    type: "success",
                    center: true,
                  });
                  this.isGetCaptcha = true;
                  let count = 60;
                  this.tip = `请${count}秒后再获取`;
                  let timerC = setInterval(() => {
                    count--;
                    this.tip = `请${count}秒后再获取`;
                    if (count === 0) {
                      this.isGetCaptcha = false;
                      clearInterval(timerC);
                    }
                  }, 1000);
                  break;
                case 400:
                  this.$message({
                    showClose: true,
                    message: "发送验证码超过限制:每个手机号一天只能发5条验证码",
                    type: "warning",
                    center: true,
                  });
                  break;
                case 405:
                  this.$message({
                    showClose: true,
                    message: "发送验证码间隔过短",
                    type: "warning",
                    center: true,
                  });
                  break;
                default:
                  this.$message({
                    showClose: true,
                    message: "手机号不符合规范",
                    type: "warning",
                    center: true,
                  });
                  break;
              }
            });
          }
        });
      }
    },

    //点击注册按钮事件
    register() {
      this.$refs.from.validate((valid) => {
        if (valid) {
          // 检查验证码
          alert("sss");
          checkAuthcode(this.ruleForm.phone, this.ruleForm.captcha)
            .then((res) => {
              console.log(res);
              // 注册
              if (res.data.code == 200) {
                register(
                  this.ruleForm.phone,
                  this.ruleForm.captcha,
                  this.ruleForm.pass,
                  this.ruleForm.nickname
                )
                  .then((res) => {
                    console.log(res);
                    if (res.data.code == 200) {
                      this.$message({
                        showClose: true,
                        message: "注册成功",
                        type: "success",
                        center: true,
                      });
                      setTimeout(() => {
                        this.changeLoginWay(0);
                      }, 500);
                    } else if (res.data.code == 400) {
                      this.$message({
                        message: "昵称不符合规范",
                        type: "error",
                        center: true,
                      });
                    }
                  })
                  .catch((err) => {
                    this.$message({
                      message: "该昵称已被占用",
                      type: "warning",
                      center: true,
                    });
                  });
              }
            })
            .catch((err) => {
              this.$message({
                showClose: true,
                message: "验证码错误",
                type: "warning",
                center: true,
              });
            });
        } else {
          this.$message({
            // showClose: true,
            message: "请填写完整表单",
            type: "warning",
            center: true,
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-pop {
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
  background: #dcdcdc;
  border-radius: 10px;
  width: 400px;
  background: #fff;
  text-align: center;
  .close {
    text-align: right;
    cursor: pointer;
    padding: 10px 20px 0 0;
    .iconfont {
      font-size: 22px;
    }
  }
}
.imgs {
  width: 150px;
  height: 150px;
  margin: 0 auto;
  line-height: 150px;
  .icon-tel {
    font-size: 82px;
    color: var(--themeColor);
  }
  padding-bottom: 20px;
}
.form {
  padding-right: 30px;
}
.phone-login {
  margin-top: 40px;
  .el-form-item {
    margin-bottom: 12px;
  }
  .btn {
    width: 300px;
    margin: 0 auto 12px;
    transform: translateX(30px);
  }
}
.qr-login {
  .qr {
    h2 {
      margin-top: 20px;
    }
    width: 100%;
    margin-bottom: 65px;
    img {
      width: 220px;
      height: 220px;
    }
    .failqr {
      margin-bottom: 5px;
      span {
        color: var(--themeColor);
        cursor: pointer;
      }
    }
  }
}
.footer {
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translate(-50%);
}
.other-way {
  span:hover {
    color: var(--themeColor);
    cursor: pointer;
  }
}
.register {
  h2 {
    margin-top: 10px;
  }
  .reg-form {
    margin-top: 20px;
    padding-right: 20px;
    .captcha-input {
      position: relative;
      .captcha-btn {
        position: absolute;
        right: 5px;
        top: 0;
        cursor: pointer;
        font-size: 12px;
        color: var(--themeColor);
      }
      .captcha {
        position: absolute;
        right: 5px;
        top: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .reg-btns {
    width: 250px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto 12px;
    transform: translateX(18px);
    .reg-btn {
      width: 48%;
    }
  }
  /deep/ .el-form-item__label {
    padding-right: 5px;
  }
}
.el-button {
  width: 100%;
}
.el-button + .el-button {
  margin-left: 0;
}
</style>
