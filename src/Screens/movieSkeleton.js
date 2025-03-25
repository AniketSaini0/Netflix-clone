import Skeleton from "react-loading-skeleton";

const MovieSkeleton = ({ count }) => {
  <div>
    <Skeleton
      count={count}
      style={{ height: "100px", width: "100px" }}
    />
  </div>;
};

export default MovieSkeleton;
