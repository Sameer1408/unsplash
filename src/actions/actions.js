import { GET_PICS, GET_RELATED_WORDS, SEARCH_IMAGES,EMPTY_RELATED_WORDS, LOADING_TRUE, LOADING_FALSE } from "../actionTypes/actionType";


const loadingOn=()=>{
  return (dispatch)=>{
    return dispatch({
      type:LOADING_TRUE
    })
  }
}

const loadingOf=()=>{
  return (dispatch)=>{
    return dispatch({
      type:LOADING_FALSE
    })
  }
}


export const getPicsAction=(page)=>{
  loadingOn();
  return async(dispatch)=>{
      const response = await fetch(`https://api.unsplash.com/photos/?client_id=pquh0APGEekTJtzDxVqY391qx997mC6kqUTPnwcatss&page=${page}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
      // body: JSON.stringify({ username: cred.username, password: cred.password })
  });
  const json = await response.json();
  loadingOf();
    return dispatch({
      type:GET_PICS,
      payload:json
    })
  }
  
}

export const searchImageAction=(word,page)=>{
  // alert("called")
  return async(dispatch)=>{
    const response = await fetch(`https://api.unsplash.com/search/photos/?client_id=pquh0APGEekTJtzDxVqY391qx997mC6kqUTPnwcatss&query=${word}&page=${page}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
      // body: JSON.stringify({ username: cred.username, password: cred.password })
  });
    const json = await response.json();
    console.log(json, "sear");
    return dispatch({
      type:SEARCH_IMAGES,
      payload:json.results
    })
  }
}

export const getRelatedWordsAction=(word)=>{
  return async(dispatch)=>{
    const response = await fetch(`https://api.datamuse.com/words?rel_trg=${word}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
      // body: JSON.stringify({ username: cred.username, password: cred.password })
  });
    const json = await response.json();
    console.log(json, "words");
    return dispatch({
      type:GET_RELATED_WORDS,
      payload:json
    })
  }
}

export const emptyWord=()=>{
  return async(dispatch)=>{
     return dispatch({
      type:EMPTY_RELATED_WORDS,
      payload:[]
    })
  }

}