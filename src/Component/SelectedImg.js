import React from 'react'
import {saveAs} from "file-saver";

function SelectedImg({click,setPop}) {

  const handleDownload=async()=>{
    saveAs(click?.urls?.full, "Tar'sImage");
  }

  return (
    <div>  
    <img className="fullImg" src={click?.urls?.full}></img>
    <div className="downloadBtn" onClick={handleDownload}>Download Image</div>
    </div>
  )
}

export default SelectedImg