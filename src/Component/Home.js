import React, { useEffect, useState } from 'react'
import SelectedImg from './SelectedImg';
import { FaInstagram } from 'react-icons/fa';
import { BiLike } from "react-icons/bi";
import { saveAs } from "file-saver";
import { CiSearch, CiTwitter } from "react-icons/ci";
import actions, { getPicsAction, searchImageAction, getRelatedWordsAction, emptyWord } from "../actions/actions"
import { useDispatch, useSelector } from 'react-redux';
import { RxCross1 } from "react-icons/rx";
import { AiFillPlusSquare } from "react-icons/ai";

function Home({ checked, showDiv, searchNav, page, setPage }) {

    const dispatch = useDispatch();
    const { AllImages, RelatedWords } = useSelector(state => state);

    const [search, setSearch] = useState("");
    const [clickedImg, setClickedImg] = useState({});

    const getPics = async () => {
        dispatch(getPicsAction(page))
    }

    const getRelatedWords = (word) => {
        dispatch(getRelatedWordsAction(word));
    }

    const searchChange = async (word) => {
        setSearch(word);
        getRelatedWords(word);
        dispatch(searchImageAction(word, page));

        if (word == "") {
            getPics(page);
            dispatch(emptyWord());
        }
    }

    const selectedImg = async (ele) => {
        console.log(ele, "onclick");
        setClickedImg(ele);
        if(RelatedWords.length==0)
        {
            dispatch(getRelatedWordsAction("photo"))
       }
    }

    const nextPage = () => {
        if (page + 1 <= 5) {
            setPage(page + 1);
            searchChange(search);
        }
    }

    const prevPage = () => {
        if (page - 1 > 0) {
            setPage(page - 1);
            searchChange(search);
        }
    }


    useEffect(() => {
        getPics();
    }, []);

    return (
        <div style={{ backgroundColor: `${checked ? "#343a40" : "#fff"}` }}>
            {/* {pop==false?
        <> */}

            {showDiv ? <div className="searchDiv">
                <div style={{ position: 'relative', top: "20%" }}>
                    <h3 style={{ textAlign: "center", fontSize: "20px", zIndex: "1", color: "white" }}>Download high quality image by creators</h3>
                    <p style={{ textAlign: "center", fontSize: "10px", zIndex: "1", color: "white" }}>Over 2.4 million+ stock Images by our talented community</p>
                    <CiSearch className="searchLens"/>
                    <input type="text"
                        className="form-control inputStyle search"
                        id=""
                        name=""
                        onChange={(e) => searchChange(e.target.value)}
                        value={search}
                        aria-describedby="emailHelp" placeholder="" />
                    {search.length > 0 ?
                        <RxCross1 className="rxCross" onClick={() => {
                            setSearch("");
                            getPics();
                            dispatch(emptyWord())
                        }}
                        />
                        : null
                    }
                </div>
            </div>
                :
                <div className="contianer" className="searchValue">
                    <h1 className="he" style={{ color: `${checked ? "white" : "black"}` ,width:"400px"}}>{searchNav}</h1>
                </div>
            }
            <div className="row wordsDiv">
                {RelatedWords.length > 0 ?
                    RelatedWords.map(w => {
                        return w?.word?.length > 0 ?
                            <button className={`btn ${checked ? "btn-outline-light " : "btn-outline-dark"} words`} onClick={() => searchChange(w.word)}>{w?.word}</button>
                            : null
                    }) : null
                }
            </div>
            <div className="grid-wrapper">
                {AllImages?.length == 0 ? <h1>loading ..</h1> :
                    AllImages?.map((ele, index) => {
                        console.log(index, "index");
                        return ele.height > ele.width ?
                            <div className="tall carD"
                                style={{ backgroundColor: `${checked ? "black" : "white"}`, color: `${checked ? "white" : "black"}`, borderColor: `${checked ? "#343a40" : "rgb(218, 216, 216)"}` }}
                                onClick={() => selectedImg(ele)} data-toggle="modal" data-target="#exampleModal">
                                <img src={ele?.urls?.regular}></img>
                                <div className="container">
                                    <div class="row">
                                        <div class="">
                                            <img className="userPic" src={ele?.user?.profile_image?.small}></img>
                                        </div>
                                        <div className="userDiv">
                                            <p className="userName" >{ele?.user?.first_name.slice(0, 10)}</p>
                                            <p className="user">@{ele?.user?.username}</p>
                                        </div>
                                        <div class="">
                                            <p className="like"> {ele.likes}</p>
                                            <BiLike style={{ position: "relative", top: "8px",left:"10px" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : <div className="wide carD"
                                style={{ backgroundColor: `${checked ? "black" : "white"}`, color: `${checked ? "white" : "black"}`, borderColor: `${checked ? "#343a40" : "rgb(218, 216, 216)"}` }}
                                onClick={() => selectedImg(ele)} data-toggle="modal" data-target="#exampleModal" >
                                <img src={ele?.urls?.regular} ></img>
                                <div class="container">
                                    <div class="row">
                                        <div class="">
                                            <img className="userPic" src={ele?.user?.profile_image?.small}></img>
                                        </div>
                                        <div className="userDiv">
                                            <p className="userName" >{ele?.user?.first_name.slice(0, 10)}</p>
                                            <p className="user">@{ele?.user?.username}</p>
                                        </div>
                                        <div class="" >
                                            <p className="like"> {ele.likes}</p>
                                            <BiLike style={{ position: "relative", top: "8px",left:"10px" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                    })
                }
            </div>
            <div class="modal fade"
                id="exampleModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-body fullDiv">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <SelectedImg click={clickedImg} />
                        </div>
                        <div class="modal-footer"

                            style={{ borderColor: "transparent", marginTop: "-16px", backgroundColor: `${checked ? "black" : "white"}`, color: `${checked ? "white" : "black"}`, borderColor: `${checked ? "#343a40" : "rgb(218, 216, 216)"}` }}
                        >
                            <div class="container">
                                <div class="row">
                                    <div class="">
                                        <img className="userPicFull" src={clickedImg?.user?.profile_image?.medium}></img>
                                    </div>
                                    <div class="">
                                        <p className="userNameFull">{clickedImg?.user?.name.slice(0, 10)}</p>
                                        <p className="userFull">@{clickedImg?.user?.username}</p>
                                    </div>
                                    <div className="row likeDiv" >
                                        <p> <BiLike style={{ position: "relative", top: "2px" }} />{" "}{clickedImg?.likes}</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <p>
                                        {clickedImg?.user?.social.instagram_username ?
                                            <>
                                                <FaInstagram className="insta" style={{ marginLeft: "10px" }} />/{clickedImg?.user?.social.instagram_username}
                                            </> :
                                            null
                                        }
                                    </p>
                                    <p>
                                        {clickedImg?.user?.social?.twitter_username?.length > 0 ?
                                            <>  <CiTwitter className="insta" style={{ marginLeft: "10px" }} />/{clickedImg?.user?.social.twitter_username}</>
                                            : null
                                        }
                                    </p>
                                </div>
                                {RelatedWords.length > 0 ?
                                    RelatedWords.map(w => {
                                        return w?.word?.length > 0 ?
                                            <button className={`btn ${checked ? "btn-outline-light " : "btn-outline-dark"} words`}
                                             onClick={
                                                 () => {
                                                     searchChange(w.word)
                                                     }}
                                                 data-dismiss="modal" aria-label="Close"
                                              >{w?.word}</button>
                                            : null
                                    }) : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{backgroundColor: `${checked ? "black" : "white"}`, color: `${checked ? "white" : "black"}`,height:"100px" }}>
            <div className="pageNumDiv"  >
                <button disabled={page > 1 ? false : true} className={`btn pageBtn ${!checked ? "btn-dark" : "btn-light"}`}><p style={{ position: "relative", bottom: "4px" }} onClick={prevPage}>-</p></button>
                page : {page}
                <button disabled={page < 5 ? false : true} className={`btn pageBtn ${!checked ? "btn-dark" : "btn-light"}`}> <p style={{ position: "relative", bottom: "4px" }} onClick={nextPage}>+</p> </button>
            </div>
            </div>
        </div>
    )
}

export default Home