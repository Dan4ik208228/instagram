import { PostData, server } from '../services/service.ts';

export type StoreState = {
    data: PostData[];
    defaultPosts: PostData[];
    loading: boolean;
    maxId: number;
    sliderWidth: number;
    maxSlides: number;
    slides: PostData[];
}

const allState = {
    data: [],
    defaultPosts: [],
    loading: false,
    maxId: 0,
    sliderWidth: 0,
    maxSlides: 0,
    slides: []
}

const reducer = (state: StoreState = allState, action): StoreState => {
    switch (action.type) {
        case "GET_DATA":
            const { logData } = action;

            console.log(logData);
            let newMaxId = state.maxId;

            for (const key in logData) {
                if (logData[key].id >= newMaxId) {
                    newMaxId = logData[key].id;
                }
            }

            logData.sort((a, b) => b.likes - a.likes);

            return {
                ...state,
                defaultPosts: logData.slice(0, 20),
                slides: logData.slice(0, 5),
                data: logData,
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
            server.toServer('posts', refreshedData);

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
            server.toServer('posts', deleteData);

            return {
                ...state,
                loading: false,
                defaultPosts: deleteData.slice(0, 20),
                slides: deleteData.slice(0, 5),
                data: deleteData
            };
        case "ADDPOST":
            const { params: params } = action;
            console.log(action.params)
            const newItem: PostData = { text: params.text, likes: 0, ifLike: false, img: params.imgUrl, id: state.maxId + 1 };
            const newData: PostData[] = [...state.data, newItem]
            console.log(newData);
            newData.sort((a, b) => b.likes - a.likes);
            server.toServer('posts', newData);

            return {
                ...state,
                defaultPosts: newData.slice(0, 20),
                slides: newData.slice(0, 5),
                maxId: state.maxId + 1,
                data: newData,
                loading: false
            };
        case "START_LOAD":
            return {
                ...state,
                loading: true
            };
        case "STOP_LOAD":
            return {
                ...state,
                loading: false
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