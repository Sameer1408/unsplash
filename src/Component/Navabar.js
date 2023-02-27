import React,{useState} from 'react'
import { useHistory, useLocation } from 'react-router'
import {
  Link
} from "react-router-dom";
import ToggleSwitch from './ToggleSwitch';
import actions, { getPicsAction, searchImageAction,getRelatedWordsAction,emptyWord } from "../actions/actions"
import { useDispatch,useSelector } from 'react-redux';
import { CiSearch} from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";

export default function Navabar({checked,setChecked,setShowDiv,search,setSearch,page}) {
  const dispatch = useDispatch();
  let history = useHistory();
  
const getPics =  async() => {
    setShowDiv(true);
    dispatch(getPicsAction(page))
}

const searchChange = async (e) => {
  setShowDiv(false); 
  setSearch(e.target.value);
  dispatch(getRelatedWordsAction(e.target.value));
   dispatch(searchImageAction(e.target.value,page));
    // setImageArr(json.results);
    if (e.target.value == "") {
        getPics();
    }
}

  return (
        <nav className={`navbar nav navbar-expand-lg ${checked?"navbar-dark ":"navbar-light bg-light"}`}
        style={{backgroundColor:`${checked?"#000":"#fff"}`}}
        >
  <Link class="navbar-brand" to="/">Image Gallery</Link>
  <CiSearch className="searchLensNav"/>
  <input type="" value={search}  onChange={searchChange}  className="form-control inputStyle searchNav" />
  {
    search.length>0?
  <RxCross1 className="rxCrossN" onClick={()=>{
                       setSearch("");
                       getPics();
                       dispatch(emptyWord());
                   }}
                   />
                   :null
  }

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <Link class="nav-link" to="/">Explore </Link>
      </li>
      <li class="nav-item active">
        <Link class="nav-link" to="/">Collection </Link>
      </li>
      <li class="nav-item active">
        <Link class="nav-link" to="/">Community </Link>
      </li>
    </ul>
    
    {
      checked?<p className="mode" style={{color:"white"}}>Dark mode</p>:<p className="mode" >Light mode</p>
    }
    <ToggleSwitch checked={checked} setChecked={setChecked} />
  </div>
</nav>
    )
}
