import "bootstrap/dist/css/bootstrap.css";
const Title = (props) => {
  return (
    <div className="container title">
      <div className="row">
        <div className="d-flex justify-content-start offset-1">
          <p>{props.userName}'s Budget</p>
        </div>
      </div>
    </div>
  );
};

export default Title;
