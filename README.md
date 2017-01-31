# NUGA

### Redis
Sessions are stored in Redis. Beware that the app may crash or fail to run if you don't have redis installed and running. You can set up redis without breaking a sweat in these few steps:

```
$wget http://download.redis.io/redis-stable.tar.gz
```
```
$tar xvzf redis-stable.tar.gz && cd redis-stable
```
```
$make && make test
```
If the make test passes then you can go ahead and run the redis server
```
$cd src && ./redis-server
```

### Dependencies
- Node >= 6.0
- Express ~ 4.13
- Webpack ~ 1.13

### Application Structure
```
app/
  - assets/
    - images/
    - javascripts/
    - stylesheets/
      index.js
  - bin/
     www
  - libs/
     ...
  - models/
     ...
  - public/
     ...
  - routes/
     ...
  - specs/
    - libs/
    - models/
    - routes/
  - views/
     ...
  app.js
  package.json
  README.md
  webpack.config.js
  webpack.node.config.js
```
Static assets are kept in the assets directory then compiled and kept in `public/assets`, webpack.config.js
handles bundling of static assets, webpack.node.config.js is used to load hot loader on server
and for other module loading on server-side. `bin/www` is the part of the application that
starts the server and handles server error reporting, custom libraries can be created in `lib/`
then required where/when needed.

### Managing Environment Variables
Environment variables are stored in a .env file at the root of the project. You'll have to create one
`touch .env`. Some important env vars used in the application are listed in the example below:
```
NODE_ENV=development
JAMA_API_KEY=<REDACTED>
JAMA_SECRET=<REDACTED>
JAMA_API_URL=<REDACTED>
```

### Testing
The application uses mocha, chai, and supertest for unit tests. To run tests you'd
have to globally install mocha (`npm install -g mocha`). If you already ran `npm install`
then chai and supertest have been installed with the depenedencies. For running the
specs you simply need `npm test`.


### Working with Stylesheets
The partials are separated into folders including base, components, and layout. The *base*
partials directory is for basic modules of our stylesheet including variables definition module,
mixin declarations, animations, boostraping modules like h5bp and normalize, and other
aspects of the stylesheet that define the base of the project styles. The *components* directory
is for storing reusable components within the application like buttons, hamburger, and grids
which leverages the [bluegrid][2] grid vendor partial. The *layout* stores the rest of the modules
that define the layouts. The *utility* base module stores utility helper classes, *overrides* stores
classes that override plugins or frameworks styles, and *states* stores classes that determine
action states in the application.



[1]: https://www.youtube.com/watch?v=z6ODMDtG6-I
[2]: https://github.com/colbycheeze/bluegrid
