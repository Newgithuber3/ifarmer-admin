<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <p>{{user.username+user.id}}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      user: {}
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = this.$store.getters.user
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
