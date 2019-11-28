<template>
    <div class="menuArea">
        <div class="date">
            <h3>Date</h3>
            <div class="row">
                <div class="col-md-12">
                    <date-picker v-model="date" :config="options"></date-picker>
                </div>
            </div>
        </div>
        <ul>
            <div :options='option' :key='option' v-for='option in options' class="menuItem">
            <li >{{ option.title }} 
                <toggle-button 
                v-model="option.isOn"
                class="toggleButton"
                :sync="true"
                :labels="true"/>
            </li>
            </div>
        </ul>
    </div>
</template>

<script>

export default {
  name: 'OptionsMenu',
  data(){
      return {
        options:[
        {id: 0, title: 'Sun Path', isOn: true},
        {id: 1, title: 'Area', isOn: true}
      ],
      date: {
      }
        }
  }  
}
</script>

<style>
    .menuArea{
        background-color: grey;
        width: 20%;
        height: 100vh;
        text-align: left;
    }
    .date{
        width: 100%;
        padding: 10px 20px;
        background-image: -moz-linear-gradient(rgba(231, 231, 231, 0.815), rgba(238, 238, 238, 0.39));
        border: solid 1px black;
    }
    .menuArea > ul{
        padding: 40px 10px;
        list-style: none;
    }
    .menuItem{
        left: 0;
        width: 100%;
        margin-bottom: 4px;
        padding: 5px;
        border: solid 1px black;
        border-radius:20px;
        background-image: linear-gradient(rgb(206, 206, 206), rgb(226, 226, 226))
    }
    .toggleButton{
        float: right;
    }
</style>