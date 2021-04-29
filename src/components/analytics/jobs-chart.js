import React, { useEffect, useState } from 'react';
import { Chart, ChartAxis, ChartBar, ChartStack, ChartTooltip } from '@patternfly/react-charts';

const JobsChart = () => {
  const [ width, setWidth ] = useState(0);
  const containerRef = React.createRef();

  useEffect(() => {
    if (containerRef.current && containerRef.current.clientWidth) {
      setWidth(containerRef.current.clientWidth);
    }
  }, []);

  const bars = [];
  for (let i = 1; i < 32; i++) {
    bars.push({ x: `Aug. ${i}`, y: Math.floor(Math.random() * 6) + 1 });
  }

  const renderSocketBars = () => {
    const socketBars = bars.map((tick) => {
      return {
        x: tick.x,
        y: tick.y,
        name: 'Sockets',
        label: `${tick.x} Sockets: ${tick.y}`
      };
    });
    return <ChartBar data={ socketBars } labelComponent={ <ChartTooltip constrainToVisibleArea /> } />;
  };

  const renderCoresBars = () => {
    const coresBars = bars.map((tick) => {
      return {
        x: tick.x,
        y: tick.y,
        name: 'Cores',
        label: `${tick.x} Cores: ${tick.y}`
      };
    });
    return <ChartBar data={ coresBars } labelComponent={ <ChartTooltip constrainToVisibleArea /> } />;
  };

  const renderNodesBars = () => {
    const nodesBars = bars.map((tick, index) => {
      return {
        key: index,
        x: tick.x,
        y: tick.y,
        name: 'Nodes',
        label: `${tick.x} Nodes: ${tick.y}`
      };
    });
    return <ChartBar data={ nodesBars } labelComponent={ <ChartTooltip constrainToVisibleArea /> } />;
  };

  const getTickValues = (offset = 2) => {
    const tickValues = [];
    for (let i = 1; i < 32; i++) {
      if (i % offset === 0) {
        tickValues.push(`Aug. ${i}`);
      }
    }

    return tickValues;
  };

  return (
    <div ref={ containerRef }>
      <div style={ { height: '225px' } }>
        <Chart
          ariaDesc="Stack Chart with monthly metric data"
          ariaTitle="Monthly Stack Chart"
          domainPadding={ { x: [ 30, 25 ]} }
          legendData={ [{ name: 'Sockets' }, { name: 'Cores' }, { name: 'Nodes' }] }
          legendPosition="bottom"
          height={ 225 }
          padding={ {
            bottom: 75, // Adjusted to accommodate legend
            left: 50,
            right: 50,
            top: 50
          } }
          width={ width }
        >
          <ChartAxis tickValues={ getTickValues() } fixLabelOverlap />
          <ChartAxis dependentAxis showGrid />
          <ChartStack domainPadding={ { x: [ 10, 2 ]} }>
            { renderSocketBars() }
            { renderCoresBars() }
            { renderNodesBars() }
          </ChartStack>
        </Chart>
      </div>
    </div>);
};

export default JobsChart;
