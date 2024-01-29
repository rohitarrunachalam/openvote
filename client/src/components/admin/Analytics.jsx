import React from 'react'
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import VoterTurnoutChart from './charts/VoterTurnoutChart';
import DemographicAnalysisChart from './charts/DemographicAnalysisChart';
import Navbar from './Navbar';

const jsonData = {
    "voter_turnout_over_time": {
      "timestamp": ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"],
      "votes_cast": [500, 1200, 2500, 4000, 6000, 8000]
    },
    "demographic_analysis": {
        "age_groups": {
            "18-25": {
              "male": 120,
              "female": 80
            },
            "26-35": {
              "male": 180,
              "female": 120
            },
            "36-50": {
                "male": 300,
                "female": 250
              },
              "50+": {
                "male": 250,
                "female": 150
              },
    },
    "candidate_comparison": {
      "candidates": ["Candidate_A", "Candidate_B", "Candidate_C"],
      "votes_received": [3500, 2800, 4500]
    },
    "real_time_map_visualization": {
      "districts": ["District_A", "District_B", "District_C"],
      "votes": [1200, 1800, 2500]
    }
    }
};

export default function Analytics() {
    return (
        <div className="">
          <Navbar />
            <div className="flex flex-col items-center my-16">
            <div className="text-center w-[30%] mb-4">
                <h1 className="text-[20px] font-bold">Analytics</h1>
                <div className="">This Pages gives a comphrehensive analytics view of the Voting results</div>
            </div>
                <div className='flex flex-col mt-8 w-[80%]'>
                    <div className='my-8'>
                        <div>
                            <h1 className='outfit-500 text-[20px]'>Voter Turnout Over Time</h1>
                            <p className='outfit-300'>Visualizes the fluctuation in voter participation throughout the election day in real-time.</p>
                        </div>
                        <div className='mt-4'>
                        <VoterTurnoutChart data={jsonData.voter_turnout_over_time} />
                        </div>

                    </div>


                    <div className='my-8 flex items-center'>
                        <div className='w-1/3'>
                            <h1 className='outfit-500 text-[20px]'>Demographic Analysis</h1>
                            <p className='outfit-300'>Demographic Analysis involves studying and interpreting population characteristics, such as age, gender, income, and education, to gain insights into social patterns and make informed decisions in various fields, including marketing, public policy, and healthcare.</p>
                        </div>
                        <div className='mt-4 w-2/3'>
                        <DemographicAnalysisChart data={jsonData.demographic_analysis} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}