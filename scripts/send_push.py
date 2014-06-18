import pusher

p = pusher.Pusher(
  app_id='78535',
  key='eff046273c0447c5498c',
  secret='c43bbd851edcf19ea57b'
)
p['test_channel'].trigger('my_event', {'message': 'hello world'})