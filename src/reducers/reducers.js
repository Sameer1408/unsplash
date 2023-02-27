import { EMPTY_RELATED_WORDS, GET_PICS, GET_RELATED_WORDS, LOADING_FALSE, LOADING_TRUE, SEARCH_IMAGES } from "../actionTypes/actionType";

const initialState = {
  numOfItems:0,
  AllImages:[],
  RelatedWords:[],
  loading:true
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_PICS:
      return {
        ...state,
        AllImages: action.payload,
      };
    case SEARCH_IMAGES:
       return{
        ...state,
        AllImages:action.payload
      }
    case GET_RELATED_WORDS:
    let i =0;
    let temp = [];
    while(i<10 )
      {
          temp[i]=action.payload[i];
          i++;
      }
    return{
        ...state,
        RelatedWords:temp
      }
     
    case EMPTY_RELATED_WORDS:
      return {
        ...state,
        RelatedWords:[]
      }
    case LOADING_TRUE:
      console.log("on");
      return{
        ...state,
        loading:true,
      }

    case LOADING_FALSE:
      console.log("off");
      return{
        ...state,
        loading:false
      }

    default:
      return state;
  }
};

export default reducers;