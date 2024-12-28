import {Component} from 'react'
import {v4} from 'uuid'
import './index.css'

import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {name: '', comment: '', commentsList: []}

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = id => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== id),
    })
  }

  renderCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  addComment = event => {
    event.preventDefault()

    const {name, comment} = this.state
    const initialBackgroundColorClassName =
      initialContainerBackgroundClassNames[
        Math.ceil(Math.random() * initialContainerBackgroundClassNames.length) -
          1
      ]

    const newComment = {
      id: v4(),
      name,
      comment,
      date: new Date(),
      isLiked: false,
      initialColor: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  render() {
    const {name, comment, commentsList} = this.state

    return (
      <div className="app-container">
        <div className="input-section-container">
          <h1 className="heading">Comments</h1>
          <div className="comments-input-container">
            <form className="form" onSubmit={this.addComment}>
              <p className="note">Say something about 4.0 Technologies</p>
              <input
                placeholder="Your Name"
                value={name}
                className="name-input"
                type="text"
                onChange={this.onChangeName}
              />
              <textarea
                placeholder="Your Comment"
                value={comment}
                className="comment-input"
                rows="6"
                onChange={this.onChangeComment}
              />
              <button type="submit" className="btn">
                Add Comment
              </button>
            </form>
            <img
              className="commenting-people-img"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
          <hr className="line" />
          <p className="comments-count-container">
            <span className="comments-count count">{commentsList.length}</span>
            Comments
          </p>
          <ul className="comments-list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
