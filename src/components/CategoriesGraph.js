import * as d3 from "d3";
import { useRef, useEffect } from "react";

function CategoriesGraph({ contents }) {
  const categoriesCounter = getCategoriesCounter();
  const svgRef = useRef();
  const printCategories = () => {
    const array = [];
    const frequencyCounter = {};

    contents.posts.forEach((post) => {
      const categories = post.categoriesResult?.categories;

      if (categories?.length) {
        const mostRelevantCategory = categories[0];

        frequencyCounter[mostRelevantCategory.name] ? frequencyCounter[mostRelevantCategory.name]++ : frequencyCounter[mostRelevantCategory.name] = 1;
      }
    });

    let index = 0;

    for (const [key, value] of Object.entries(frequencyCounter)) {
      array.push(<div key={index}><span>{key}</span><span>{value}</span></div>);
      index++;
    }

    return array;
  }

  const getCategoriesCounter = () => {
    let categoriesCounter = {};

    contents.posts.forEach((post) => {
      const categories = post.categoriesResult?.categories;

      if (categories?.length) {
        const mostRelevantCategory = categories[0];

        categoriesCounter[mostRelevantCategory.name] ? categoriesCounter[mostRelevantCategory.name]++ : categoriesCounter[mostRelevantCategory.name] = 1;
      }
    });

    return categoriesCounter;
  }

  useEffect(() => {
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
  }, [categoriesCounter]);

  return (
    <>
      <div id='chartArea'>
        <svg ref={svgRef} />
      </div>
    </>
  );
}

export default CategoriesGraph;
