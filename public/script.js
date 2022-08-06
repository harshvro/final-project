let userName = prompt("Enter your name.");


var socket = io();

  var messages = document.getElementById('messages');
  var form = document.getElementById('form');
  var input = document.getElementById('input');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message',userName + " : " + input.value);
      input.value = '';
    }
  });

  socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    item.className = "chatText";
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });




  let myVideoStream;
  const videoGrid = document.getElementById("myVideoDiv");
  const myVideo = document.createElement("video");
  myVideo.id = "myVideo"
  myVideo.muted = true;
  navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
  })
  .then(function(stream){
      myVideoStream = stream;
      addVideoStream(myVideo, stream);
  });
  const addVideoStream = function(video, stream){
      video.srcObject = stream;
      video.addEventListener("loadedmetadata", function(){
         video.play();
         videoGrid.append(video);
      });
  };
