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
      { name: "Acing Corporate Skills 1.0", icon: corporate },
      { name: "Excel 1.0", icon: transaction },
      { name: "AI & ML", icon: ML },
      { name: "Professional Skills by EU Global", icon: research },
    ],
  },
  {
    semester: "Semester 2",
    title: { name: "Catalysts for Collaboration", icon: collaboration },
    modules: [
      { name: "Acing Corporate Skills 2.0", icon: corporate },
      { name: "Excel 2.0", icon: digital },
      { name: "Research Residency by EU Global", icon: research },
    ],
  },
  {
    semester: "Semester 3",
    title: { name: "Pathways to Mastery", icon: pathway },
    modules: [
      { name: "Acing Corporate Skills 3.0", icon: corporate },
      { name: "Advance Excel 3.0", icon: gestalt },
      { name: "Entrepreneurship & Start Up Pitch by EU Global", icon: projects },
    ],
  },
  {
    semester: "Semester 4",
    title: { name: "Pinnacle of Professionalism", icon: professionalism },
    modules: [
      { name: "Acing Corporate Skills 4.0", icon: corporate },
      { name: "Advance Excel 4.0", icon: sales },
      { name: "Sustainability & Leadership Excellence by EU Global", icon: nudge },
    ],
  },
];
