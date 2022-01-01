import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './ImageView.css'
function ImageView(props) {
    const content = (
        <CSSTransition
          in={props.show}
          timeout={200}
          classNames="slide-in"
          mountOnEnter
          unmountOnExit
        >
          <div className="side-drawer center" onClick={props.onClick}>{props.children}</div>
        </CSSTransition>
      );
      return ReactDOM.createPortal(content, document.getElementById('image-view'));
    
}

export default ImageView
