import React from 'react';
import HeroSection from '../components/HeroSection';
import { Link } from 'react-router-dom';

const DelegatesPage = () => {
  // Expanded dataset with realistic delegate information
  const delegates = [
    {
      id: 1,
      name: 'mintblockchain.eth',
      avatar: '🍃',
      avatarBgColor: 'bg-green-500',
      op: '1.07M',
      participation: '20%',
      description: '**Introduction to Mint Blockchain** Mint Blockchain, the native Ethereum L2 scaling solution, focuses on sustainable blockchain development and eco-friendly consensus mechanisms. Active participant in governance since 2022.'
    },
    {
      id: 2,
      name: '0x2c...2b63',
      avatar: '➕',
      avatarBgColor: 'bg-red-500',
      op: '388.5K',
      participation: '0%',
      description: null
    },
    {
      id: 3,
      name: 'jackanorak.eth',
      avatar: '🎧',
      avatarBgColor: 'bg-gray-900',
      op: '1.855M',
      participation: '85%',
      description: 'Delegates have a primary job: direct Zeno\'s capacity to support the collective good. Focused on protocol security and sustainable scaling solutions for the Zeno ecosystem.'
    },
    {
      id: 4,
      name: 'defi_maximalist.eth',
      avatar: '💎',
      avatarBgColor: 'bg-blue-500',
      op: '725.3K',
      participation: '92%',
      description: 'DeFi ecosystem developer and advocate. Contributing to Zeno\'s financial infrastructure since inception. Focused on improving capital efficiency and reducing barriers to entry.'
    },
    {
      id: 5,
      name: 'governance_sage.eth',
      avatar: '🏛️',
      avatarBgColor: 'bg-purple-500',
      op: '2.31M',
      participation: '95%',
      description: 'Governance specialist with experience in DAOs and traditional organizations. Advocating for transparent decision-making processes and sustainable tokenomics models.'
    },
    {
      id: 6,
      name: 'tech_pioneer.eth',
      avatar: '🚀',
      avatarBgColor: 'bg-orange-500',
      op: '952.8K',
      participation: '78%',
      description: 'Layer 2 scaling solutions researcher and implementer. Working on improving transaction throughput while maintaining decentralization. Regular contributor to Zeno improvement proposals.'
    },
    {
      id: 7,
      name: 'research_wizard.eth',
      avatar: '📚',
      avatarBgColor: 'bg-indigo-500',
      op: '1.62M',
      participation: '88%',
      description: 'Academic researcher focused on blockchain scalability and zero-knowledge proofs. Publishing regular analyses of Zeno network performance and contributing to the technical documentation. Active in governance since early 2023.',
    },
    {
      id: 8,
      name: 'ecosystem_builder.eth',
      avatar: '🌱',
      avatarBgColor: 'bg-emerald-500',
      op: '893.7K',
      participation: '82%',
      description: 'Focused on growing the Zeno ecosystem through developer tooling and education initiatives. Founded multiple successful projects in the ecosystem and actively mentoring new teams.',
    },
    {
      id: 9,
      name: 'security_sentinel.eth',
      avatar: '🛡️',
      avatarBgColor: 'bg-yellow-500',
      op: '1.93M',
      participation: '97%',
      description: 'Smart contract security expert conducting regular audits of protocol upgrades. Contributing to the development of security standards and best practices for the Zeno ecosystem.',
    },
    {
      id: 10,
      name: 'community_catalyst.eth',
      avatar: '🤝',
      avatarBgColor: 'bg-pink-500',
      op: '1.15M',
      participation: '90%',
      description: 'Community organizer and advocate focusing on governance participation and user engagement. Hosting regular governance calls and maintaining comprehensive proposal summaries.',
    },
    {
      id: 11,
      name: 'protocol_architect.eth',
      avatar: '⚙️',
      avatarBgColor: 'bg-cyan-500',
      op: '2.05M',
      participation: '94%',
      description: 'Core protocol developer with expertise in rollup technology and cross-chain communication. Leading several key protocol upgrades and optimization initiatives.',
    },
    {
      id: 12,
      name: 'tokenomics_sage.eth',
      avatar: '📊',
      avatarBgColor: 'bg-violet-500',
      op: '1.47M',
      participation: '86%',
      description: 'Economics researcher specializing in token mechanism design and incentive alignment. Contributing to the development of sustainable tokenomics models for the Zeno ecosystem.',
    }
  ];

  // Delegate card component with consistent height
  const DelegateCard = ({ delegate }) => (
    <Link 
        to={`/delegate/${delegate.id}`} 
        className="block bg-white rounded-lg p-6 shadow-sm border border-gray-100 
                  hover:shadow-md transition-shadow duration-200 h-[280px]"
      >      {/* Header with avatar and name */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-full ${delegate.avatarBgColor} flex items-center justify-center text-white text-xl`}>
          {delegate.avatar}
        </div>
        <span className="font-medium text-lg">{delegate.name}</span>
      </div>

      {/* Stats */}
      <div className="flex gap-4 mb-4">
        <div className="font-medium">{delegate.op} ZENO</div>
        {delegate.participation && (
          <div className="text-gray-600">{delegate.participation} Participation</div>
        )}
      </div>

      {/* Description - now in a fixed-height container */}
      <div className="flex-grow mb-4">
        {delegate.description ? (
          <p className="text-gray-600 line-clamp-3">
            {delegate.description}
          </p>
        ) : (
          <div className="text-gray-400 italic">No description provided</div>
        )}
      </div>

      {/* Delegate button - always at bottom */}
      <button className="w-full py-2 text-center border rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
        Delegate
      </button>
      </Link>
  );

  return (
    <>
    <HeroSection></HeroSection>
    <div className="max-w-7xl mx-auto p-6">
      {/* Header section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-6">
          <button className="text-xl font-bold">Delegates</button>
        </div>

        <div className="flex gap-4">
          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Attestation ID or Schema"
              className="w-80 px-4 py-2 rounded-lg border border-gray-200 pl-10"
            />
            <svg
              className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Filter buttons */}
          <button className="px-4 py-2 border rounded-lg flex items-center gap-2">
            All Issues
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <button className="px-4 py-2 border rounded-lg flex items-center gap-2">
            Weighted random
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Grid of delegate cards */}
      <div className="grid grid-cols-3 gap-6">
        {delegates.map(delegate => (
          <DelegateCard key={delegate.id} delegate={delegate} />
        ))}
      </div>
    </div>
    </>
  );
};

export default DelegatesPage;