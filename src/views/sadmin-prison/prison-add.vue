<template>
  <div>
    <div class="form-container">
      <el-steps :active="status" finish-status="success" simple style="margin-bottom: 20px">
        <el-step v-for="(tag, index) in tabMapOptions" :key="index" :title="tag.label" ></el-step>
      </el-steps>

      <template v-for="(item, idx) in tabMapOptions">
        <keep-alive :key="idx">
          <component v-if='status == idx' :is="item.key"></component>
        </keep-alive>
      </template>

    </div>
  </div>

</template>

<script>
import prisonBase from './components/prison-base'
import prisonConfig from './components/prison-config'
import prisonRemote from './components/prison-remote'

export default {
  components: { prisonBase, prisonConfig, prisonRemote },
  data() {
    return {
      activeName: 'prisonBase',
      placeHolder: 0,
      tabMapOptions: [
        { label: '基本信息', key: 'prisonBase' },
        { label: '配置信息', key: 'prisonConfig' },
        { label: '远程会见', key: 'prisonRemote' }
      ]
    }
  },
  computed: {
    status() {
      switch (this.$route.query.tag) {
        case 'prisonBase':
          return 0
        case 'prisonConfig':
          return 1
        case 'prisonRemote':
          return 2
        default:
          return 0
      }
    }
  },
  mounted() {
    this.render()
  },
  destroyed() {
    this.removeSession()
  },
  methods: {
    render() {
      this.removeSession()
      this.$router.push({ query: Object.assign({}, { tag: 'prisonBase' }) })
    },
    removeSession() {
      sessionStorage.removeItem('base')
      sessionStorage.removeItem('config')
      sessionStorage.removeItem('step')
    }
  }
}
</script>
