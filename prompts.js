/**
 *
 * @authors zzl (you@example.org)
 * @date    2020-05-30
 * @version $ IIFE
 */
module.exports = [
  {
    name: 'application',
    type: 'list',
    message: 'Choose whether your app is a pc or a mobile(default:pc)',
    choices: [
      {
        name: 'pc',
        value: 'pc'
      },
      {
        name: 'mobile',
        value: 'mobile'
      }
    ],
    default: 'pc'
  }
]