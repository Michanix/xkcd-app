# xkcd comics React app
Small React application with some PWA features that utilizes [xkcd](https://xkcd.com/) public API 
to show comics.

## Installation

```
git clone https://github.com/Michanix/xkcd-app.git
cd xkcd-app
```

## Running

Start backend server first. This is needed because xkcd's API refuses to work directly from React's application.
Server will start on port **5001** so make sure it's not already taken.

```
cd /backend 
npm install
npm start
```

Start frontend. In order to see PWA features in action you need to build frontend part first and
launch with **serve**.
Client will start on port **5000** so make sure it's not already taken.

```
cd client
npm install
npm install -g serve
npm build
serve -s build
```

Go to [http://localhost:5000/](http://localhost:5000/) and read some comics!
