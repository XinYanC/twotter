
import Twootitem from './Twootitem.vue';
<template>
    <div class="user-profile">
        <div class="user-profile__sidebar">
            <div class="user-profile__user-panel">
                <h1 class="user-profile__username">@{{ state.user.username }}</h1>
                <!-- <h2>{{ userId }}</h2> -->
                <div class="user-profile__admin-badge" v-if="state.user.isAdmin">
                    Admin
                </div>
                <div class="user-profile__follower-count">
                    <strong>Followers: </strong> {{  state.followers }}
                </div>
            </div>
            <CreateTwootPanel @add-twoot="addTwoot" />
        </div>
        <div class="user-profile__twoots-wrapper">
            <Twootitem
                v-for="twoot in state.user.twoots"
                :key="twoot.id"
                :username="state.user.username"
                :twoot="twoot"
            />
        </div>
    </div>
</template>

<script>
import { reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { users } from '@/assets/users';
import Twootitem from '../components/Twootitem';
import CreateTwootPanel from '../components/CreateTwootPanel';

export default {
    name: "UserProfile",
    components: { CreateTwootPanel, Twootitem },
    setup() {
        const route = useRoute();
        const userId = computed(() => route.params.userId)

        // if (userId) fetchFromApi(userId)

        const state = reactive({
            followers: 0,
            // user: {
            //     id: 1,
            //     username: 'xxin_yan',
            //     firstName: 'XinYan',
            //     lastName: 'Chen',
            //     email: 'xinyanchen@gmail.com',
            //     isAdmin: true,
            //     twoots: [
            //         { id: 1, content: 'Twotter is Amazing!' },
            //         { id: 2, content: 'Say hi :D' }
            //     ]
            // }
            user: users[userId.value - 1] || users[0]
        })

        function addTwoot(twoot) {
            state.user.twoots.unshift({ id: state.user.twoots.length + 1, content: twoot });
        }

        return {
            state,
            addTwoot,
            userId
        }
    }
    // data() {
    //     return {
    //         followers: 0,
    //         user: {
    //             id: 1,
    //             username: 'xxin_yan',
    //             firstName: 'XinYan',
    //             lastName: 'Chen',
    //             email: 'xinyanchen@gmail.com',
    //             isAdmin: true,
    //             twoots: [
    //                 { id: 1, content: 'Twotter is Amazing!' },
    //                 { id: 2, content: 'Say hi :D' }
    //             ]
    //         }
    //     }
    // },
    // methods: {
    //     addTwoot(twoot) {
    //         this.user.twoots.unshift({ id: this.user.twoots.length + 1, content: twoot });
    //     }
    // }
};
</script>

<style lang="scss" scoped>
.user-profile {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 50px;
    padding: 5px 5%;

    .user-profile__user-panel {
        display: flex;
        flex-direction: column;
        padding: 20px;
        background-color: white;
        border-radius: 5px;
        border: 1px solid #DFE3E8;
        margin-bottom: auto;

        h1{
            margin: 0;
        }

        .user-profile__admin-badge {
            background: rebeccapurple;
            color: white;
            border-radius: 5px;
            margin-right: auto;
            padding: 0 10px;
            font-weight: bold;
        }
    }

    .user-profile__twoots-wrapper {
        display: grid;
        grid-gap: 10px;
        margin-bottom: auto;
    }
}
</style>