<template>
    <swiper :style="{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
    }" :loop="true" :spaceBetween="10" :navigation="true" :thumbs="{ swiper: thumbsSwiper }" :modules="modules"
        class="mySwiper2">
        <swiper-slide v-for="item in srcs"><img :src="item"  /></swiper-slide>
    </swiper>
    <swiper @swiper="setThumbsSwiper" :loop="true" :spaceBetween="10" :slidesPerView="4" :freeMode="true"
        :watchSlidesProgress="true" :modules="modules" class="mySwiper">
        <swiper-slide v-for="item in srcs"><img :src="item" /></swiper-slide>
    </swiper>
</template>
  <script>
// Import Swiper Vue.js components
import  {Swiper, SwiperSlide } from 'swiper/vue';
import {ref} from 'vue'
// Import Swiper styles
import 'swiper/css';

import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"



// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper';

export default {
    props:{
        srcs:{
            type:Object,
            default:()=>([])
        }
    },
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        let thumbsSwiper = ref(null);

        const setThumbsSwiper = (swiper) => {
            thumbsSwiper.value = swiper
            
        }

        return {
            modules: [FreeMode, Navigation, Thumbs],
            setThumbsSwiper,
            thumbsSwiper
        };
    }
}
</script>

  <style>
  .swiper {
      width: 100%;
      height: 100%;
  }
  
  .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
  
      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
  }
  
  .swiper-slide img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
  }
  
  
  .swiper {
      width: 100%;
      height: 300px;
      margin-left: auto;
      margin-right: auto;
  }
  
  .swiper-slide {
      background-size: cover;
      background-position: center;
  }
  
  .mySwiper2 {
      height: 80%;
      width: 100%;
  }
  
  .mySwiper {
      height: 20%;
      box-sizing: border-box;
      padding: 10px 0;
  }
  
  .mySwiper .swiper-slide {
      width: 25%;
      height: 100%;
      opacity: 0.4;
  }
  
  .mySwiper .swiper-slide-thumb-active {
      opacity: 1;
  }
  
  .swiper-slide img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
  }
  </style>
  