"use client";
import JsBarcode from "jsbarcode";
import styled from "styled-components";
import { useState } from "react";

export default function Home() {
  const [barcodes, setBarcodes] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleSubmit(e: { preventDefault: () => void; target: any; }) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    const barcodeValue = formJson["barcodeInput"].toString();
    setBarcodes(prevBarcodes => [...prevBarcodes, barcodeValue]);
    setCurrentIndex(prevIndex => barcodes.length);
  }

  const handlePrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : barcodes.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex < barcodes.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <Main>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <Input name="barcodeInput" placeholder="Enter Barcode Value" />
          <SubmitButton type="submit">Submit form</SubmitButton>
        </InputContainer>
      </form>

      <CarouselContainer>
        <CarouselButton onClick={handlePrevious}>&lt;</CarouselButton>
        <BarcodeWrapper>
          {barcodes.length > 0 ? (
            <BarcodeContainer>
              <svg id="barcode" ref={el => {
                if (el) {
                  JsBarcode(el, barcodes[currentIndex]);
                }
              }}></svg>
            </BarcodeContainer>
          ) : (
            <EmptyBarcodeMessage>No barcodes yet</EmptyBarcodeMessage>
          )}
        </BarcodeWrapper>
        <CarouselButton onClick={handleNext}>&gt;</CarouselButton>
      </CarouselContainer>
      {barcodes.length > 0 && (
        <BarcodeCounter>
          {currentIndex + 1} / {barcodes.length}
        </BarcodeCounter>
      )}
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
  height: 5rem;
`;

const InputContainer = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 600px; // Adjust this value as needed
  margin: 0 auto;
  padding: 1rem;
`;

const BarcodeWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px; // Adjust this value as needed
`;

const CarouselButton = styled.button`
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const EmptyBarcodeMessage = styled.div`
  text-align: center;
  color: #888;
`;

const BarcodeCounter = styled.div`
  text-align: center;
  margin-top: 1rem;
`;
