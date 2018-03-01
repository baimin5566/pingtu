Page({
  data: {
    items: [
      {name: 'USA', value: '欺诈'},
      {name: 'CHN', value: '色情'},
      {name: 'BRA', value: '政治谣言'},
      {name: 'JPN', value: '常识性谣言'},
      {name: 'ENG', value: '诱导性分享', checked: 'true'},
      {name: 'TUR', value: '恶意营销', checked: 'true'},
      {name: 'ENG', value: '隐私信息收集'},
      {name: 'TUR', value: '其他侵权类(冒名，诽谤，抄袭)'}
    ],
    phone: '13000000000'
  },
  checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  }
})
