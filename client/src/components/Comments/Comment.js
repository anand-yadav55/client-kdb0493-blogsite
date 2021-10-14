import './comment.css';
export default function Comment(props) {
  return (
    <div>
      {props.comments.map((item, i) => {
        return (
          <div className="comment" key={i}>
            <div className="commentAuthor">{item.name}</div>
            <div className="commentText">{item.comment}</div>
          </div>
        );
      })}
    </div>
  );
}
