<template>
  

    <v-card  color="lime lighten-5">
      <v-container
        fluid
        grid-list-lg
      >
       
        
            <v-flex>
            <v-card>
        
                <v-img
                src="https://s3.ap-northeast-2.amazonaws.com/wearever1/event_1.png"
                aspect-ratio="2.75"
                class="image" alt="lorem" contain
                ></v-img>

                <v-card-actions >
                <v-btn  style="margin:auto; font-size:30px;"  flat color="orange" >{{ $t("message.join") }}</v-btn>
                </v-card-actions>

            </v-card>
            </v-flex>
        <br><br><br>
            <v-flex>
            <v-card>
        
                <v-img
                src="https://s3.ap-northeast-2.amazonaws.com/wearever1/event_2.jpg"
                aspect-ratio="2.75"
                class="image" alt="lorem" contain
                ></v-img>

                <v-card-actions>
                <v-btn style="margin:auto; font-size:30px;"  flat color="orange" >{{ $t("message.join") }}</v-btn>
                </v-card-actions>

            </v-card>
            </v-flex>
        <br><br><br>
  
    
     
     </v-container>
    </v-card>
   
</template>
