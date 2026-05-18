import type { ModuleData } from "@/types/course";
import { m1 } from "./modules/m1";
import { m2 } from "./modules/m2";
import { m3 } from "./modules/m3";
import { m4 } from "./modules/m4";
import { m5 } from "./modules/m5";
import { m6 } from "./modules/m6";       // Kubernetes I - Fundamentos
import { m6b } from "./modules/m6b";     // Kubernetes II - Workloads
import { m6c } from "./modules/m6c";     // Kubernetes III - Networking
import { m6d } from "./modules/m6d";     // Kubernetes IV - Storage & Config
import { m6e } from "./modules/m6e";     // Kubernetes V - Seguridad, Helm, Observabilidad
import { m7 } from "./modules/m7";       // Terraform (number=11)
import { m8 } from "./modules/m8";       // Observabilidad (number=12)
import { m9 } from "./modules/m9";       // DevSecOps (number=13)
import { m10 } from "./modules/m10";     // Cloud (number=14)
import { m11 } from "./modules/m11";     // Laboratorio K8s

// Re-numerar el lab final para que sea Modulo 15.
const renumber = (m: ModuleData, n: number): ModuleData => ({ ...m, number: n });

export const modules: ModuleData[] = [
  m1,
  m2,
  m3,
  m4,
  m5,
  m6,
  m6b,
  m6c,
  m6d,
  m6e,
  m7,
  m8,
  m9,
  m10,
  renumber(m11, 15),
];
