"use client";
import Script from "next/script";
import styled from "styled-components";

export default function Home() {
  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    JsBarcode("#barcode", formJson["barcodeInput"].toString());
    console.log(formJson);
  }

  return (
    <Main>
      <Script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js" />
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <Input name="barcodeInput" placeholder="Enter Barcode Value" />
          <SubmitButton type="submit">Submit form</SubmitButton>
        </InputContainer>
      </form>

      <BarcodeContainer>
        <svg id="barcode"></svg>
      </BarcodeContainer>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-height: 100vh;
`;

const Input = styled.input`
  margin: 1rem;
  height: 2rem;
`;

const SubmitButton = styled.button`
  margin: 1rem;
  height: 2rem;
  width: 10rem;
`
const BarcodeContainer = styled.div`
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  
`;

const InputContainer = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
