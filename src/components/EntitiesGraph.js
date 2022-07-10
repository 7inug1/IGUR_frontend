import * as d3 from "d3";
import { useRef, useEffect } from "react";

function EntitiesGraph({ contents }) {
  const getEntitiesCounter = () => {
    let entitiesCounter = {};

    contents.posts.forEach((post) => {
      const entities = post.entitiesResult?.entities;

      entities.forEach((entity) => {
        if (entity.metadata["wikipedia_url"]) {
          const coreEntity = entity;
          const pair = { count: 1 };

          if (entitiesCounter[coreEntity.name]) {
            entitiesCounter[coreEntity.name].count++;
          } else {
            Object.assign(pair, { wikipedia_url: coreEntity.metadata["wikipedia_url"] });
            entitiesCounter[coreEntity.name] = pair;
          };
        }
      })
    });

    return entitiesCounter;
  }

  const entitiesCounter = getEntitiesCounter();
  const svgRef = useRef();

  useEffect(() => {
    const WIDTH = 600;
    const HEIGHT = 600;
    const RADIUS = WIDTH / 2;
    const formattedData = [];

    for (const [key, value] of Object.entries(entitiesCounter)) {
      formattedData.push({name: key, count: value.count, wikipedia_url: value.wikipedia_url});
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
          .text(`${d.data.name}: ${d.data.count}`)
      })
      .on('mousemove', (event, d) => {
        tooldiv.style('top', (event.pageY - 50) + 'px')
          .style('left', (event.pageX - 50) + 'px')
      })
      .on('mouseout', () => {
        tooldiv.style('visibility', 'hidden')
      });
  }, [entitiesCounter]);

  return (
    <div id='chartArea'>
      <svg ref={svgRef} />
    </div>
  );
}

export default EntitiesGraph;
