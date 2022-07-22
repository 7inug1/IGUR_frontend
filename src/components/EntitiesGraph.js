import * as d3 from "d3";
import { useRef, useState, useEffect } from "react";
import useDeepCompareEffect from 'use-deep-compare-effect';

const VIEWBOX_X = 800;
const VIEWBOX_Y = VIEWBOX_X;
const TRANSLATE_X = VIEWBOX_X / 2;
const TRANSLATE_Y = TRANSLATE_X;

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

      for (const [key, value] of Object.entries(entitiesCounter)) {
        formattedData.push({ name: key, count: value.count, wikipedia_url: value.wikipedia_url });
      }

      const pieData = d3.pie().value(d => d.count)(formattedData);
      const arc = d3.arc().innerRadius(RADIUS / 2).outerRadius(RADIUS);
      const outerArc = d3.arc()
        .innerRadius(RADIUS * 1.1)
        .outerRadius(RADIUS * 1.1);
      const color = d3.scaleOrdinal()
        // .domain(Object.keys(formattedData))
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
          .selectAll('allPolylines')
          .data(pieData)
          .join('polyline')
          .attr("stroke", "black")
          .style("fill", "none")
          .attr("stroke-width", 1)
          .attr('points', (d) => {
            const posA = arc.centroid(d) // line insertion in the slice
            const posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
            const posC = outerArc.centroid(d); // Label position = almost the same as posB
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left

            posC[0] = RADIUS * 1.1 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left

            return [posA, posB, posC];
          });
      
          svg
          .selectAll('allLabels')
          .data(pieData)
          .join('text')
            .text(d => d.data.name)
            .attr('transform', function(d) {
                const pos = outerArc.centroid(d);
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                pos[0] = RADIUS * 0.99 * (midangle < Math.PI ? 1 : -1);
                return `translate(${pos})`;
            })
            .style('text-anchor', function(d) {
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                return (midangle < Math.PI ? 'start' : 'end')
            })
    }
  }, [entitiesCounter]);

  return (
    <>
        {
          Object.keys(entitiesCounter).length ?
          <>
            <h2>Entities Graph</h2>
            <div id='chartArea'>
              <svg ref={svgRef} viewBox={`0 0 ${VIEWBOX_X} ${VIEWBOX_Y}`} />
            </div>
          </> :
          ""
        }
    </>
  );
}

export default EntitiesGraph;
