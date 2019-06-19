import React, { Component } from 'react';
import {
  MdPersonOutline,
  MdMoreVert,
  MdChatBubbleOutline,
  MdFavoriteBorder,
  MdMailOutline,
} from 'react-icons/md';

import './Post.css';

import Edit from './Edit/Edit';

///////////// THIS COMPONENT IS BEING RENDERED IN THE *APP* COMPONENT

export default class Post extends Component {
  constructor() {
    super();

    this.state = {
      editing: false,
      showMasterMenu: false,
    };

    this.hideEdit = this.hideEdit.bind(this);
    this.showEdit = this.showEdit.bind(this);
    this.toggleMasterMenu = this.toggleMasterMenu.bind(this);
    this.hideMasterMenu = this.hideMasterMenu.bind(this);
  }

  // This puts the post into EDIT mode when the EDIT button is clicked from the drop-down
  showEdit() {
    this.setState({ editing: true, showMasterMenu: false });
  }

  // This puts the post back into normal viewing mode when the CANCEL button is clicked
  // This method is passed down to the <Edit /> component via props
  hideEdit() {
    this.setState({ editing: false });
  }

  // This toggles the drop-down when the three dots in the top right corner of a post are clicked
  toggleMasterMenu() {
    this.setState({ showMasterMenu: !this.state.showMasterMenu });
  }

  // This hides the drop-down when the post is clicked anywhere
  hideMasterMenu() {
    if (this.state.showMasterMenu === true) {
      this.setState({ showMasterMenu: false });
    }
  }

  render() {
    const { editing, showMasterMenu } = this.state;
    const { text, date } = this.props;

    return (
      <section className="Post__parent" onClick={this.hideMasterMenu}>
        {/* Three dots in top right corner */}
        <div className="Post__master-controls">
          <MdMoreVert onClick={this.toggleMasterMenu} />
          <div
            className="Post__master-menu"
            style={{ display: showMasterMenu ? 'flex' : 'none' }}
          >
            <span onClick={this.showEdit}>Edit</span>
            <span onClick={() => this.props.deletePostFn(this.props.id)}>Delete</span> 
          </div>
        </div>
        <div className="Post__meta-data">
          <div className="Post__profile-picture">
            <MdPersonOutline />
          </div>
          <span className="Post__name">Boom.Camp</span>
          <span className="Post__handle">@boom.camp</span>
          <span className="Post__date">- {date}</span>
        </div>

        <div className="Post__content">
        {editing ? (
          <Edit
            text={text}
            id={this.props.id}
            hideEdit={this.hideEdit}
            updatePostFn={this.props.updatePostFn}
          />
        ) : (
          <span className="Post__text">{text}</span>
        )}
      </div>

        <div className="Post__user-controls">
          <MdChatBubbleOutline className="Post__control-icon" />
          <MdFavoriteBorder className="Post__control-icon" />
          <MdMailOutline className="Post__control-icon" />
        </div>
      </section>
    );
  }
}
