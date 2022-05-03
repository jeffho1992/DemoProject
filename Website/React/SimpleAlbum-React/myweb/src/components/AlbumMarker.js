import React from 'react';
import SingleImage from './SingleImg';

class AlbumMaker extends React.Component{
  render(){
    return(
        <div className=".flex-containe">
          <SingleImage src="../img/elaicheesecake.png" caption="caption 1"/>
          <SingleImage src="../img/uthappizza.png" caption="caption 2"/>
          <SingleImage src="../img/vadonut.png" caption="caption 3"/>
          <SingleImage src="../img/zucchipakoda.png" caption="caption 4"/>
        </div>
    )
  }

}

export default AlbumMaker;
