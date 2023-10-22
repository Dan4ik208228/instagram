import {PostData} from "../services/service";

export const getAll = (data: PostData[]) => ({
    type: "GET_DATA",
    logData: data
});

export const addPost = (items: PostData[]) => ({
    type: "ADDPOST",
    items
});

export const startLoad = () => ({
    type: "START_LOAD"
});

export const setSliderWidth = (width: number) => ({
    type: "SET_SLIDER_WIDTH",
    width
});

export const setMaxSlides = (slides: number) => ({
    type: "SET_MAX_SLIDES",
    slides
});