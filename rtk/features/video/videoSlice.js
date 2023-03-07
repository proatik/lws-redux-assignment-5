const axios = require("axios");
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const { fetchRelatedVideos } = require("../relatedVideos/relatedVideosSlice");

// initial state.
const initialState = {
  loading: false,
  video: {},
  error: "",
};

// fetch a single video.
const fetchVideo = createAsyncThunk("video/fetchVideo", async (_, thunkAPI) => {
  const url = "http://localhost:9000/videos";

  const response = await axios.get(url);
  const video = await response?.data;

  thunkAPI.dispatch(fetchRelatedVideos(video.tags));

  return video;
});

// video recucer.
const videoSlice = createSlice({
  name: "video",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchVideo.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.video = action.payload;
      })
      .addCase(fetchVideo.rejected, (state, action) => {
        state.loading = false;
        state.video = {};
        state.error = action.error.message;
      });
  },
});

module.exports = videoSlice.reducer;
module.exports.fetchVideo = fetchVideo;
