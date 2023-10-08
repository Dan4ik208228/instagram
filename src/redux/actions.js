export const getAll = (data) => ({
    type: "GET_DATA",
    logData: data
});

export const addPost = (items) => ({
    type: "ADDPOST",
    items
});

export const startLoad = () => ({
    type: "START_LOAD"
});

export const setSliderWidth = (width) => ({
    type: "SET_SLIDER_WIDTH",
    width
});

export const setMaxSlides = (slides) => ({
    type: "SET_MAX_SLIDES",
    slides
});