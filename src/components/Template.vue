<template>
  <div>
    {{ txt }}
  </div>
</template>

<script>

export default {
  name: "template",
  data() {
    return {
      txt: "template"

    }
  },
  components: {

  },
  created() {
  },
  mounted() {
  },
  methods: {

  },
}
</script>

<style slot-scope>
.box-card {
  margin-top: 15px;
}
</style>
