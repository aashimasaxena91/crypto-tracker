import { Spinner } from "react-bootstrap";

export default function FullPageLoader() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Spinner animation="border" variant="primary" role="status" />
    </div>
  );
}
