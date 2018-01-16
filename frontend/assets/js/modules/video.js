export default function initVideo() {
  console.log('video.js init'); // eslint-disable-line

  $('.js-flowplayer').each(function(){
    var video = $(this).data('video');
    var player = flowplayer(this, {
      clip: {
        hlsjs: {
          safari: true
        },
        sources: [
          { type: 'application/x-mpegurl',
            src:  'https://cdn.flowplayer.org/418361/'+video+'.m3u8' },
          { type: 'video/mp4',
            src:  'https://cdn.flowplayer.org/418361/'+video+'.mp4' }
        ]
      },
      hlsQualities: [5,6],
      swfHls: false,
      autoplay: true,
      adaptiveRatio: true,
      loop: true,
      contols: false,
      bgcolor: 'transparent',
      keyboard: false,
      muted: true
    });
    $(this).find('video').attr('playsinline', '');
  });

  $('.js-flowplayer-controls').each(function(){
    var video = $(this).data('video');
    var player = flowplayer(this, {
      adaptiveRatio: true,
      background: true,
      ratio: false,
      bgcolor: '#282828',
      keyboard: false,
      embed: false,
      hlsQualities: [5,6],
      swfHls: false,
      clip: {
        sources: [
          { type: 'application/x-mpegurl',
            src:  'https://cdn.flowplayer.org/418361/'+video+'.m3u8' },
          { type: 'video/mp4',
            src:  'https://cdn.flowplayer.org/418361/'+video+'.mp4' }
        ]
      }
    });
  });
}
