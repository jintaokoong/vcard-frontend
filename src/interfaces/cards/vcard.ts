import { BasicInfo } from '@/interfaces/cards/basic-info';
import { WorkInfo } from '@/interfaces/cards/work-info';

export interface Vcard {
  basicInfo: BasicInfo;
  workInfo: WorkInfo;
  notes: string;
}
