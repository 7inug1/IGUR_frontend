import * as d3 from "d3";
import { useRef, useState, useEffect } from "react";
import useDeepCompareEffect from 'use-deep-compare-effect';
import styled from "styled-components";

const VIEWBOX_X = 1200;
const VIEWBOX_Y = VIEWBOX_X;
const TRANSLATE_X = VIEWBOX_X / 2;
const TRANSLATE_Y = TRANSLATE_X;
const EntitiesGraphHeader = styled.h2`
  font-size: 30px;
  margin-top: 40px;
  margin-bottom: 20px;
`;
const Paragraph = styled.p`
  margin-top: 40px;
  font-size: 25px;
`;

function EntitiesGraph({ posts }) {
  const [entitiesCounter, setEntitiesCounter] = useState({});
  const svgRef = useRef();

  useEffect(() => {
    const getEntitiesCounter = () => {
      let entitiesCounter = {};

      if (posts?.length) {
        posts.forEach((post) => {
          const entities = post.entitiesResult?.entities;

          entities?.forEach((entity) => {
            if (entity.metadata && entity.metadata["wikipedia_url"]) {
              const coreEntity = entity;
              const entityInfoObj = { count: 1 };

              if (entitiesCounter[coreEntity.name]) {
                entitiesCounter[coreEntity.name].count++;
              } else {
                Object.assign(entityInfoObj, { wikipedia_url: coreEntity.metadata["wikipedia_url"] });
                entitiesCounter[coreEntity.name] = entityInfoObj;
              };
            }
          });
        });
      }

      return entitiesCounter;
    }

    const entitiesCounter = getEntitiesCounter();

    setEntitiesCounter(entitiesCounter);
  }, [posts]);

  useDeepCompareEffect(() => {
    if (Object.keys(entitiesCounter).length) {
      const WIDTH = VIEWBOX_X * (2/3);
      const RADIUS = WIDTH / 2;
      const formattedData = [];
      const FIRST_LINE_LENGTH_SCALE = 0.6;
      const SECOND_LINE_LENGTH_SCALE = 0.8;
      const THIRD_LINE_LENGTH_SCALE = 1;
      const LABEL_POSITION_SCALE = 0.4;
      const getAngle = (d) => {
        return (180 / Math.PI * (d.startAngle + d.endAngle) / 2 - 90);
      }

      for (const [key, value] of Object.entries(entitiesCounter)) {
        formattedData.push({ name: key, count: value.count, wikipedia_url: value.wikipedia_url });
      }

      const pieData = d3.pie().value(d => d.count)(formattedData);
      const arc = d3.arc().innerRadius(RADIUS * 0.25).outerRadius(RADIUS * 0.75);
      const outerArc = d3.arc()
      .innerRadius(RADIUS * FIRST_LINE_LENGTH_SCALE)
      .outerRadius(RADIUS * SECOND_LINE_LENGTH_SCALE);
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
        .attr('fill', (d, i) => color(i))
        .attr('stroke', 'white')
        .on('mouseover', (event, d) => {
          tooldiv.style('visibility', 'visible')
            .text(`${d.data.name}: ${d.data.count}`)
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
        .text(d => {
          return `${d.data.name}: ${d.data.count}`;
        })
        .attr('transform', function (d) {
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          const pos = d3.arc().innerRadius(RADIUS * 0.45).outerRadius(RADIUS * 1.1).centroid(d);
          const angle = midangle < Math.PI ? getAngle(d) : getAngle(d) - 180;

          return `translate(${pos}) rotate(${angle})`;
        })
        .attr("text-anchor", d => {
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;

          return midangle < Math.PI ? `start` : `end`;
        })
        .style('font-size', "16px");
    }
  }, [entitiesCounter]);

  return (
    <>
      <EntitiesGraphHeader className="entities-graph-header">Entities Graph</EntitiesGraphHeader>
        {
          Object.keys(entitiesCounter).length ?
          <>
            <div id='chartArea'>
              <svg ref={svgRef} viewBox={`0 0 ${VIEWBOX_X} ${VIEWBOX_Y}`} />
            </div>
          </> :
          <Paragraph>No entities found.</Paragraph>
        }
    </>
  );
}

export default EntitiesGraph;
