import {
    Brain,
    FileText,
    Briefcase,
    Globe,
    Handshake,
    User,
    Bot,
    Layers,
    PenSquare,
    MousePointerClick,
    TrendingUp
  } from "lucide-react";
  
  export const curriculum = [
    {
      semester: "Semester 1",
      title: "Launchpad to Leadership",
      modules: [
        { name: "Transactional Analysis", icon: Handshake },
        { name: "Research Mindset", icon: Brain },
        { name: "Acing Corporate Skills 1.0", icon: Briefcase }
      ]
    },
    {
      semester: "Semester 2",
      title: "Catalysts for Collaboration",
      modules: [
        { name: "Digital Marketing", icon: Globe },
        { name: "Sales & Negotiation Skills", icon: Handshake },
        { name: "Body Language", icon: User },
        { name: "Acing Corporate Skills 2.0", icon: Briefcase }
      ]
    },
    {
      semester: "Semester 3",
      title: "Pathways to Mastery",
      modules: [
        { name: "AI & ML", icon: Bot },
        { name: "Gestalt Theory", icon: Layers },
        { name: "Project Writing", icon: PenSquare },
        { name: "Acing Corporate Skills 3.0", icon: Briefcase }
      ]
    },
    {
      semester: "Semester 4",
      title: "Pinnacle of Professionalism",
      modules: [
        { name: "Nudge Theory", icon: MousePointerClick },
        { name: "Acing Corporate Skills 4.0", icon: TrendingUp }
      ]
    }
  ];
  