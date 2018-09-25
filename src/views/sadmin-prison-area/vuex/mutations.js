export default {
  getPrisonAreas(state, params) {
    state.prisonAreas.contents = params.prisonConfigs
    state.prisonAreas.total = params.prisonConfigsSize
  }
}
