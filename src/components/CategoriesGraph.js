import * as d3 from "d3";
import { useRef, useState, useEffect } from "react";
import useDeepCompareEffect from 'use-deep-compare-effect';

const VIEWBOX_X = 800;
const VIEWBOX_Y = VIEWBOX_X;
const TRANSLATE_X = VIEWBOX_X / 2;
const TRANSLATE_Y = TRANSLATE_X;

function CategoriesGraph({ posts }) {
  const [categoriesCounter, setCategoriesCounter] = useState({});

  useEffect(() => {
    const getCategoriesCounter = () => {
      let categoriesCounter = {};
  
      if (posts?.length) {
        posts?.forEach((post) => {
          const categories = post.categoriesResult?.categories;
  
          if (categories?.length) {
            const mostRelevantCategory = categories[0];

            categoriesCounter[mostRelevantCategory.name] ? categoriesCounter[mostRelevantCategory.name]++ : categoriesCounter[mostRelevantCategory.name] = 1;
          } else {
            categoriesCounter["undefined"] ? categoriesCounter["undefined"]++ : categoriesCounter["undefined"] = 1;
          }
        });
      }

      return categoriesCounter;
    }

    const categoriesCounter = getCategoriesCounter();

    setCategoriesCounter(categoriesCounter);
  }, [posts]);

  const svgRef = useRef();

  useDeepCompareEffect(() => {
    if (Object.keys(categoriesCounter).length) {
      const WIDTH = VIEWBOX_X * (2/3);
      const RADIUS = WIDTH / 2;
      const formattedData = [];

      for (const [key, value] of Object.entries(categoriesCounter)) {
        formattedData.push({category: key, count: value});
      }

      const pieData = d3.pie().value(d => d.count)(formattedData);
      console.log("pieData", pieData);
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
        .text(d => d.data.category)
        .attr('transform', function (d) {
          const pos = outerArc.centroid(d);
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
          pos[0] = RADIUS * 0.99 * (midangle < Math.PI ? 1 : -1);
          return `translate(${pos})`;
        })
        .style('text-anchor', function (d) {
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
          return (midangle < Math.PI ? 'start' : 'end')
        })
        .style('font-size', 18);
    }
  }, [categoriesCounter]);

  return (
    <>
        {
        Object.keys(categoriesCounter).length ?
          <>
            <h2>Categories Graph</h2><div id='chartArea'>
            <svg ref={svgRef} viewBox={`0 0 ${VIEWBOX_X} ${VIEWBOX_Y}`} />
            </div>
          </> :
          ""
        }
    </>
  );
}

export default CategoriesGraph;
