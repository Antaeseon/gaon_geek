<template>
<!-- 높이 맞추기 -->
    <v-container fill-height style="max-width:450px;">  
        <!-- 정 가운데로 맞추기 -->
        <v-layout align-center row wrap>
            <v-flex xs12>
                <v-card>
                    <v-toolbar flat height="30">
                        <v-toolbar-title>Sign Up</v-toolbar-title>
                    </v-toolbar>
                    <div class="pa-3">
                    <v-text-field
                        v-model="id"
                        label="아이디를 입력하세요"
                    >
                    </v-text-field>
                    <v-text-field
                        v-model="pwd"
                        label="비밀번호를 입력하세요"
                        type="password"
                    >
                    </v-text-field>
                    <v-text-field
                        v-model="name"
                        label="이름을 입력하세요"
                    >
                    </v-text-field>
                    <v-text-field
                        v-model="nation"
                        label="국가를 입력하세요"
                    >
                    </v-text-field>
                    <v-text-field
                        v-model="email"
                        label="이메일을 입력하세요"
                    >
                    </v-text-field>
                    <v-text-field
                        v-model="phoneNum"
                        label="핸드폰 번호를 입력하세요"
                    >
                    </v-text-field>
                    <v-btn
                        color="primary"
                        depressed
                        block
                        large
                        @click="login({
                            email:email,
                            password:password
                        })"
                    >
                        회원가입하기
                    </v-btn>
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

