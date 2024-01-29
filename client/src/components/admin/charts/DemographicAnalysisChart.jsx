  import React from 'react';
import { Bar } from 'react-chartjs-2';

const DemographicAnalysisChart = ({ data }) => {
  const { age_groups } = data;

  const chartData = {
    labels: Object.keys(age_groups),
    datasets: [
      {
        label: 'Male',
        data: Object.values(age_groups).map(group => group.male),
        backgroundColor: '#4299e1',
      },
      {
        label: 'Female',
        data: Object.values(age_groups).map(group => group.female),
        backgroundColor: '#f56565',
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default DemographicAnalysisChart;
