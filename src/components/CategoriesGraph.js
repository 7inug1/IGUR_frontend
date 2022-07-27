import * as d3 from "d3";
import { useRef, useState, useEffect } from "react";
import useDeepCompareEffect from 'use-deep-compare-effect';
import styled from "styled-components";

const VIEWBOX_X = 1200;
const VIEWBOX_Y = VIEWBOX_X;
const TRANSLATE_X = VIEWBOX_X / 2;
const TRANSLATE_Y = TRANSLATE_X;
const CategoriesGraphHeader = styled.h2`
  font-size: 30px;
  margin-top: 40px;
  margin-bottom: 20px;
`;
const Paragraph = styled.p`
  margin-top: 40px;
  font-size: 25px;
`;

function CategoriesGraph({ posts }) {
  const [categoriesCounter, setCategoriesCounter] = useState({});
  const svgRef = useRef();

  useEffect(() => {
    const getCategoriesCounter = () => {
      let categoriesCounter = {};
  
      if (posts?.length) {
        posts?.forEach((post) => {
          const categories = post.categoriesResult?.categories;
  
          if (categories?.length) {
            const mostRelevantCategory = categories[0];

            categoriesCounter[mostRelevantCategory.name] ? categoriesCounter[mostRelevantCategory.name]++ : categoriesCounter[mostRelevantCategory.name] = 1;
          }
        });
      }

      return categoriesCounter;
    }

    const categoriesCounter = getCategoriesCounter();

    setCategoriesCounter(categoriesCounter);
  }, [posts]);

  useDeepCompareEffect(() => {
    if (Object.keys(categoriesCounter).length) {
      const WIDTH = VIEWBOX_X * (2/3);
      const RADIUS = WIDTH / 2;
      const formattedData = [];
      const FIRST_LINE_LENGTH_SCALE = 0.6;
      const SECOND_LINE_LENGTH_SCALE = 0.8;
      const THIRD_LINE_LENGTH_SCALE = 1;
      const LABEL_POSITION_SCALE = 0.7;
      for (const [key, value] of Object.entries(categoriesCounter)) {
        formattedData.push({category: key, count: value});
      }

      const pieData = d3.pie().value(d => d.count)(formattedData);
      const arc = d3.arc().innerRadius(RADIUS * 0.25).outerRadius(RADIUS * 0.6);
      const outerArc = d3.arc()
        .innerRadius(RADIUS + 0.2)
        .outerRadius(RADIUS + 0.5);
      const color = d3.scaleOrdinal()
        .range(d3.schemeSet3);

      const svg = d3.select(svgRef.current)
        .append('g')
        .attr('transform', `translate(${TRANSLATE_X}, ${TRANSLATE_Y})`);

      const tooldiv = d3.select('#chartArea')
        .append('div')
        .style('visibility', 'hidden')
        .style('position', 'absolute')
        .style('background-color', 'black')
        .style('color', 'white');

      svg.append('g').selectAll('path')
        .data(pieData)
        .join('path')
        .attr('d', arc)
        .attr('fill', (i) => color(i))
        .attr('stroke', 'white')
        .on('mouseover', (event, d) => {
          tooldiv.style('visibility', 'visible')
            .text(`${d.data.category}: ${d.data.count}`)
        })
        .on('mousemove', (event, d) => {
          tooldiv.style('top', (event.pageY - 50) + 'px')
            .style('left', (event.pageX - 50) + 'px')
        })
        .on('mouseout', () => {
          tooldiv.style('visibility', 'hidden')
        });

      svg
        .selectAll('allPolylines')
        .data(pieData)
        .join('polyline')
        .attr("stroke", "black")
        .style("fill", "none")
        .attr("stroke-width", 1)
        .attr('points', (d) => {
          const posA = arc.centroid(d)
          const posB = outerArc.centroid(d)
          const posC = outerArc.centroid(d);
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left

          posC[0] = RADIUS * THIRD_LINE_LENGTH_SCALE * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
          const lines = [posA, posB, posC];

          return lines;
        });

        svg
          .selectAll('allLabels')
          .data(pieData)
          .join('text')
          .text(d => d.data.category)
          .attr('transform', function (d) {
            const pos = outerArc.centroid(d);
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            pos[0] = RADIUS * LABEL_POSITION_SCALE * (midangle < Math.PI ? 1 : -1);
            return `translate(${pos})`;
          })
          .style('text-anchor', function (d) {
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            return (midangle < Math.PI ? 'start' : 'end')
          })
          .style('font-size', "16px");
    }
  }, [categoriesCounter]);

  return (
    <>
        <CategoriesGraphHeader className="categories-graph-header">Categories Graph</CategoriesGraphHeader>
        {
        Object.keys(categoriesCounter).length ?
          <>
            <div id='chartArea'>
              <svg className="categories" ref={svgRef} viewBox={`0 0 ${VIEWBOX_X} ${VIEWBOX_Y}`} />
            </div>
          </> :
          <Paragraph>No categories found.</Paragraph>
        }
    </>
  );
}

export default CategoriesGraph;
