import logo from './logo.svg';
import './App.css';
import CommentPage from './components/CommentPage';
import CommentList from './components/CommentList';
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import react, {useEffect, useState} from 'react';
import axios from 'axios';
function App() {
 
  return (
    <>

    <FlexGrid
      flexGridColumnCount={1}
      flexGridColumnGap="scale800"
      flexGridRowGap="scale800"
    >
      <FlexGridItem ><CommentPage/></FlexGridItem>
      <FlexGridItem ><CommentList /></FlexGridItem>
    
    </FlexGrid>


 
 </>
  );
}

export default App;
