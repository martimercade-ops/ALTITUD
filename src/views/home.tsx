import { Hero } from "@/views/hero";
import { LogoMarquee } from "@/views/logo-marquee";
import { About } from "@/views/about";
import { Stats } from "@/views/stats";
import { Showcase } from "@/views/showcase";
import { Works } from "@/views/works";
import { Chain } from "@/views/chain";
import { Product } from "@/views/product";
import { ContactForm } from "@/views/contact-form";
import { SiteFooter } from "@/views/site-footer";
import { SiteNav } from "@/views/site-nav";
import { Reviews } from "@/views/reviews";
import { Team } from "@/views/team";
import { productContent } from "@/data/mocks/product";
import { contactContent, footerContent } from "@/data/mocks/contact";
import { homeContent, preloaderContent, type HomeContent } from "@/data/mocks/home";
import { Preloader } from "@/components/common/preloader";
import { RobotProvider, RobotView } from "@/components/common/robot-view";

export interface HomeViewProps {
  content?: HomeContent;
  robot?: boolean;
}

export const HomeView = ({ content = homeContent, robot = false }: HomeViewProps) => {
  const { hero, logos, about, stats, showcase, works, chain, nav, reviews, team } = content;
  return (
    <RobotProvider robot={robot}>
      {robot && <RobotView />}
      <Preloader markSrc="/assets/altitud/simbol.svg" label="Carregant" {...preloaderContent} />
      <SiteNav {...nav} navLabel="Principal" />
      <main id="top" className="w-full bg-hero-page">
        <Hero content={hero} />
      <LogoMarquee logos={logos.items} label={logos.label} />
      <About content={about} labelId={about.labelId} />
      <Stats content={stats} />
      <Showcase content={showcase} />
      <Works content={works} />
      <div className="relative">
        <Chain content={chain} />
        <Product content={productContent} />
      </div>
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
