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
      const getAngle = (d) => {
        return (180 / Math.PI * (d.startAngle + d.endAngle) / 2 - 90);
      }

      for (const [key, value] of Object.entries(categoriesCounter)) {
        formattedData.push({category: key, count: value});
      }

      const pieData = d3.pie().value(d => d.count)(formattedData);
      const arc = d3.arc().innerRadius(RADIUS * 0.25).outerRadius(RADIUS * 0.35);
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
      .selectAll('allLabels')
      .data(pieData)
      .join('text')
      .text(d => d.data.category)
      .attr('transform', function (d) {
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        const pos = d3.arc().innerRadius(RADIUS * 0.65).outerRadius(RADIUS * 0.1).centroid(d);
        const angle = midangle < Math.PI ? getAngle(d) : getAngle(d) - 180;

        return `translate(${pos}) rotate(${angle})`;
      })
      .attr("text-anchor", d => {
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;

        return midangle < Math.PI ? `start` : `end`;
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
