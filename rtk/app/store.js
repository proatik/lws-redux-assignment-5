const { configureStore } = require("@reduxjs/toolkit");
const { createLogger } = require("redux-logger");

const videosReducer = require("../features/video/videoSlice");
const relatedVideosReducer = require("../features/relatedVideos/relatedVideosSlice");

const logger = createLogger();

const store = configureStore({
  reducer: {
    video: videosReducer,
    relatedVideos: relatedVideosReducer,
  },
  middleware: (getDefaultMiddlewares) => {
    return getDefaultMiddlewares().concat(logger);
  },
});

module.exports = store;
