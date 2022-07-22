import { useRef, useEffect } from "react";
import styled from "styled-components";

const CanvasFrame = styled.canvas`
  max-width: 100%;
  display: block;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  margin: 0 auto;
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
        const FONT = "14px Arial";
        const textHeight = parseInt(FONT);

        ctx.lineWidth = 3;
        ctx.font = "bolder " + FONT;

        prediction.forEach((pred) => {
          const text = pred.class;
          const TEXT_WIDTH = ctx.measureText(text).width;
          const TEXT_CENTER_POINT = pred.bbox[0] + (pred.bbox[2] / 2) - (TEXT_WIDTH / 2);
          const PADDING = 7;

          ctx.strokeStyle = "#000";
          ctx.fillStyle = "#000";
          ctx.strokeRect(TEXT_CENTER_POINT - PADDING, pred.bbox[1], TEXT_WIDTH + PADDING + PADDING, textHeight + PADDING);
          ctx.globalAlpha = 0.2;
          ctx.fillRect(...pred.bbox);
          ctx.globalAlpha = 0.9;
          ctx.fillRect(TEXT_CENTER_POINT - PADDING, pred.bbox[1], TEXT_WIDTH + PADDING + PADDING, textHeight + PADDING);
          ctx.globalAlpha = 1.0;
          ctx.strokeStyle = '#000';
          ctx.strokeRect(...pred.bbox);
          ctx.fillStyle = "#fff";
          ctx.fillText(
            text, TEXT_CENTER_POINT,
            pred.bbox[1] + textHeight);
        });
      }
    };
  }, [prediction, src]);

  return (
    <>
      <CanvasFrame ref={canvasRef} onClick={onCanvasClick} className="responsive-canvas"></CanvasFrame>
    </>
  )
}

export default Canvas;
