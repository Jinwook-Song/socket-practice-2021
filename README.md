# Practice Socket.io

- Setup
  - npm init
  - nodemon
    - npm i nodemon -D
    - nodemon.json
      ```json
      {
        "ignore": ["src/public/*"],
        "exec": "babel-node src/index.js"
      }
      ```
  - babel
    - npm i @babel/core -D
    - npm i @babel/cli -D
    - npm i @babel/node -D
    - npm i @babel/preset-env -D
    - babel.config.json
      ```json
      {
        "presets": [
          [
            "@babel/preset-env",
            {
              "useBuiltIns": "entry",
              "corejs": 3
            }
          ]
        ]
      }
      ```
  - package.json
    ```json
    "scripts": {
        "dev" : "nodemon",
      },
    ```
    nodemon 은 nodemon.json 파일을 찾아 exec를 실행한다
- Express server
  ```jsx
  import express from 'express';
  import http from 'http';

  const app = express();
  const server = http.createServer(app);
  const port = 3000;

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.htio.on('connection', (socket) => {
    const { id } = socket;
    console.log('🎉 a user connected:', id);
    socket.on('disconnect', () => {
      console.log('🚀 user disconnected:', id);
    });
  });ml');
  });

  server.listen(port, () => {
    console.log(`✅ Listening on http://localhost:${port}`);
  });
  ```
- Integrating Socket.IO
  express로 만든 HTTP server로 socket.io 인스턴스를 초기화 합니다.
  `<script src="/socket.io/socket.io.js"></script>` 를 통해 socket.io-client를 load 합니다.
  Defualt로 host를 연결하기 때문에 URL을 특정하지 않아도 연결이 됩니다.
  ```jsx
  // server.js

  import express from 'express';
  import http from 'http';
  import { Server } from 'socket.io';

  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);

  const port = 3000;

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  io.on('connection', (socket) => {
    const { id } = socket;
    console.log('🎉 a user connected:', id);
    socket.on('disconnect', () => {
      console.log('🚀 user disconnected:', id);
    });
  });

  server.listen(port, () => {
    console.log(`✅ Listening on http://localhost:${port}`);
  });
  ```
  ```html
  <!-- index.html -->
  <script src="/socket.io/socket.io.js"></script>
  <script>
    var socket = io();
  </script>
  ```
- Emit event (client → server)
  유저(socket)가 emit한 `chat message` event를 서버가 get 할 수 있습니다.
  ```jsx
  // chat message
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
  ```
  ```html
  <script src="/socket.io/socket.io.js"></script>
  <script>
    var socket = io();

    var form = document.getElementById('form');
    var input = document.getElementById('input');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
      }
    });
  </script>
  io.on('connection', (socket) => { socket.on('chat message', (msg) => {
  console.log('message: ' + msg); }); });
  ```
- Emit event (server → client)
  이번에는 반대로 서버에서 event를 emit 합니다.
  emit을 통해 모든 socket에 event를 전달 할 수 있습니다.
  broadcast를 사용하면 자신을 제외한 모든 socket에 event를 전달 합니다.
  ```jsx
  io.on('connection', (socket) => {
    socket.broadcast.emit('hi'); // emit everyone except me

    // chat message
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      io.emit('chat message', msg); // emit event to everyone
    });
  });
  ```
  ```html
  <script src="/socket.io/socket.io.js"></script>
  <script>
    var socket = io();

    var messages = document.getElementById('messages');
    var form = document.getElementById('form');
    var input = document.getElementById('input');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
      }
    });

    socket.on('chat message', function (msg) {
      var item = document.createElement('li');
      item.textContent = msg;
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    });
  </script>
  ```
