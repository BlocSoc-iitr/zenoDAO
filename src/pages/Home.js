import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ExternalLink } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import { proposals } from '../data/proposalsData';  // Add this import

const Home = () => {
  const VotingBar = ({ forVotes, againstVotes }) => {
    const convertVoteToNumber = (voteStr) => {
      const num = parseFloat(voteStr.replace(/[MK]/g, ''));
      const multiplier = voteStr.includes('M') ? 1000000 : (voteStr.includes('K') ? 1000 : 1);
      return num * multiplier;
    };

    const forNum = convertVoteToNumber(forVotes);
    const againstNum = convertVoteToNumber(againstVotes);
    const total = forNum + againstNum;

    const forPercentage = (forNum / total) * 100;
    const againstPercentage = (againstNum / total) * 100;

    return (
      <div className="w-40 h-1.5 rounded-full overflow-hidden flex">
        <div 
          className="h-full bg-green-500"
          style={{ width: `${forPercentage}%` }}
        />
        <div 
          className="h-full bg-red-500"
          style={{ width: `${againstPercentage}%` }}
        />
      </div>
    );
  };

  return (
    <>
      <HeroSection />
      <div className="w-full bg-white px-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-between items-center py-6">
            <h2 className="text-3xl font-bold">All Proposals</h2>
            <button className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50">
              Relevant
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
            <div className="bg-gray-50 px-6 py-3 flex justify-between items-center rounded-t-lg">
              <span className="text-gray-600">
                Currently in Special Voting Cycle #31a · Voting ends on December 11th
              </span>
              <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                View calendar
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            {proposals.map((proposal) => (
                <Link 
                key={proposal.id}
                to={`/proposal/${proposal.id}`}  // Make sure this matches your route path
                className="block hover:bg-gray-50 transition-colors"
                >
                <div className="grid grid-cols-[1fr,auto,auto] gap-4 px-6 py-4 items-center">
                  <div className="space-y-1">
                    <div className="text-gray-600 text-sm">
                      {proposal.type} by {proposal.author}
                    </div>
                    <div className="font-medium">
                      {proposal.title}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">
                      {proposal.endDate}
                    </div>
                    <div className={`font-medium ${
                      proposal.status === 'Active' ? 'text-blue-500' : 'text-green-600'
                    }`}>
                      {proposal.status}
                    </div>
                  </div>

                  <div className="w-80">
                    <div className="text-right mb-2 font-medium">
                      {proposal.votes.for} For – {proposal.votes.against} Against
                    </div>
                    <div className="ml-40">
                      <VotingBar 
                        forVotes={proposal.votes.for} 
                        againstVotes={proposal.votes.against}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
