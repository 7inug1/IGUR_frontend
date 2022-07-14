import { useRef, useEffect } from "react";
import styled from "styled-components";

const CanvasFrame = styled.canvas`
  width: 100%;
  object-fit: contain;
`;

function Canvas({ src, prediction, setIsClicked }) {
  const canvasRef = useRef();
  const onCanvasClick = () => {
    setIsClicked(false);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    canvas.width = 640;
    canvas.height = 640;
    img.src = src;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 640, 640);

      if (prediction?.length) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'green';
        ctx.fillStyle = 'green';
        ctx.font = "50px Georgia";

        for (let i = 0; i < prediction.length; i++) {
          ctx.beginPath();
          ctx.rect(...prediction[i].bbox);
          ctx.stroke();
          ctx.fillText(
            (prediction[i].score.toFixed(2)) * 100 + '% ' + prediction[i].class, prediction[i].bbox[0],
            prediction[i].bbox[1] > 10 ? prediction[i].bbox[1] - 5 : 10);
        }
      }
    };
  }, [prediction, src]);

  return (
    <>
      <CanvasFrame ref={canvasRef} onClick={onCanvasClick}></CanvasFrame>
    </>
  )
}

export default Canvas;
