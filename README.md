# Learn to make YouTube with node.js and react.js

에러시 콘솔과 터미널을 잘 살펴보자.  
그리고 오타 주의하고 주의하고 또 주의!!  
스키마쪽 오타도 꼭 확인!

ffmpeg같은 경우엔 맥은 brew로 install하면 되는것 같지만
윈도우로 사용할땐 아래와같이 설치하고 세팅해줘야 한다.  
참고링크: [https://jjjhong.tistory.com/m/17]

```javascript
npm install --save @ffmpeg-installer/ffmpeg
npm install --save @ffprobe-installer/ffprobe
npm install fluent-ffmpeg


const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

```
