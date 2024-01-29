// VoterTurnoutChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const VoterTurnoutChart = ({ data }) => {
  const { timestamp, votes_cast } = data;

  const chartData = {
    labels: timestamp,
    datasets: [
      {
        label: 'Votes Cast',
        data: votes_cast,
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
      },
    ],
  };

  return( 
    <>
      <Line data={chartData} />
    </>
  );
};

export default VoterTurnoutChart;
