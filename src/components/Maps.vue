<template>
    <div class="mapArea">
    </div>

</template>


<script>
export default {
  name: 'Maps',
  props: {
    msg: String
  } 
}
</script>

<style>
    .mapArea {
        border: 1px solid black;
        background-color: lightblue;
        width: 80%;
        height: 90vh;
        position: fixed;
        bottom: 0;
        right: 0;
    }
    #mapid { 
      height: 180px; 
      }
</style>