<template>
    <div class="menuArea">
        <ul>
            <li :options='option' :key='option' v-for='option in options'>{{ option.title }}</li>
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
      ]}
  }
}
</script>

<style>
    .menuArea{
        background-color: grey;
        width: 20%;
        height: 100vh;
        padding: 20px 10px;
        text-align: left;
    }
    .menuArea > ul{
        list-style: none;
    }
</style>