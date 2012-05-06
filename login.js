console.log('(´へωへ`*) ＜ うぇっへっへログインするよぉwwwwww');
safari.self.tab.dispatchMessage('URL', location.href, false);

safari.self.addEventListener('message',function(e){
  if(!/https:\/\/portal\.nap\.gsic\.titech\.ac\.jp\/GetAccess\/Login\?Template\=idg_key\&AUTHMETHOD\=IG\&.*/.test(location.href)) return;

  var settings = e.message;
  if(typeof settings[0] == 'undefined' || settings[0] == ''){
    alert('(´へωへ`*) ＜ 設定されてないよぉwwwwww');
    return;
  }

  var matrix = [
    settings[0].split(''),
    settings[1].split(''),
    settings[2].split(''),
    settings[3].split(''),
    settings[4].split(''),
    settings[5].split(''),
    settings[6].split(''),
  ];

  function $(pattern){
    return document.querySelectorAll(pattern);
  }

  // [a, b] -> Matrix code
  function getMatrixCode(a, b){
    var str = 'ABCDEFGHIJ';
    var ret = str.indexOf(a);
    if (ret < 0) throw new Error('(´へωへ`*)なんかへんだよ');
    return matrix[b - 1][ret];
  }

  // 実際の処理

  var f1 = $('form[name="login"]')[0],
      ts = Array.prototype.splice.call(f1.querySelectorAll('tr'),5,3),
      i = 0, t, mcodes = [];

  // Matrix codeの取得
  for (i = 0; i < ts.length; i++){
    t = ts[i].innerText.trim();
    mcodes[i] = getMatrixCode(t[1], t[3]);
  }

  // 入力

  $('input[name=message3]')[0].value = mcodes[0];
  $('input[name=message4]')[0].value = mcodes[1];
  $('input[name=message5]')[0].value = mcodes[2];

  // 送信

  document.login.submit();
});
