// Write your code here
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, toggleIsLiked, deleteComment} = props
  const {name, comment, date, isLiked, initialColor, id} = commentDetails
  const initial = name ? name[0].toUpperCase() : ''
  const time = formatDistanceToNow(date)
  const likeImg = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeTextClassName = isLiked ? 'button active' : 'button'

  const deletion = () => {
    deleteComment(id)
  }

  const onClickLike = () => {
    toggleIsLiked(id)
  }

  return (
    <li className="comment-item">
      <div className="comment-container">
        <div className={`initial-container ${initialColor}`}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div className="name-time-container">
            <p className="name">{name}</p>
            <p className="time">{time} ago</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="buttons-container">
        <div className="like-container">
          <img className="like-img" src={likeImg} alt="like" />
          <button
            type="button"
            onClick={onClickLike}
            className={likeTextClassName}
          >
            Like
          </button>
        </div>
        <button
          className="button"
          type="button"
          onClick={deletion}
          data-testId="delete"
        >
          <img
            className="delete"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="line" />
    </li>
  )
}
export default CommentItem
