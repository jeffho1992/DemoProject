import React from 'react';
import './customerCss.css';

class SingleImage extends  React.Component {
  render() {

    const imgPath = '../img/' + this.props.src;


    return(
      <div className='photo-entry-block'>
        <a href={imgPath}>
          <img className='photo-img' src={imgPath} alt={this.props.caption}/>
        </a>
        <h5>{this.props.caption}</h5>
        <h6>{this.props.location}</h6>
      </div>

    )

  }
}

export default SingleImage;
