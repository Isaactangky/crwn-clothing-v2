import styled from "styled-components";
import Button from "../button/button.component";
export const PaymentFromContainer = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.form`
  height: 100px;
  min-width: 500px;
`;

export const PaymentButton = styled(Button)`
  margin-left: auto;
  margin-top: 30px;
`;

export const TestMessage = styled.p`
  padding: 0px 100px;
  font-weight: bold;
  text-align: center;
  color: red;
  margin-bottom: 30px;
`;
