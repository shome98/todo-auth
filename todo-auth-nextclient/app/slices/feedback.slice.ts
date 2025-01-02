import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedbacks, createFeedback } from '@/app/actions/feedback.action';

interface Feedback {
    _id: string;
    userId: string;
    username: string;
    feedback: string;
}

interface FeedbackState {
    feedbacks: Feedback[];
    loading: boolean;
    error: null | string;
}

const initialState: FeedbackState = {
    feedbacks: [],
    loading: false,
    error: null,
};

// Async thunks for API requests
export const fetchFeedbacks = createAsyncThunk('feedbacks/fetchFeedbacks', async (_, { rejectWithValue }) => {
    try {
        const response = await getFeedbacks();
        return response.data; // Return feedbacks data
    } catch (error) {
        return rejectWithValue(`Failed to fetch feedbacks ${error}`);
    }
});

export const addNewFeedback = createAsyncThunk('feedbacks/addFeedback', async (feedback: { userId: string; username?: string; feedback: string }, { rejectWithValue }) => {
    try {
        const response = await createFeedback(feedback);
        return response; // Return created feedback data
    } catch (error) {
        return rejectWithValue(`Failed to add feedback ${error}`);
    }
});

// Slice
const feedbackSlice = createSlice({
    name: 'feedbacks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeedbacks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFeedbacks.fulfilled, (state, action) => {
                state.loading = false;
                state.feedbacks = action.payload; // Set feedbacks data
            })
            .addCase(fetchFeedbacks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(addNewFeedback.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNewFeedback.fulfilled, (state, action) => {
                state.loading = false;
                state.feedbacks.push(action.payload); // Add new feedback to state
            })
            .addCase(addNewFeedback.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default feedbackSlice.reducer;