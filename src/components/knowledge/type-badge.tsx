import { Badge } from "@/components/ui/badge";
import {
  knowledgeTypes,
  type KnowledgePostType,
} from "@/content/knowledge-types";

export function KnowledgeTypeBadge({ type }: { type: KnowledgePostType }) {
  const cfg = knowledgeTypes[type];
  return <Badge className={cfg.badgeClassName}>{cfg.label}</Badge>;
}

