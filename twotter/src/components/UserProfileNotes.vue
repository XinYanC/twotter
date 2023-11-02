<template>
    <div class="user-profile">
      <div class="user-profile__user-panel">
        <h1 class="user-profile__follower-count">@{{ user.username }}</h1>
        <div class="user-profile__admin-badge" v-if="user.isAdmin"> <!-- v-if and v-else for conditionals-->
            Admin
        </div>
        <div class="user-profile__follower-count">
          <strong>Followers: </strong> {{  followers }}
        </div>
        <form class="user-profile__create-twoot" @submit.prevent="createNewTwoot" :class="{ '--exceeded': newTwootCharacterCount > 180 }">
            <!-- by default form's button submits by refreshing the page. thus we use prevent and tells it to do something else -->
            <label for="newTwoot"> <strong>New Twoot</strong> ({{ newTwootCharacterCount }}/180) </label>
            <textarea id="newTwoot" rows="4" v-model="newTwootContent"/>
            <!-- v-model linked/saves whatever content in this textbox into the variable (currently empty) -->
            <!-- we are using textarea here but input would also work -->

            <div class="user-profile__create-twoot-type">
                <label for="newTwootType"><strong>Type: </strong></label>
                <select id="newTwootType" v-model="selectedTwootType"> 
                    <!-- right now the selected value for selectedTwootType would become either of the twootTypes (draft, instant) by v-model -->
                    <option :value="option.value" v-for="(option, index) in twootTypes" :key="index">
                        {{ option.name }}
                    </option>
                    <!-- by adding : to things like :value it makes it into referencing a variable/code, instead of it becoming a string value="option.value" -->
                </select>
            </div>

            <button>
                Twoot!
            </button>
        </form>
      </div>
      <div class="user-profile__twoots-wrapper">
        <!--
        <div class="user-profile__twoot" v-for="twoot in user.twoots" :key="twoot.id"> 
            :key gives the list of thing their id 
            another way: <div class="user-profile__twoot" v-for="(twoot, index) in user.twoots" :key="twoot.id">  that gives the twoot object their index in the list (unique for each object)
            v-for for for loops, will not render anything if list is empty
        {{ twoot.content }}
        </div> -->
        <TwootItem 
            v-for="twoot in user.twoots" 
            :key="twoot.id" 
            :username="user.username" 
            :twoot="twoot" 
            @favorite="toggleFavorite" 
        />
      </div>
    </div>
  </template>
  
  <script>
    import TwootItem from './Twootitem.vue';

  export default {
    name: "UserProfile",
    components: { TwootItem },
    data() {
      return {
        newTwootContent: '',
        selectedTwootType: 'instant',
        twootTypes: [
            {value: 'draft', name: 'Draft'},
            {value: 'instant', name: 'Instant Twoot'}
        ],
        followers: 0,
        user: {
          id: 1,
          username: "xxin_yan",
          firstName: "XinYan",
          lastName: "Chen",
          email: "amazingyanyan@gmail.com",
          isAdmin: true,
          twoots: [
            { id: 1, content: 'Twooter is Amazing!'},
            { id: 2, content: 'Say hi!'}
            ]
        }
      }
    },
    watch: { // "watches" a data point and runs function when data is changed
      followers(newFollowCount, oldFloowerCount) {
        if (oldFloowerCount < newFollowCount) {
          console.log(`${this.user.username} has gained a follower!`)
        }
      }
    },
    computed: {
      fullName() {
        return `${this.user.firstName} ${this.user.lastName}`;
        // this references back to data, `` makes a string literal above
        // another way: this.user.firstName + ' ' + this.user.lastName
      },
      newTwootCharacterCount(){
        return this.newTwootContent.length;
      }
    },
    methods: {
      followUser() {
        this.followers++;
        // same as this.followers += 1 and this.followers = this.followers + 1
      },
      toggleFavorite(id) {
        console.log(`Favorited Twoot #${id}`)
      },
      createNewTwoot() {
        if (this.newTwootContent && this.selectedTwootType !== 'draft') {
            this.user.twoots.unshift({
                id: this.user.twoots.length + 1,
                content: this.newTwootContent
            })
            // unshift pushes thing into the start of a list 
            this.newTwootContent = ''; // empties box again after tweeting
        }
      }
    },
    mounted(){ // mounted() runs mounted function then followUser() function again, setting follower count to 1 (not 0, 0+1+1) 
    // runs asap when the component is loaded
      this.followUser();
    }
  };
  </script>
  
  <!-- applying scope to style makes sure that those styles only applies to the certain file -->
  <!-- can usually scoped all the styles except for the main file, app.vue -->
  <style lang="scss" scoped>
    /* you can nest styles */

  .user-profile{
    display: grid;
    grid-template-columns: 1fr 3fr;
    width: 100%;
    padding: 50px 5%;

    .user-profile__user-panel{
        display: flex;
        flex-direction: column;
        margin-right: 50px;
        padding: 20px;
        background-color: white;
        border-radius: 5px;
        border: #DFE3E8;

        h1{
            margin: 0;
        }

        .user-profile__admin-badge{
        background: purple;
        color: white;
        border-radius: 5px;
        margin-right: auto;
        padding: 0 10px;
        font-weight: bold;
        }

        .user-profile__create-twoot {
            padding-top: 20px;
            display: flex;
            flex-direction: column;

            &.--exceeded {
                color: red;
                border-color: red;

                button {
                    background-color: red;
                    border: none;
                    color: white;
                }
            }
        }
    }

    .user-profile__twoots-wrapper {
        display: grid;
        grid-gap: 10px;
    }
  }

  // child of user-profile so you can nest them into the other class
//   .user-profile__user-panel{
//     display: flex;
//     flex-direction: column;
//     margin-right: 50px;
//     padding: 20px;
//     background-color: white;
//     border-radius: 5px;
//     border: #DFE3E8;
//   }

//   .user-profile__admin-badge{
//     background: purple;
//     color: white;
//     border-radius: 5px;
//     margin-right: auto;
//     padding: 0 10px;
//     font-weight: bold;
//   }

//   h1{
//     margin: 0;
//   }

//   .user-profile__twoots-wrapper {
//     display: grid;
//     grid-gap: 10px;
//   }

//   .user-profile__create-twoot {
//     padding-top: 20px;
//     display: flex;
//     flex-direction: column;
//   }

  </style>
  