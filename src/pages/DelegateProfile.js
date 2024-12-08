import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { delegates } from '../data/delegatesData'; // Import your delegates data

const DelegateProfile = () => {
  const { id } = useParams(); // Get the delegate ID from the URL
  const navigate = useNavigate();

  // Find the delegate data from your delegates array
  const delegateData = delegates.find(d => d.id === parseInt(id));

  // If delegate not found, redirect to delegates page
  if (!delegateData) {
    navigate('/delegates');
    return null;
  }

  const delegate = {
    address: delegateData.name,
    avatar: delegateData.avatar,
    avatarBgColor: delegateData.avatarBgColor,
    votingPower: delegateData.op,
    delegatedAddresses: parseInt(delegateData.op.replace(/[MK]/g, '')) * 100, // Example calculation
    proposalsCreated: 0,
    votes: {
      for: Math.floor(parseInt(delegateData.participation) / 10),
      against: 0,
      abstain: 0
    },
    status: {
      text: parseInt(delegateData.participation) > 50 ? 'Active delegate' : 'Inactive delegate',
      subtext: `Voted in ${parseInt(delegateData.participation)}% of the most recent proposals`,
      participation: delegateData.participation
    }
  };

const delegations = [
  {
    allowance: '4.891 ZENO',
    delegatedOn: '12/08/2024',
    from: 'pishiii.eth',
    txnHash: 'hash1'
  },
  {
    allowance: '0.09 ZENO',
    delegatedOn: '12/08/2024',
    from: '0xd3...d454',
    txnHash: 'hash2'
  },
  {
    allowance: '17.011 ZENO',
    delegatedOn: '12/08/2024',
    from: 'cracen.eth',
    txnHash: 'hash3'
  },
  {
    allowance: '0.398 ZENO',
    delegatedOn: '12/07/2024',
    from: '0x15...59a4',
    txnHash: 'hash4'
  },
  {
    allowance: '0.37 ZENO',
    delegatedOn: '12/07/2024',
    from: '0x52...4a4b',
    txnHash: 'hash5'
  },
  {
    allowance: '0.29 ZENO',
    delegatedOn: '12/07/2024',
    from: '0x47...794f',
    txnHash: 'hash6'
  },
  {
    allowance: '0.544 ZENO',
    delegatedOn: '12/07/2024',
    from: 'tunadex.eth',
    txnHash: 'hash7'
  },
  {
    allowance: '0.135 ZENO',
    delegatedOn: '12/07/2024',
    from: '0x48...006d',
    txnHash: 'hash8'
  },
  {
    allowance: '1.107 ZENO',
    delegatedOn: '12/07/2024',
    from: '0x43...8c60',
    txnHash: 'hash9'
  }
];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Left sidebar with delegate info */}
      <div className="grid grid-cols-[400px,1fr] gap-8">
        <div className="space-y-6">
          {/* Status card */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="text-gray-700 font-medium">
                {delegate.status.text}
              </span>
              <div className="flex items-center">
                <span className="text-gray-600">💤</span>
                <span className="ml-1">{delegate.status.participation}</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              {delegate.status.subtext}
            </p>
          </div>

          {/* Delegate info card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className={`${delegate.avatarBgColor} w-12 h-12 rounded-full flex items-center justify-center text-white text-xl`}>
                {delegate.avatar}
              </div>
              <span className="font-medium text-lg">{delegate.address}</span>
            </div>

            {/* Stats */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Voting power</span>
                <span className="font-medium">{delegate.votingPower}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delegated addresses</span>
                <span className="font-medium">{delegate.delegatedAddresses}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Proposals created</span>
                <span className="font-medium">{delegate.proposalsCreated}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">For/Against/Abstain</span>
                <span className="font-medium">
                  <span className="text-green-600">{delegate.votes.for}</span>
                  <span className="text-gray-400 mx-1">/</span>
                  <span className="text-red-600">{delegate.votes.against}</span>
                  <span className="text-gray-400 mx-1">/</span>
                  <span className="text-gray-600">{delegate.votes.abstain}</span>
                </span>
              </div>
            </div>

            <button className="w-full mt-6 py-2 text-center border rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              Delegate
            </button>
          </div>
        </div>

        {/* Right side content */}
        <div className="space-y-8">
          {/* Statement section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Delegate Statement</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                The Anticapture Commission (ACC) is a key tokenholder group, mandated to prevent the capture of the Token House by any single tokenholder or group of tokenholders, including protocols, etc.
              </p>
              <p className="text-gray-700">
                This multisig comprises members of the Anticapture Commission (ACC), consisting of high-impact delegates who meet the membership criteria and Council Leads from all other existing Councils who chose to participate. In Season 5, the ACC received a delegation of 10 million from the Governance Fund and utilizes this delegate profile to vote on proposals where the Citizens' House holds a veto right (such as Protocol and Governor Upgrades), among some exceptions.
              </p>
              <p className="text-gray-700 mt-4">To read more about the ACC:</p>
              <ul className="list-disc pl-6 space-y-2 text-blue-600">
                <li>
                  <a href="#" className="hover:underline">Communication Thread</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Internal Operating Procedures</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Delegation table */}
          <div>
            <div className="flex gap-6 mb-4">
              <h2 className="text-2xl font-bold">Delegated from</h2>
              <h2 className="text-2xl font-bold text-gray-300">Delegated to</h2>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">Allowance</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">Delegated on</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">From</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">Txn Hash</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {delegations.map((delegation, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4">{delegation.allowance}</td>
                      <td className="px-6 py-4">{delegation.delegatedOn}</td>
                      <td className="px-6 py-4">{delegation.from}</td>
                      <td className="px-6 py-4">
                        <button className="flex items-center text-gray-600 hover:text-gray-900">
                          View
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DelegateProfile;