<template>
<v-container>
  <v-parallax
    dark
    src="https://s3.ap-northeast-2.amazonaws.com/wearever1/rentalimage.png"
  >
    <v-layout
      align-center
      column
      justify-center
    >
      <!-- <h1 class="display-2 font-weight-thin mb-3">Vuetify.js</h1> -->
      <!-- <h4 class="subheading">Build your application today!</h4> -->
    </v-layout>
  </v-parallax>
    <v-container>
      <v-layout align-center justify-center column fill-height>
        <v-flex xs12>
            <v-divider class="my-3"></v-divider>
            <h3 class="display-3">Welcome to the Wearever</h3>
            <v-divider class="my-3"></v-divider>
            <span class="subheading">해외에서도 예쁜 옷들을 빌려 입을 수 있습니다 Wearever와 함께하세요!</span>
        </v-flex>
      </v-layout>
    </v-container>
  <v-container grid-list-md>
    <v-card>
      <v-card-text>
      <v-layout align-content-center justify-center align-center column fill-height mb-3>
        <v-flex xs12>
          <strong class="title">LeaderShip</strong>
          <v-spacer></v-spacer>
        </v-flex>
      </v-layout>
      <v-layout>
        
        <v-flex xs6>
        <v-layout align-center justify-center column text-xs-center>
          <v-avatar
            :tile="tile"
            :size="150"
            color="grey lighten-4"
          >
            <img src="https://s3.ap-northeast-2.amazonaws.com/wearever1/sangyeon.png" alt="avatar">
          </v-avatar>
          <span  style="font-weight:bold">강상연</span>
          <span>CEO</span><span>CO-FOUNDER</span><span>Main Developer</span>
        </v-layout>
        </v-flex>
        <v-flex xs6>
        <v-layout align-center justify-center column text-xs-center>
          <v-avatar
            :tile="tile"
            :size="150"
            color="grey lighten-4"
          >
            <img src="https://s3.ap-northeast-2.amazonaws.com/wearever1/taesun.png" alt="avatar">
          </v-avatar>
          <span  style="font-weight:bold">안태선</span>
          <span>CTO</span><span>CO-FOUNDER</span><span>Main Developer</span>
        </v-layout>
        </v-flex>


        <v-flex xs6>
        <v-layout align-center justify-center column text-xs-center>
          <v-avatar
            :tile="tile"
            :size="150"
            color="grey lighten-4"
          >
            <img src="https://s3.ap-northeast-2.amazonaws.com/wearever1/juho.png" alt="avatar">
          </v-avatar>
          <span  style="font-weight:bold">우주호</span>
          <span>CIO</span><span>CO-FOUNDER</span><span>Main Developer</span>
        </v-layout>
        </v-flex>
        <v-flex xs6>
        <v-layout align-center justify-center column text-xs-center>
          <v-avatar
            :tile="tile"
            :size="150"
            color="grey lighten-4"
          >
            <img src="https://s3.ap-northeast-2.amazonaws.com/wearever1/jongin.png" alt="avatar">
          </v-avatar>
          <span  style="font-weight:bold">박종인</span>
          <span>CAO & CFO</span><span>CO-FOUNDER</span><span>Main Developer</span>
        </v-layout>
        </v-flex>
      </v-layout>
      </v-card-text>
    </v-card>
    <v-divider class="my-3"></v-divider>
  </v-container>
  <v-timeline>
    <v-timeline-item
      color="purple lighten-2"
      fill-dot
      right
    >
      <v-card>
        <v-card-title class="purple lighten-2">
          <v-icon
            dark
            size="42"
            class="mr-3"
          >
            mdi-calendar-text
          </v-icon>
          <h2 class="display-1 white--text font-weight-light">Iteration 1</h2>
        </v-card-title>
        <v-container>
          <v-layout>
            <v-flex xs12>
              개발 전에 학습과 준비를 하였고, Burndown Chart와 DB Schema, Restful API등의 문서를 작성하였다.
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      color="amber lighten-1"
      fill-dot
      left
      small
    >
      <v-card>
        <v-card-title class="amber lighten-1 justify-end">
          <h2 class="display-1 mr-3 white--text font-weight-light">Iteration 2</h2>
          <v-icon
            dark
            size="42"
          >assignment_turned_in</v-icon>
        </v-card-title>
        <v-container>
          <v-layout>
            <v-flex xs12>
              회원가입과 로그인, 관리자 로직과 판매자 등록을 구현하였다. 그리고 구글맵을 연동하였다.
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      color="cyan lighten-1"
      fill-dot
      right
    >
      <v-card>
        <v-card-title class="cyan lighten-1">
          <v-icon
            class="mr-3"
            dark
            size="42"
          >
            mdi-email-outline
          </v-icon>
          <h2 class="display-1 white--text font-weight-light">Iteration 3</h2>
        </v-card-title>
        <v-container>
          <v-layout>
            <v-flex xs12>
              물품 현황, 마이페이지, 상품 검색, 필터링, 정렬, 상품 상세 페이지, 결제와 물품 등록을 구현하였고, 추가적으로 판매자 등록 이후의 처리(자동 반영)를 해주었다.
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      color="red lighten-1"
      fill-dot
      left
      small
    >
      <v-card>
        <v-card-title class="red lighten-1 justify-end">
          <h2 class="display-1 mr-3 white--text font-weight-light">Iteration 4</h2>
          <v-icon
            dark
            size="42"
          >
            mdi-account-multiple-outline
          </v-icon>
        </v-card-title>
        <v-container>
          <v-layout>
            <v-flex xs12>
              문의 기능, 구매자 및 판매자 후기, 구매자-판매자 간의 일대일 채팅, 관리자와의 문의 채팅, 아이템 현황 자동 반영, 구글맵 API, 찜하기, UI 개선 등의 작업을 수행하였다.
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</v-container>
</template>


<script>
export default {
    data() {
        return {
            
        }
    },
    computed: {
        
    },
    methods: {
        
    },
}
</script>
