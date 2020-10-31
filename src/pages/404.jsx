import { useSelector } from 'react-redux';

function Error404() {
  const user = useSelector(state => state.user);
  return (
    <div>
  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
  <h1 className="h2"> 404 </h1>
  </div>
  <p> <i className="fas fa-user-astronaut fa-2x"></i> This page is not found </p>
  </div>
  );
}

export default Error404;
