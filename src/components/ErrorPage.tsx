import { Alert, Container } from "react-bootstrap";

export default function ErrorPage({ message }: { message: string }) {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Alert variant="danger" className="text-center">
        <h4 className="mb-3">Something went wrong!</h4>
        <p>{message}</p>
      </Alert>
    </Container>
  );
}
