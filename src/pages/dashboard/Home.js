import React from 'react';

import SectorDonutChart from './SectorDonutChart';
import SectorBarChart from './SectorBarChart';

function Home() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-center mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SectorDonutChart />
        <SectorBarChart />
      </div>
    </div>
  );
}

export default Home;
