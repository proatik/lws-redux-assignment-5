const store = require("./rtk/app/store");

const { fetchVideo } = require("./rtk/features/video/videoSlice");

store.dispatch(fetchVideo());
