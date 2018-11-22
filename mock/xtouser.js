export default {
  'POST /xtopms/api/TokenAuth/Authenticate': (req, res) => {

    return req.body;

    const {
      password,
      userName,
      type
    } = req.body;

    if (password === 'ant.design' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin'
      });
      return;
    }

    if (password === 'ant.design' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user'
      });
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest'
    });
  },
}