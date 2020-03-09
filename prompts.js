/**
 *
 * @authors zzl (you@example.org)
 * @date    2020-03-09 15:35
 */
module.exports = [{
    name: 'application',
    type: 'list',
    message: 'Choose whether your app is a PC or a mobile(default:PC)',
    choices: [{
        name: 'PC',
        value: 'pc'
      },
      {
        name: 'mobile',
        value: 'mobile'
      }
    ],
    default: 'pc'
  },
  {
    name: 'ui-framework',
    type: 'list',
    message: 'choice UI Framework(default:ant)',
    choices: [{
        name: 'Element UI',
        value: 'element-ui'
      },
      {
        name: 'ant-design-vue',
        value: 'ant'
      },
      {
        name: 'vant',
        value: 'vant'
      },
      {
        name: 'none',
        value: 'none'
      }
    ],
    when: answers => answers.application === 'pc',
    default: 'ant'
  }
];