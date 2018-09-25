// import {destroyVM, createTest, createVue} from './util'
// import Registrations from '@/views/Registrations/Registrations'
// import store from '@/store'
// import Vue from 'vue'
//
// describe('Registrations.vue', () => {
//   let vm = createTest(Registrations, {}, true);
//
//   afterEach(() => {
//     destroyVM(vm);
//   });
//   it("更新store的registrations", done => {
//     store.dispatch('getRegistrations', {
//       rows: 10,
//       page: 1
//     })
//     vm.$nextTick(() => {
//       expect(vm.registrations).to.be.equal(vm.$store.state.uuidImages)
//       done()
//     })
//   })
//   it("search成功", done => {
//     vm.search({ name: '李进', rows: 10, page: 1 })
//     vm.$nextTick(() => {
//       expect(vm.registrations).toEqual(vm.$store.state.uuidImages)
//     })
//     done()
//   })
//   it("内容正确", () => {
//     expect(vm.breadcrumb.toString()).to.be.equal(['主页', '家属注册管理'].toString())
//   })
//   it('家属注册管理信息分页查询成功', done => {
//     store.dispatch('getRegistrations', {
//       rows: 10,
//       page: 1
//     }).then(res => {
//       expect(res.code).to.be.an(100)
//     });
//     done();
//   });
// });
