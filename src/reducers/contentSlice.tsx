import { createSlice } from '@reduxjs/toolkit'
import * as API from '../API'

const initialState = {
    data: [],
    error: null
}

const contentSlice = createSlice({
    name: 'content',
    initialState: initialState,
    reducers: {
        getContentSuccess: (state, action) => ({ data: action.payload, error: null }),
        getContentFailed: (state, action) => ({ data: [], error: action.payload }),
        deleteContent: (state, action) => initialState
    }
})

export const getContent = (url: string) => async dispatch => {
    try {
        const response = await API.getContent(url)
        if (response.status === 200) {
            dispatch(getContentSuccess(Object.keys(response.data)))
        } else throw new Error(`${response.status} ${response.statusText}`)
    } catch (e) {
        dispatch(getContentFailed(e.toString()))
    }
}

export const { getContentSuccess, getContentFailed, deleteContent } = contentSlice.actions

export default contentSlice.reducer