<template>
    <div style="height:100vh;width: 100%;background-color: rgba(0,0,0,.5);">
        <div class="info">
            <h4>商户代缴停车费:</h4>
            <p>请输入顾客车牌号，然后缴费。（每次购买定额8元，限一车次4小时内停车，超出4小时后费用另计，停车时限未满4小时不找补。)</p>
        </div>
        <div class="carnum">
            <flexbox :gutter="4">
                <flexbox-item>
                    <div @click="clickInput(1)" :class="{currentInput:curindex==1}" class="flex-demo-num">{{ carnumData[0].val }}</div>
                </flexbox-item>
                <flexbox-item>
                    <div @click="clickInput(2)" :class="{currentInput:curindex==2}" class="flex-demo-num">{{carnumData[1].val}}</div>
                </flexbox-item>
                <flexbox-item>
                    <div @click="clickInput(3)" :class="{currentInput:curindex==3}" class="flex-demo-num">{{carnumData[2].val}}</div>
                </flexbox-item>
                <flexbox-item>
                    <div @click="clickInput(4)" :class="{currentInput:curindex==4}" class="flex-demo-num">{{carnumData[3].val}}</div>
                </flexbox-item>
                <flexbox-item>
                    <div @click="clickInput(5)" :class="{currentInput:curindex==5}" class="flex-demo-num">{{carnumData[4].val}}</div>
                </flexbox-item>
                <flexbox-item>
                    <div @click="clickInput(6)" :class="{currentInput:curindex==6}" class="flex-demo-num">{{carnumData[5].val}}</div>
                </flexbox-item>
                <flexbox-item>
                    <div @click="clickInput(7)" :class="{currentInput:curindex==7}" class="flex-demo-num">{{carnumData[6].val}}</div>
                </flexbox-item>
            </flexbox>
        </div>
        <div class="keyboard">
            <div style=" padding: 0px 3px">
                <flexbox  :gutter="3" justify="center">
                    <flexbox-item v-for="item in lineOneData" :span="1.1" :key="item"><div @click="clickKey(item)"
                     :class="{keyClicked:clickedKey==item}" class="flex-demo">{{item}}</div></flexbox-item>
                </flexbox>
                <flexbox style="margin-top: 10px;" justify="center" :gutter="3">
                    <flexbox-item :span="1.1" v-for="item in lineTwoData" :key="item"><div @click="clickKey(item)"
                    :class="{keyClicked:clickedKey==item}" class="flex-demo">{{item}}</div></flexbox-item>
                </flexbox>
                <flexbox style="margin-top: 10px;" :gutter="3" justify="center">
                    <flexbox-item :span="1.1" v-for="item in lineThreeData" :key="item"><div @click="clickKey(item)" 
                    :class="{keyClicked:clickedKey==item}" class="flex-demo">{{item}}</div></flexbox-item>
                </flexbox>
                <flexbox style="margin-top: 10px;" :gutter="3" justify="center">
                    <flexbox-item :span="1.65">
                        <div class="flex-demo" style="font-weight: normal" @click="clearKey">
                            <x-icon type="ios-close-empty" size="27"></x-icon>
                        </div>

                    </flexbox-item>
                    <flexbox-item :span="1.1" v-for="item in lineFourData" :key="item"><div @click="clickKey(item)" 
                    class="flex-demo" :class="{blankKey:item=='',keyClicked:clickedKey==item}">{{item}}</div></flexbox-item>
                    <flexbox-item :span="1.65">
                        <div class="flex-demo" style="font-weight: normal" @click="deleteKey">
                            <x-icon type="ios-arrow-thin-left" size="30"></x-icon>
                        </div>
                    </flexbox-item>
                </flexbox>
            </div>
            <x-button :show-loading="isLoading" @click.native="confirmNum" class="addcar" :type="btnType" :disabled="isdisabled">确定</x-button>
        </div>
    </div>
</template>

<script>
import { Group, Cell, Tabbar, TabbarItem, Icon, Swiper, SwiperItem, Divider, Flexbox, FlexboxItem,XButton, Checker, CheckerItem } from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
    components: {
        Group,
        Cell,
        Tabbar,
        TabbarItem,
        Icon,
        Swiper, 
        SwiperItem,
        Divider,
        Flexbox,
        FlexboxItem,
        XButton, 
        Checker,
        CheckerItem,       
    },
    data () {
        return {
            isdisabled:true,
            isLoading:false,
            curindex:1,
            btnType:'default',
            lineOneData:['渝','京','沪','津','冀','晋','蒙','辽','吉','黑'],
            lineTwoData:['苏','浙','皖','闽','赣','鲁','豫','鄂','湘','粤'],
            lineThreeData:['桂','琼','川','贵','云','藏','陕','甘','青'],
            lineFourData:['宁','新','港','澳','台','',''],
            carnumData:[
                { 'val':'' },
                { 'val':'' },
                { 'val':'' },
                { 'val':'' },
                { 'val':'' },
                { 'val':'' },
                { 'val':'' },
            ],
            clickedKey:'-1',
            carTypeData:[],
            selectedType:'',
        }
    },
    watch:{
        "curindex":function (n, o) {
            if(n==1){
                this.lineOneData = ['渝','京','沪','津','冀','晋','蒙','辽','吉','黑'];
                this.lineTwoData = ['苏','浙','皖','闽','赣','鲁','豫','鄂','湘','粤'];
                this.lineThreeData = ['桂','琼','川','贵','云','藏','陕','甘','青'];
                this.lineFourData = ['宁','新','港','澳','台','',''];
            }else{
                this.lineOneData = ['1','2','3','4','5','6','7','8','9','0'];
                this.lineTwoData = ['Q','W','E','R','T','Y','U','I','O','P'];
                this.lineThreeData = ['A','S','D','F','G','H','J','K','L'];
                this.lineFourData = ['Z','X','C','V','B','N','M'];
            }
        },
        "carnumData":{
            handler: function (val, oldVal) {
                var g = val.some(function (item) {
                    return item.val == '';
                })
                if(!g){
                    this.isdisabled = false;
                    this.btnType = 'primary';
                }else{
                    this.isdisabled = true;
                    this.btnType = 'default';
                }
            },
            deep: true
        },
        
    },
    computed: {
       
    },
    mounted(){

    },
    methods:{
        clickInput(e){
            this.curindex=e;
        },
        clickKey(key){
            if(key=='' || key==null){
                return false;
            }
            this.clickedKey = key;
            if(this.curindex<7){
                this.carnumData[this.curindex-1].val = key;
                this.curindex++;
            }else{
                this.carnumData[this.curindex-1].val = key;
            }
        },
        deleteKey(){
            if(this.curindex == 7 && this.carnumData[6].val){
                this.carnumData[this.curindex-1].val='';
            }else if(this.curindex>1 && !this.carnumData[6].val){
                this.carnumData[this.curindex-2].val = ''
                this.curindex = this.curindex-1
            }else if(this.curindex == 1){
                
            }
        },
        clearKey(){
            this.carnumData=[
                { 'val':'' },
                { 'val':'' },
                { 'val':'' },
                { 'val':'' },
                { 'val':'' },
                { 'val':'' },
                { 'val':'' },
            ];
            this.curindex=1;
        },
        confirmNum(){
            
            this.$store.commit('UPDATE_LOADING', true);
            this.isLoading = true;
            let openid = localStorage.getItem("openid");
            let carnum = '';
            this.carnumData.forEach(function (item) {
                carnum+=item.val;
            })
            this.$http(API_URL+'?Ctype=QueryParking&Openid='+openid+'&Carcode='+carnum)
                .then(response => {
                    this.$store.commit('UPDATE_LOADING', false);
                    console.log(response)
                    if(response.data.total_fee==0){
                        this.$vux.toast.show({
                            type: 'warn',
                            text: '费用为0元'
                        })
                    }else if(response.data.total_fee>0){
                        this.fee(carnum)
                    }else if(response.data.error){
                        this.$vux.toast.show({
                            type: 'warn',
                            text: response.data.error
                        })
                        this.isLoading = false
                    }else{
                        this.isLoading = false
                    }
                })
                .catch(error => {
                    //console.log(error)
                    this.$store.commit('UPDATE_LOADING', false);
                    this.$vux.toast.text('网络连接出错！', 'middle')
                })
        },
        fee(carnum){
            this.$http(API_URL+'?Ctype=BuyCard&Openid='+openid+'&Carcode='+carnum)
                .then(response => {
                    this.$store.commit('UPDATE_LOADING', false);
                    console.log(response)
                    this.isLoading = false
                    if(response.data.payurl){
                        window.location.href = response.data.payurl;
                    }else{
                        this.$vux.toast.show({
                            type: 'warn',
                            text: 'error'
                        })
                    }
                })
                .catch(error => {
                    //console.log(error)
                    this.isLoading = false
                    this.$store.commit('UPDATE_LOADING', false);
                    this.$vux.toast.text('网络连接出错！', 'middle')
                })
        }
    }
}
</script>

<style lang="less" scoped>

@import '~vux/src/styles/1px.less';

.info{
    padding: 10px;
    color:#fff;
    h4{
        font-size: 16px;
        margin:10px 0;
    }
    p{
        line-height: 24px;
    }
}

.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
.vux-indicator.custom-bottom {
  bottom: 30px;
}
@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
.fadeInUp {
  animation-name: fadeInUp;
}
.keyboard{
    padding: 10px 0px 0 0px;
    height: 40vh;
    background-color: #F0F0F0;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}
.vux-flexbox-item{
    font-weight: 600;
}
.flex-demo {
  text-align: center;
  font-size: 13px;
  background-color: #fff;
  border-radius: 4px;
  background-clip: padding-box;
  border: 1px solid #ddd;
  height: 28px;
  line-height: 28px;
}
.carnum{
    padding: 0 12px;
    margin-top: 10vh;
    
}
.flex-demo-num{
    text-align: center;
    background-color: #fff;
    border-radius: 4px;
    background-clip: padding-box;
    height: 37px;
    line-height: 37px;
}
.addcar{
    border-radius: 0!important;
    margin-top: 18px;
}
.blankKey{
    background-color: #F0F0F0;
}
.currentInput{
    border: 2px solid skyblue;
    color: skyblue;
}
.keyClicked{
    background-color: skyblue;
    color: #fff;
}
.weui-btn_primary{
    background-color: deepskyblue;
}
.weui-btn_loading.weui-btn_primary{
    background-color: deepskyblue;
}
.demo1-item {
  border: 1px solid #ececec;
  padding: 5px 15px;
  margin-top: 5vh;
  margin-left: 2vh;
  margin-right: 2vh;
  color: white;
  //background-color: white
}
.demo1-item-selected {
  border: 1px solid deepskyblue;
  background-color: white;
  color: black;
}
</style>
