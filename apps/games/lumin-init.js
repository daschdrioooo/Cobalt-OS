Lumin.init({
  container: '#lumingames',
  theme: 'dark',
  onReady: () => console.log('LuminSDK is ready'),
  onError: (err) => console.error('LuminSDK error:', err),
});