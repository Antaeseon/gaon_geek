<template>
    
<v-container fluid grid-list-md>
  <v-layout row wrap>
    

    <v-flex xs12 sm6 md4 lg3 xl2>
        
    <v-hover>
        
    <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
      class="mx-auto"
      width="250"

    >
    <div style="padding-top:10px"></div>

      <v-img
        :aspect-ratio="16/9"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/1280px-Flag_of_South_Korea.svg.png"
      ></v-img>

      <div style="text-align:center; font-weight:bold;">
          <h2>
            한국
          </h2>
      </div>

    </v-card>
    </v-hover>
    </v-flex>
    
    <v-flex xs12 sm6 md4 lg3 xl2>
      <v-card color="blue">
        b
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 md4 lg3 xl2>
      <v-card color="red">
        c
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 md4 lg3 xl2>
      <v-card color="blue">
        d
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 md4 lg3 xl2>
      <v-card color="red">
        e
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 md4 lg3 xl2>
      <v-card color="blue">
        f
      </v-card>
    </v-flex>
  </v-layout>
</v-container>


</template>
