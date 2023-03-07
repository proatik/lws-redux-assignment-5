const axios = require("axios");
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

// initial state.
const initialState = {
  loading: false,
  videos: [],
  error: "",
};

// fetch related videos.
const fetchRelatedVideos = createAsyncThunk(
  "relatedVideos/fetchRelatedVideos",
  async (tags) => {
    const query = tags
      ?.map((tag) => `tags_like=${tag}`)
      .concat(["_sort=views", "_order=desc"])
      .join("&");

    const url = `http://localhost:9000/videos?${query}`;

    const response = await axios.get(url);
    const relatedVideos = await response?.data;

    return relatedVideos;
  }
);

// related videos recucer.
const relatedVideosSlice = createSlice({
  name: "relatedVideos",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchRelatedVideos.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchRelatedVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchRelatedVideos.rejected, (state, action) => {
        state.loading = false;
        state.videos = [];
        state.error = action.error.message;
      });
  },
});

module.exports = relatedVideosSlice.reducer;
module.exports.fetchRelatedVideos = fetchRelatedVideos;
