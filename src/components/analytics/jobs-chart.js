import React, { useEffect, useState } from 'react';
import { Chart, ChartAxis, ChartBar, ChartStack, ChartTooltip } from '@patternfly/react-charts';

import chart_color_green_400 from '@patternfly/react-tokens/dist/js/chart_color_green_400';
import chart_color_red_300 from '@patternfly/react-tokens/dist/js/chart_color_red_300';

const JobsChart = (data) => {
  const [ width, setWidth ] = useState(0);
  const containerRef = React.createRef();
  useEffect(() => {
    if (containerRef.current && containerRef.current.clientWidth) {
      setWidth(containerRef.current.clientWidth);
    }
  }, []);

  const bars = [];
  data?.items?.map((item, idx) => bars.push({ x: `${idx}`, y: item }));

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
      tickValues.push(`${i}`);
    }

    return tickValues;
  };

  const colorScaleArray = [
    chart_color_red_300.value,
    chart_color_green_400.value
  ];
  return (
    <div ref={ containerRef }>
      <div style={ { height: '225px' } }>
        <Chart
          ariaDesc="Jobs across clusters"
          ariaTitle="Jobs across clusters"
          domainPadding={ { x: [ 30, 25 ]} }
          legendPosition="bottom"
          barRatio={ 1 }
          height={ 225 }
          padding={ {
            bottom: 60,
            left: 50,
            right: 20,
            top: 20
          } }
          width={ width }
        >
          <ChartAxis tickValues={ getTickValues() } fixLabelOverlap />
          <ChartAxis dependentAxis showGrid />
          <ChartStack colorScale={ colorScaleArray } domainPadding={ { x: [ 10, 2 ]} }>
            { renderFailedJobs() }
            { renderSuccessfulJobs() }
          </ChartStack>
        </Chart>
      </div>
    </div>);
};

export default JobsChart;
