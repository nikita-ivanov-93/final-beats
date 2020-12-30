(function() {
  let player;
  const playerContainer = $('.player');
  const volumeIcon = $('.player__volume-icon');
  const video = document.querySelector('video');
  const currentVolume = video.volume;
  video.removeAttribute('controls');
  
  video.onplay = () => {
    playerContainer.addClass('player--active');
    playerContainer.addClass('paused');
  }
  video.onpause = () => {
    playerContainer.removeClass('player--active');
    playerContainer.removeClass('paused');
  }
  
  let eventsInit = () => {
    $('.player__start').click(e => {
      e.preventDefault();
      // const btn = $(e.currentTarget);
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
    
    $('.player__playback').click(e => {
      const bar = $(e.currentTarget);
      const clickedPosition = e.originalEvent.layerX;
      console.log(clickedPosition);
      const buttonPositionPercent = clickedPosition / bar.width() * 100 - 1.5;
      const newPlaybackPosition = (video.duration / 100) * buttonPositionPercent;
      
      $('.player__playback-button').css({
        left: `${buttonPositionPercent}%`
      });
      $('.player__playback').css({
        background: `linear-gradient(to right, #E01F3D  ${buttonPositionPercent}%, #333 ${buttonPositionPercent}%)`
      });
      
      video.currentTime = newPlaybackPosition;
      video.play();
    })
    
    
    $('.player__splash').click(e => {
      video.play();
    })
  
    
    $('.player__volume').click(e => {
      const volume = $(e.currentTarget);
      const clickedPositionVolume = e.originalEvent.layerX;
      const volumePositionPercent = clickedPositionVolume / volume.width() * 100 - 10;
      
      $('.player__volume-button').css({
        left: `${volumePositionPercent}%`
      });
      $('.player__volume').css({
        background: `linear-gradient(to right, #E01F3D  ${volumePositionPercent}%, #333 ${volumePositionPercent}%)`
      });
      
      volumeIcon.removeClass('muted');
      
      video.volume = volumePositionPercent / 100;
    })
    $('.player__volume-icon').click(() => {
      console.log(video.muted);
      if (video.volume === 0) {
        video.volume = currentVolume;
        volumeIcon.removeClass('muted');
        $('.player__volume').css({
          background: `linear-gradient(to right, #E01F3D  100%, #333 0%)`
        });
        $('.player__volume-button').css('left','90%');
      } else {
        video.volume = 0;
        volumeIcon.addClass('muted');
        $('.player__volume').css({
          background: `linear-gradient(to right, #E01F3D  0%, #333 0%)`
        });
        $('.player__volume-button').css('left','0%');
      }
    });  
  }
  
  
  video.oncanplay = () => {
    let interval;
    const durationSec = video.duration;
    
    if (typeof interval != 'undefined') {
      clearInterval(interval);
    }
    
    interval = setInterval(() => {
      const completedSec = video.currentTime;
      const completedPercent = completedSec/durationSec * 100;
      $('.player__playback-button').css({
        left: `${completedPercent}%`
      });
      $('.player__playback').css({
        background: `linear-gradient(to right, #E01F3D  ${completedPercent}%, #333 ${completedPercent}%)`
      });
    }, 1000);
  }
  
  
  eventsInit();

})()


