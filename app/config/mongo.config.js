module.exports = {
  'port': 3005,
  'mongoUrl': 'mongodb://localhost:27017/nodejs_training',
  'bodyLimit': '100kb',
  'secretKey': async () => {

  },
  'publicKey': async () => {

  },
  'saltRound': 10,
  'roleName': ["admin", "member"],
  'baseUrl': "http://127.0.0.1:3000"
}