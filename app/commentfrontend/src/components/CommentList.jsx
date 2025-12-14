import React, { useState, useEffect } from "react";
import { ListItem, ListItemLabel } from "baseui/list";
import { useStyletron } from "baseui";
import axios from "axios";
import { FaRegUserCircle } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";

import { MdDelete } from "react-icons/md";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";

export default function CommentList() {
  const [css] = useStyletron();
  
  // 1️⃣ Initialize as empty array
  const [commentsList, setCommentsList] = useState([]);

  const handleCommentsList = async () => {
   
    try {
      const response = await axios.get("http://127.0.0.1:5000/comments");

      // 2️⃣ Set state correctly
      setCommentsList(response.data.comments);

      // This will log correct API data
      console.log("API data:", response.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
   


  };
  const handlelike = async(commentid) => {
    console.log("Like button clicked");
    const response = await axios.post(`http://127.0.0.1:5000/likecomment/${commentid}`,{});
    console.log(response);
          window.location.reload();

  }
  const handledislike = async(commentid) =>{
    console.log("Dislike button clicked");
    const response = await axios.post(`http://127.0.0.1:5000/dislikecomment/${commentid}`,{});
    console.log(response);
          window.location.reload();


}
const handleDelete = async(commentid) => {
  console.log("Delete button clicked");
  const response = await axios.post(`http://127.0.0.1:5000/deletecomment/${commentid}`,{});
  console.log(response);
        window.location.reload();
}
  useEffect(() => {
    handleCommentsList();
  }, []);

  // 3️⃣ Use useEffect to see updated state
  useEffect(() => {
    console.log("Updated state:", commentsList);
  }, [commentsList]);

  return (
    <ul
      className={css({
        width: "375px",
        paddingLeft: 0,
        paddingRight: 0,
      })}
    >
      {commentsList.map((comment) => (
        <ListItem key={comment.id}>
           
         
          
          <ListItemLabel  className={css({
       justifyContent: "space-between",
       alignItems: "center",
        display: "flex",
        justifyItems: "center",
      })} >
        <FlexGrid
      flexGridColumnCount={2}
      flexGridColumnGap="scale4800"
      flexGridRowGap="scale800"
    >
      
        <FlexGridItem >
        <div className={css({
        display: "flex",
        justifyContent: "center",
        alignItems: "left",
        gap: "8px",

      })}>
        <div className={css({
          display:"flex",
          alignItems:"center",
        })}>
            <FaRegUserCircle  />
</div>
            <strong>{comment.username}:</strong> {comment.text}
            </div>
           
            
             <div className={css({
        display: "flex",
        alignItems: "right",
        gap: "8px",
      })}>
            <button onClick={()=>handlelike(comment.id)}>
              
             
            <SlLike />
            </button >
            {comment.likes}
            <button onClick={()=>handledislike(comment.id)}>
            <SlDislike />
            </button >
            {comment.dislikes}
            </div>
            </FlexGridItem>
            <FlexGridItem >
<div className={css({
        display: "flex",
        alignItems: "right",
        gap: "8px",
      })}>
  <button onClick={()=>handleDelete(comment.id)}>
    <MdDelete />

  </button>
</div>
            </FlexGridItem>
             </FlexGrid>
          </ListItemLabel>
         
        </ListItem>
      ))}
    </ul>
  );
}
