import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../services/apiServices';
import { Story } from '../type/type';

export const fetchStories = createAsyncThunk('stories/fetchStories', async () => {
    const result = await fetchData('storys');
    return result;
  });
  
  const storySlice = createSlice({
    name: 'stories',
    initialState: { data: [] as Story[], status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed' },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchStories.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchStories.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.data = action.payload;
        })
        .addCase(fetchStories.rejected, (state) => {
          state.status = 'failed';
        });
    },
  });
  
  export default storySlice.reducer;