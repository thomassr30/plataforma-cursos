import type { ModuleData } from "@/types/course";
import { m1 } from "./modules/m1";
import { m2 } from "./modules/m2";
import { m3 } from "./modules/m3";
import { m4 } from "./modules/m4";
import { m5 } from "./modules/m5";
import { m6 } from "./modules/m6";
import { m7 } from "./modules/m7";
import { m8 } from "./modules/m8";
import { m9 } from "./modules/m9";
import { m10 } from "./modules/m10";
import { m11 } from "./modules/m11";
import { m12 } from "./modules/m12";
import { m13 } from "./modules/m13";
import { m14 } from "./modules/m14";
import { m15 } from "./modules/m15";
import { m16 } from "./modules/m16";
import { m17 } from "./modules/m17";
import { m18 } from "./modules/m18";
import { m19 } from "./modules/m19";

export const modules: ModuleData[] = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15, m16, m17, m18, m19];

export function getModuleBySlug(slug: string) {
  return modules.find((m) => m.slug === slug);
}
