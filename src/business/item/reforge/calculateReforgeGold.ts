import {
  Tier,
  Equipment,
  ReforgeTable,
  ReforgeMaterials,
  ReforgeCase,
  Papyeon,
  AdditionalCase,
} from '@/constants/item/reforge/ReforgeTable';
import { MarketItemWithOneGold } from '../markets/transformMarketItem';
import { BookMaterials, BreathMaterials } from '@/constants/item/reforge/BojoTable';

export function calculateReforgeMaterials({
  items,
  tier,
  equipment,
  step,
  experience,
  janggi,
  increasedProbability,
  isLowTierSupport,
  isExpressEvent,
  reforgeCase,
  additionalCase,
}: {
  items: MarketItemWithOneGold[];
  tier: Tier;
  equipment: Equipment;
  step: number;
  experience: number;
  janggi: number;
  increasedProbability: number;
  isLowTierSupport: boolean;
  isExpressEvent: boolean;
  reforgeCase: ReforgeCase;
  additionalCase: AdditionalCase;
}): ReforgeMaterials {
  switch (reforgeCase) {
    case 'average':
      return averageReforgeMaterials({
        items,
        tier,
        equipment,
        step,
        experience,
        janggi,
        increasedProbability,
        isLowTierSupport,
        isExpressEvent,
      });
    case 'best':
      return bestReforgeMaterials({
        items,
        tier,
        equipment,
        step,
        experience,
      });
    case 'worst':
      return worstReforgeMaterials({
        items,
        tier,
        equipment,
        janggi,
        step,
        experience,
      });
  }
}

// 1트 만에 성공했을 때 필요한 재련 재료 계산
function bestReforgeMaterials({
  items,
  tier,
  equipment,
  step,
  experience,
}: {
  items: MarketItemWithOneGold[];
  tier: Tier;
  equipment: Equipment;
  step: number;
  experience: number;
}): ReforgeMaterials {
  let oneTryReforgeMaterials = ReforgeTable[tier][equipment][step];
  const { experience: _exp, probability: _prob, ...materials } = oneTryReforgeMaterials;
  const additionalPapyeon = calculateExperienceToPapyeon(tier, equipment, step, experience);

  const totalReforgeMaterials: ReforgeMaterials = { ...materials };
  addAdditionalPapyeonToMaterials(totalReforgeMaterials, tier, additionalPapyeon);

  return totalReforgeMaterials;
}

// 장기백 이었을 때 필요한 재련 재료 계산
function worstReforgeMaterials({
  items,
  tier,
  equipment,
  janggi,
  step,
  experience,
}: {
  items: MarketItemWithOneGold[];
  tier: Tier;
  equipment: Equipment;
  janggi: number;
  step: number;
  experience: number;
}): ReforgeMaterials {
  let oneTryReforgeMaterials = ReforgeTable[tier][equipment][step];
  const { experience: _exp, probability: _prob, ...materials } = oneTryReforgeMaterials;
  const additionalPapyeon = calculateExperienceToPapyeon(tier, equipment, step, experience);
  const totalReforgeMaterials: ReforgeMaterials = { ...materials };
  addAdditionalPapyeonToMaterials(totalReforgeMaterials, tier, additionalPapyeon);
  return materials;
}

// 평균적으로 필요한 재련 재료 계산
function averageReforgeMaterials({
  items,
  tier,
  equipment,
  step,
  experience,
  janggi,
  increasedProbability,
  isLowTierSupport,
  isExpressEvent,
}: {
  items: MarketItemWithOneGold[];
  tier: Tier;
  equipment: Equipment;
  step: number;
  experience: number;
  janggi: number;
  increasedProbability: number;
  isLowTierSupport: boolean;
  isExpressEvent: boolean;
}): ReforgeMaterials {
  let averageReforgeMaterials = ReforgeTable[tier][equipment][step];
  averageReforgeMaterials = {
    ...averageReforgeMaterials,
    experience: calculateExperienceToPapyeon(tier, equipment, step, experience),
  };

  return averageReforgeMaterials;
}

// 현재 장비의 경험치에 따른 필요 파편 수 계산
function calculateExperienceToPapyeon(
  tier: Tier,
  equipment: Equipment,
  step: number,
  experience: number
): number {
  return Math.ceil(ReforgeTable[tier][equipment][step].experience * ((100 - experience) / 100));
}

function addAdditionalPapyeonToMaterials(
  materials: ReforgeMaterials,
  tier: Tier,
  additionalPapyeon: number
): void {
  const papyeonByTier: Record<Tier, Papyeon> = {
    '2-1티어': '조화의 파편',
    '3-1티어': '명예의 파편',
    '3-2티어': '명예의 파편',
    '3-3티어': '명예의 파편',
    '4-1티어': '운명의 파편',
  };

  const papyeonType = papyeonByTier[tier];
  materials[papyeonType] = (materials[papyeonType] || 0) + additionalPapyeon;
}
