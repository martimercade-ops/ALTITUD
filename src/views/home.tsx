import { Hero } from "@/views/hero";
import { LogoMarquee } from "@/views/logo-marquee";
import { About } from "@/views/about";
import { Showcase } from "@/views/showcase";
import { Works } from "@/views/works";
import { Agencia360 } from "@/views/agencia-360";
import { Eines } from "@/views/arrels";
import { ContactForm } from "@/views/contact-form";
import { SiteFooter } from "@/views/site-footer";
import { SiteNav } from "@/views/site-nav";
import { Reviews } from "@/views/reviews";
import { Team } from "@/views/team";
import { Diferencial } from "@/views/diferencial";
import { Method } from "@/views/method";
import { methodContent } from "@/data/mocks/method";
import { contactContent, footerContent } from "@/data/mocks/contact";
import { homeContent, preloaderContent, type HomeContent } from "@/data/mocks/home";
import { Preloader } from "@/components/common/preloader";
import { RobotProvider, RobotView } from "@/components/common/robot-view";
import { getI18n } from "@/i18n/server";

export interface HomeViewProps {
  content?: HomeContent;
  robot?: boolean;
}

export const HomeView = ({ content = homeContent, robot = false }: HomeViewProps) => {
  const { T, t } = getI18n();
  const { hero, logos, about, showcase, works, nav, team } = T(content);
  // Les ressenyes són paraules dels clients: es mostren tal com les van escriure
  const reviews = { ...T({ ...content.reviews, items: [] }), items: content.reviews.items };
  return (
    <RobotProvider robot={robot}>
      {robot && <RobotView />}
      <Preloader markSrc="/assets/altitud/simbol.svg" label={t("Carregant")} {...preloaderContent} />
      <SiteNav {...nav} navLabel={t("Principal")} />
      <main id="top" className="w-full bg-hero-page">
        <Hero content={hero} />
      <LogoMarquee content={logos} />
      <Reviews content={reviews} />
      <About content={about} labelId={about.labelId} />
      <Showcase content={showcase} />
      <Eines />
      <Diferencial />
      <Works content={works} />
      <Method content={T(methodContent)} />
      <Agencia360 />
      <Team content={team} />
      <div className="relative">
        <ContactForm content={T(contactContent)} />
        <SiteFooter content={T(footerContent)} />
      </div>
      </main>
    </RobotProvider>
  );
};
