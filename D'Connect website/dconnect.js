// dconnect.js - JS for D'Connect main page

$(document).ready(function () {
  let micMuted = false;
  let cameraOff = false;
  const video = document.getElementById('userVideo');

  // Theme toggle
  $('.mode-switch').click(function () {
    $('body').toggleClass('dark');
    $(this).find('i').toggleClass('fa-moon fa-sun');
  });

  // Request camera & mic access
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
      video.srcObject = stream;
      window.currentStream = stream;
    })
    .catch(err => {
      alert("Camera or microphone permission denied.");
    });

  // Mute/Unmute
  $('.mic').click(function () {
    micMuted = !micMuted;
    const audioTracks = window.currentStream.getAudioTracks();
    if (audioTracks.length > 0) audioTracks[0].enabled = !micMuted;
    $(this).find('i').toggleClass('fa-microphone fa-microphone-slash');
  });

  // Camera On/Off
  $('.camera').click(function () {
    cameraOff = !cameraOff;
    const videoTracks = window.currentStream.getVideoTracks();
    if (videoTracks.length > 0) videoTracks[0].enabled = !cameraOff;
    $(this).find('i').toggleClass('fa-video fa-video-slash');
  });

  // Fullscreen
  $('.fullscreen').click(function () {
    const elem = video;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      elem.requestFullscreen();
    }
  });

  // End Call
  $('.endcall').click(function () {
    if (window.currentStream) {
      window.currentStream.getTracks().forEach(track => track.stop());
    }
    $('#userVideo').attr('srcObject', null);
    alert("Call Ended");
  });

  // Chat functionality
  $('#chatInput').keypress(function (e) {
    if (e.which === 13 && this.value.trim()) {
      $('#chatMessages').append(`<div><strong>You:</strong> ${this.value}</div>`);
      this.value = '';
      $('#chatMessages').scrollTop($('#chatMessages')[0].scrollHeight);
    }
  });

  // Toggle chat visibility
  $('#chat-toggle').click(function () {
    $('#chatbox').toggle();
  });
});
