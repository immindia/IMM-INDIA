// import {
//   Brain,
//   FileText,
//   Briefcase,
//   Globe,
//   Handshake,
//   User,
//   Bot,
//   Layers,
//   PenSquare,
//   MousePointerClick,
//   TrendingUp,
// } from "lucide-react";

import body from "@/assets/bba/icons/body.gif";
import collaboration from "@/assets/bba/icons/collaboration.gif";
import corporate from "@/assets/bba/icons/corporate.gif";
import digital from "@/assets/bba/icons/digital.gif";
import gestalt from "@/assets/bba/icons/Gestalt.gif";
import leadership from "@/assets/bba/icons/leadership.gif";
import nudge from "@/assets/bba/icons/nudge.gif";
import pathway from "@/assets/bba/icons/pathway.gif";
import professionalism from "@/assets/bba/icons/professionalism.gif";
import projects from "@/assets/bba/icons/projects.gif";
import research from "@/assets/bba/icons/research.gif";
import sales from "@/assets/bba/icons/Sales.gif";
import transaction from "@/assets/bba/icons/transaction.gif";
import ML from "@/assets/pgdm/ML.gif";

export const curriculum = [
  {
    semester: "Semester 1",
    title: { name: "Launchpad to Leadership", icon: leadership },
    modules: [
      { name: "Transactional Analysis", icon: transaction },
      { name: "Research Mindset", icon: research },
      { name: "Acing Corporate Skills 1.0", icon: corporate },
    ],
  },
  {
    semester: "Semester 2",
    title: { name: "Catalysts for Collaboration", icon: collaboration },
    modules: [
      { name: "Digital Marketing", icon: digital },
      { name: "Sales & Negotiation Skills", icon: sales },
      { name: "Body Language", icon: body },
      { name: "Acing Corporate Skills 2.0", icon: corporate },
    ],
  },
  {
    semester: "Semester 3",
    title: { name: "Pathways to Mastery", icon: pathway },
    modules: [
      { name: "AI & ML", icon: ML },
      { name: "Gestalt Theory", icon: gestalt },
      { name: "Project Writing", icon: projects },
      { name: "Acing Corporate Skills 3.0", icon: corporate },
    ],
  },
  {
    semester: "Semester 4",
    title: { name: "Pinnacle of Professionalism", icon: professionalism },
    modules: [
      { name: "Nudge Theory", icon: nudge },
      { name: "Acing Corporate Skills 4.0", icon: corporate },
    ],
  },
];
