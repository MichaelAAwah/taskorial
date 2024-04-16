import { useState } from "react";
import { Form, Button, Container, Alert, Spinner } from "react-bootstrap";
import { Head } from "./Head";
import axios from "axios";

/**
 * Function to add two numbers
 * @returns rendered react html
 */

interface AlertMessage {
  type: string,
  message: string
}

export const ChangeEmail = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<AlertMessage | null>(null)

  const updateEmail = (e: any) => {
    e.preventDefault();
    const configuration = {
      method: "post",
      url: `${process.env.REACT_APP_API_URL}change-email`,
      data: {
        email,
      },
    };

    setIsLoading(true)
    axios(configuration)
      .then((result) => {
        setIsLoading(false)
        console.log(result)
        setMessage({ type: 'success', message: 'Successfully updated email.' })
      })
      .catch(() => {
        setIsLoading(false)
        setMessage({ type: 'danger', message: 'There was an error. Please try again later.' })
        return;
      });
  };

  return (
    <Container>
      <Head title="Change Email" slug="change-email" desc="Change your email" />
      <Form>
        {message && (
          <>
            <br />
            <Alert variant={message.type} dismissible onClose={() => setMessage(null)}>
              {message.message}
            </Alert>
          </>
        )}

        <>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </Form.Group>

          <Button
            variant="primary"
            onClick={(e) => updateEmail(e)}
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner animation="border" role="status" size="sm">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <>Update email</>
            )}
          </Button>
        </>

      </Form>
    </Container>
  );
};
