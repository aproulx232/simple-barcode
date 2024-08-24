"use client";
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
      <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js" />

      <form onSubmit={handleSubmit}>
        <InputContainer>
          <input name="barcodeInput" placeholder="Enter Barcode Value" />
          <button type="submit">Submit form</button>
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
  justify-content: space-between;
  align-items: center;
  padding: 6rem;
  min-height: 100vh;
`;

const BarcodeContainer = styled.div`
  justify-content: space-between;
  align-items: center;
`;

const InputContainer = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
