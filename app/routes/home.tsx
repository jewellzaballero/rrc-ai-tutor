import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "RRC AI Tutor - Your Intelligent Learning Companion" },
    { name: "description", content: "Get personalized tutoring, instant answers, and academic support for Red River College courses powered by AI." },
  ];
}

export default function Home() {
  return <Welcome />;
}
