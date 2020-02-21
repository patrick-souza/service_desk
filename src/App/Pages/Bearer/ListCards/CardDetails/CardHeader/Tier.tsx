import { ReactComponent as Platinum } from 'assets/tier-platinum.svg';

import { ReactComponent as Gold } from 'assets/tier-gold.svg';

import { ReactComponent as Partner } from 'assets/tier-partner.svg';

import { ReactComponent as Diamond } from 'assets/tier-diamond.svg';

import React from 'react';
import { Tier as ITier } from 'App/Redux/modules/Card';

export default function Tier({ tier }: { tier: ITier }) {
  switch (tier) {
    case 'diamond':
      return <Diamond />;
    case 'gold':
      return <Gold />;
    case 'partner':
      return <Partner />;
    case 'platinum':
      return <Platinum />;
    default:
      return <Platinum />;
  }
}
