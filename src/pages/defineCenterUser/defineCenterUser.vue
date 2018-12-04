<template>
  <div>
    defineCenterUser
    <swiper class='swiper' :options="swiperOption">
      <swiper-slide>Slide 1</swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'defineCenterUser',
  data () {
    return {
      swiperOption: {
          slidesPerView: 3,
          spaceBetween: 30,
          freeMode: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
    }
  },
  components: {
    
  },
  methods: {
    
  }
}
</script>
<style scoped>
/* @import './index.css'; */
.swiper{
  height: 200px;
  width: 400px;
  background: red;
}
</style>
