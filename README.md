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
    res.sendFile(__dirname + '/index.html');
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
    console.log('a user connected', socket);
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
