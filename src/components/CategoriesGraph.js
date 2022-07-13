import * as d3 from "d3";
import { useRef, useState, useEffect } from "react";
import useDeepCompareEffect from 'use-deep-compare-effect';

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
      const WIDTH = 600;
      const HEIGHT = 600;
      const RADIUS = WIDTH / 2;
      const formattedData = [];

      for (const [key, value] of Object.entries(categoriesCounter)) {
        formattedData.push({category: key, count: value});
      }

      const pieData = d3.pie().value(d => d.count)(formattedData);
      const arcGenerator = d3.arc().innerRadius(0).outerRadius(RADIUS);
      const color = d3.scaleOrdinal().range(d3.schemeSet3);

      const svg = d3.select(svgRef.current)
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
        .append('g')
        .attr('transform', 'translate(300, 300)');

      const tooldiv = d3.select('#chartArea')
        .append('div')
        .style('visibility', 'hidden')
        .style('position', 'absolute')
        .style('background-color', 'black')
        .style('color', 'white');

      svg.append('g').selectAll('path')
        .data(pieData)
        .join('path')
        .attr('d', arcGenerator)
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
    }
  }, [categoriesCounter]);

  return (
    <>
      <div id='chartArea'>
        {
          Object.keys(categoriesCounter).length && <svg ref={svgRef} />
        }
      </div>
    </>
  );
}

export default CategoriesGraph;
