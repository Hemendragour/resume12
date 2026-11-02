import api from "../../../api/axios";
import type { CreditType } from "../../pricing/services/payment.service";

export type CreditAmounts = Partial<Record<CreditType, number>>;

export interface ReferralStats {
  /** The signed-in user's personal code, e.g. "K7M2QX9P". */
  code: string;
  /** Friends who joined with this code (never more than `goal`). */
  count: number;
  /** Friends needed to unlock the reward. */
  goal: number;
  /** True once the reward was added to the user's credits. */
  rewardGiven: boolean;
  /** Credits the user gets at the goal. */
  reward: CreditAmounts;
  /** Credits each friend gets when they sign up. */
  friendBonus: CreditAmounts;
}

export const getMyReferral = async (): Promise<ReferralStats> => {
  const { data } = await api.get("/referral/me");
  return data.data;
};
