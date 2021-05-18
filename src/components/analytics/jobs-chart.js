import React, { useEffect, useState } from 'react';
import { Chart, ChartAxis, ChartBar, ChartStack, ChartTooltip } from '@patternfly/react-charts';

import chart_color_green_400 from '@patternfly/react-tokens/dist/js/chart_color_green_400';
import chart_color_red_300 from '@patternfly/react-tokens/dist/js/chart_color_red_300';

const JobsChart = (data) => {
  const [ width, setWidth ] = useState(window.innerWidth * 0.8);
  const containerRef = React.createRef();
  useEffect(() => {
    if (containerRef.current && containerRef.current.clientWidth) {
      setWidth(window.innerWidth * 0.8);
    }
  }, []);

  const bars = [];
  data?.items?.map((item) => {
    const date = new Date(item.created_date);
    const x = `${date.getMonth()}/${date.getDate()}`;
    return bars.push({ x, y: item });
  });

  const renderSuccessfulJobs = () => {
    const successBars = bars.map((tick) => {
      return {
        x: tick.x,
        y: tick.y.successful_count,
        name: 'Successful',
        label: `${tick.x} Successful: ${tick.y.successful_count}`
      };
    });
    return <ChartBar data={ successBars }
      style={ { fill: chart_color_green_400.value } }
      labelComponent={ <ChartTooltip constrainToVisibleArea /> } />;
  };

  const renderFailedJobs = () => {
    const failBars = bars.map((tick) => {
      return {
        x: tick.x,
        y: tick.y.failed_count,
        name: 'Failed',
        label: `${tick.x} Successful: ${tick.y.failed_count}`
      };
    });
    return <ChartBar data={ failBars }
      style={ { fill: chart_color_red_300.value } }
      labelComponent={ <ChartTooltip constrainToVisibleArea /> } />;
  };

  const getTickValues = () => {
    const tickValues = [];
    for (let i = 0; i < bars.length; i++) {
      const date = new Date(bars[i].y.created_date);
      tickValues.push(`${date.getMonth()}/${date.getDate()}`);
    }

    return tickValues;
  };

  const colorScaleArray = [
    chart_color_red_300.value,
    chart_color_green_400.value
  ];
  return (

    <div ref={ containerRef } style={ { height: '225px', width } }>
      <Chart
        ariaDesc="Jobs across clusters"
        ariaTitle="Jobs across clusters"
        domainPadding={ { x: [ 30, 25 ]} }
        barRatio={ 1 }
        height={ 225 }
        width={ width }
        padding={ {
          bottom: 40,
          left: 50,
          right: 20,
          top: 20
        } }
      >
        <ChartAxis tickValues={ getTickValues() } fixLabelOverlap />
        <ChartAxis dependentAxis showGrid />
        <ChartStack colorScale={ colorScaleArray } domainPadding={ { x: [ 10, 2 ]} }>
          { renderFailedJobs() }
          { renderSuccessfulJobs() }
        </ChartStack>
      </Chart>
    </div>);
};

export default JobsChart;
