/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from "react";
import * as d3 from "d3";

function SentimentsGraph({ posts }) {
  const svgRef = useRef();
  const [sentiments, setSentiments] = useState(null);
  
  useEffect(() => {
    console.log("posts", posts);
    const getSentiments = () => {
      let sentiments = [];

      if (posts?.length) { 
        posts.forEach((post) => {
          const postId = post.id;
          const documentSentimentMagnitude = post.sentimentsResult.documentSentiment.magnitude;
          const documentSentimentScore = post.sentimentsResult.documentSentiment.score;

          sentiments.push({ postId, documentSentimentMagnitude, documentSentimentScore });
        });
      }

      setSentiments(sentiments);
    }

    getSentiments();
  }, [posts]);

  const [data] = useState([20, 10, 14, 13, 15]);

  useEffect(() => {
    if (sentiments?.length) {
      console.log("sentiments", sentiments);
    }

    if (sentiments?.length) {
      const WIDTH = 600;
      const HEIGHT = 100;

      const svg = d3.select(svgRef.current)
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
        .style('margin-top', '50')
        .style('overflow', 'visible');
      
      const xScale = d3.scaleLinear()
        .domain([0, sentiments.length - 1])
        .range([0, WIDTH]);
      
      const yScale = d3.scaleLinear()
        .domain([-1, 1])
        .range([HEIGHT, -1]);
      
      const y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.value; })])
      .range([ HEIGHT, 0 ]);
      
      const generateScaledLine = d3.line()
        // .x((d) => xScale(d.postId))
        .x((d, index) => xScale(index))
        // .y(yScale)
        .y(function(d) { return y(d.documentSentimentScore) })
      const xAxis = d3.axisBottom(xScale)
        .ticks(sentiments.length)
        .tickFormat(i => i + 1);
      const yAxis = d3.axisLeft(yScale)
        .ticks(5);
      svg.append('g')
        .call(xAxis)
        .attr('transform', `translate(0, ${HEIGHT/2})`);
      svg.append('g')
        .call(yAxis);
      
      svg.selectAll('.line')
        .data(data)
        .join('path')
        .attr('d', d3.line()
          .x(function(data, index) { return xScale(index) })
          .y(function(data) { return yScale(data.id) })
          )
        .attr('d', sentiments => generateScaledLine(sentiments))
        .attr('fill', 'none')
        .attr('stroke', 'black');
    }
  }, [sentiments]);

  // const getSentimentsData = () => {
  //   const array = [];
  //   const sentenceArray = [];

  //   posts.map((post, index) => {
  //     const documentSentiment = post.sentimentsResult.documentSentiment;
  //     const documentSentimentMagnitude = Math.round(documentSentiment.magnitude * 100) / 100;
  //     const documentSentimentScore = Math.round(documentSentiment.score * 100) / 100;

  //     const sentences = post.sentimentsResult.sentences;
      
  //     sentences.forEach((sentence, index) => {
  //       sentenceArray.push(<><div>sentence - {sentence.text.content}</div><div>{sentence.sentiment.magnitude}</div><div>{sentence.sentiment.score}</div></>);
  //     });

  //     array.push(
  //       <div>
  //         <div>{index} <span>magnitude: {documentSentimentMagnitude}</span> score: <span>{documentSentimentScore}</span></div>
  //       </div>
  //     );
  //   });

  //   return array;
  // }
  
  return (
    <>
      {/* {printSentiments()} */}
      <div id='chartArea'>
        <svg ref={svgRef} />
      </div>
    </>
  );
}

export default SentimentsGraph;
