import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';
import { proposals } from '../data/proposalsData';

const ProposalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proposal, setProposal] = useState(null);

  useEffect(() => {
    // Convert id to number since URL parameters are strings
    const proposalData = proposals.find(p => p.id === parseInt(id));
    if (!proposalData) {
      navigate('/');
      return;
    }
    setProposal(proposalData);
  }, [id, navigate]);

  if (!proposal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex gap-8">
        {/* Left Column */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <span>{proposal.type} by {proposal.author}</span>
              <ExternalLink className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-bold">{proposal.title}</h1>
          </div>

          {/* Voting Chart */}
          <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <div className="flex justify-between mb-4">
              <button className="text-gray-600 hover:text-gray-900">
                Proposal Visualization
              </button>
              <div className="flex gap-4">
                <button className="text-gray-900">Timeline</button>
                <button className="text-gray-600">Composition</button>
              </div>
            </div>
            <LineChart 
              width={700} 
              height={300} 
              data={proposal.votingData}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#eee"
                vertical={false}
              />
              <XAxis 
                dataKey="timestamp" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#666' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value/1000000}M`}
                tick={{ fill: '#666' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
                formatter={(value) => [`${value/1000000}M ZENO`]}
              />
              <Line 
                type="stepAfter" 
                dataKey="votes" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
                fill="#dcfce7"
                fillOpacity={0.2}
              />
              <ReferenceLine 
                y={4500000} 
                stroke="#666" 
                strokeDasharray="5 5"
                label={{ 
                  value: "QUORUM", 
                  position: 'left',
                  fill: '#666',
                  fontSize: 12
                }}
              />
            </LineChart>
          </div>

          {/* Proposal Description */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <p className="text-gray-700">{proposal.description}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-96">
          {/* Voting Stats */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-semibold mb-4">Proposal votes</h2>
            
            <div className="space-y-4">
              {/* Vote counts */}
              <div className="flex justify-between text-sm">
                <span className="text-green-600">FOR {proposal.votes.for} ZENO</span>
                <span className="text-red-600">AGAINST {proposal.votes.against} ZENO</span>
              </div>
              
              {/* Progress bar */}
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                {/* Calculate the percentage based on the voting data */}
                <div 
                  className="h-full bg-green-500 relative"
                  style={{ 
                    width: `${(parseFloat(proposal.votes.for.replace('M', '')) / 
                    (parseFloat(proposal.votes.for.replace('M', '')) + 
                    parseFloat(proposal.votes.against.replace('K', '')) / 1000)) * 100}%` 
                  }}
                >
                  {/* Add small vertical line for threshold */}
                  <div className="absolute right-[51%] top-0 h-full w-0.5 bg-gray-400"/>
                </div>
              </div>
              
              {/* Quorum and threshold */}
              <div className="flex justify-between text-sm text-gray-600">
                <span>Quorum 4.5M ZENO</span>
                <span>Threshold 51%</span>
              </div>
              
              {/* Status badge */}
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-md text-sm font-medium ${
                  proposal.status === 'Active' 
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-green-100 text-green-600'
                }`}>
                  {proposal.status.toUpperCase()}
                </span>
                <span className="text-sm text-gray-600">
                  {proposal.endDate}
                </span>
              </div>
            </div>
          </div>

          {/* Voters List */}
          <div className="border-t">
            <div className="p-4">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Voters</span>
                <button className="text-gray-400 hover:text-gray-600">
                  Hasn't voted
                </button>
              </div>
              
              <div className="space-y-3">
                {proposal.voters.map(voter => (
                  <div key={voter.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm">
                        {voter.avatar}
                      </div>
                      <span className="font-medium">{voter.name}</span>
                      <span className="text-green-600 text-sm">voted for</span>
                    </div>
                    <span className="text-gray-600">{voter.votes}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Connect Wallet Button */}
          <div className="p-4 border-t">
            <button className="w-full py-2 text-center text-gray-600 hover:text-gray-900">
              Connect wallet to vote
            </button>
          </div>
        </div>
      </div>
    </div>
    );
  };

  export default ProposalDetails;