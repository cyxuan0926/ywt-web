import {destroyVM, createTest} from './util'
import Login from '@/views/Login/Login'

describe('Login.vue', function () {

  this.timeout(5000)
  const vm = createTest(Login, {}, true);

  afterEach(() => {
    destroyVM(vm);
  });

  it('验证通过', () => {
    vm.ruleForm2.password = '123456'
    vm.ruleForm2.username = '4501_sh'
    vm.ruleForm2.prison = '4501'
    vm.$refs.ruleForm2.$el.querySelectorAll('input').forEach(item => {
      item.focus();
      item.blur();
    })

    vm.$refs.ruleForm2.validate(valid => {
      expect(valid).to.true
    })
  })

  it('登陆成功', (done) => {
    vm.ruleForm2.password = '123456'
    vm.ruleForm2.username = '4501_sh'
    vm.ruleForm2.prison = '4501'

    vm.login(vm.ruleForm2)
    setTimeout(function () {
      expect(vm.$store.state.users).to.have.property('id')
      done()
    }, 300)
  })

})
