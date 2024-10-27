const PostCard = ({item}) => {
    const {content, _id, createdAt, headLine, userEmail, userId} = item;
  return (
    <div className="">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{headLine}</h2>
          <p>{content}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
