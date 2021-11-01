<template>
  <div>
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="'#node-'+type"></use>
    </svg>
  </div>
</template>

<script>
export default {
  name: "icon",
  props: {
    type: {
      require: true,
      default: "",
      type: String,
    },
  },
};
</script>

<style>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  font-size: 14px;
}
</style>
