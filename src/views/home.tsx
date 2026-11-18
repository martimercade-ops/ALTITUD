import { Hero } from "@/views/hero";
import { LogoMarquee } from "@/views/logo-marquee";
import { About } from "@/views/about";
import { Stats } from "@/views/stats";
import { Showcase } from "@/views/showcase";
import { Works } from "@/views/works";
import { Agencia360 } from "@/views/agencia-360";
import { ContactForm } from "@/views/contact-form";
import { SiteFooter } from "@/views/site-footer";
import { SiteNav } from "@/views/site-nav";
import { Reviews } from "@/views/reviews";
import { Team } from "@/views/team";
import { Method } from "@/views/method";
import { methodContent } from "@/data/mocks/method";
import { contactContent, footerContent } from "@/data/mocks/contact";
import { homeContent, preloaderContent, type HomeContent } from "@/data/mocks/home";
import { Preloader } from "@/components/common/preloader";
import { RobotProvider, RobotView } from "@/components/common/robot-view";

export interface HomeViewProps {
  content?: HomeContent;
  robot?: boolean;
}

export const HomeView = ({ content = homeContent, robot = false }: HomeViewProps) => {
  const { hero, logos, about, stats, showcase, works, nav, reviews, team } = content;
  return (
    <RobotProvider robot={robot}>
      {robot && <RobotView />}
      <Preloader markSrc="/assets/altitud/simbol.svg" label="Carregant" {...preloaderContent} />
      <SiteNav {...nav} navLabel="Principal" />
      <main id="top" className="w-full bg-hero-page">
        <Hero content={hero} />
      <LogoMarquee content={logos} />
      <About content={about} labelId={about.labelId} />
      <Stats content={stats} />
      <Showcase content={showcase} />
      <Works content={works} />
      <Method content={methodContent} />
      <Agencia360 />
      <Reviews content={reviews} />
      <Team content={team} />
      <div className="relative">
        <ContactForm content={contactContent} />
        <SiteFooter content={footerContent} />
      </div>
      </main>
    </RobotProvider>
  );
};
