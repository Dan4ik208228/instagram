import service from '../services/service';

const { toServer, fromServer } = service();

const allState = {
    data: [],
    defaultPosts: [],
    loading: false,
    maxId: 0,
    sliderWidth: 0,
    maxSlides: 0,
    slides: []
}

const reducer = (state = allState, action) => {
    switch (action.type) {
        case "GET_DATA":
            const {logData} = action;
            console.log(logData);
            let newMaxId = state.maxId;

            for (const key in logData.data) {
                if (logData.data[key].id >= newMaxId) {
                    newMaxId = logData.data[key].id;
                }
            }

            logData.data.sort((a, b) => b.likes - a.likes);

            return {
                ...state,
                defaultPosts: logData.data.slice(0, 20),
                slides: logData.data.slice(0, 5),
                data: logData.data,
                maxId: newMaxId,
                loading: false
            };
        case "ONLIKE":
            const refreshedData = state.data.map(item => {
                if (item.id === action.id) {
                    item.likes = action.ifLike ? item.likes - 1 : item.likes + 1;
                    item.ifLike = !action.ifLike;
                }
                return item;
            });

            refreshedData.sort((a, b) => b.likes - a.likes);
            toServer('posts', refreshedData);

            return {
                ...state,
                loading: false,
                defaultPosts: refreshedData.slice(0, 20),
                slides: refreshedData.slice(0, 5),
                data: refreshedData
            };
        case "ONDELETE":
            const deleteData = state.data.filter(item => item.id !== action.id);
            deleteData.sort((a, b) => b.likes - a.likes);
            toServer('posts', deleteData);

            return {
                ...state,
                loading: false,
                defaultPosts: deleteData.slice(0, 20),
                slides: deleteData.slice(0, 5),
                data: deleteData
            };
        case "ADDPOST":
            const {items: item} = action;
            const newItem = { text: item[0], likes: 0, ifLike: false, img: item[1], id: state.maxId + 1 };
            const newData = [...state.data, newItem];
            newData.sort((a, b) => b.likes - a.likes);

            toServer('posts', newData);

            return {
                ...state,
                data: newData,
                detaultPosts: newData.slice(0, 20),
                slides: newData.slice(0, 5),
                maxId: state.maxId + 1,
                loading: false
            };
        case "START_LOAD":
            return {
                ...state,
                loading: true
            };
        case "SET_SLIDER_WIDTH":
            return {
                ...state,
                sliderWidth: action.width
            }
        case "SET_MAX_SLIDES":
            return {
                ...state,
                maxSlides: action.slides
            }
        default:
            return state
    }
}

export default reducer;