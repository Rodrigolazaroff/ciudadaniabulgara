import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { TrustStrip } from '@/components/TrustStrip';
import { Problem } from '@/components/Problem';
import { Services } from '@/components/Services';
import { Process } from '@/components/Process';
import { About } from '@/components/About';
import { Manual } from '@/components/Manual';
import { FAQ } from '@/components/FAQ';
import { Form } from '@/components/Form';
import { Instagram } from '@/components/Instagram';
import { Footer } from '@/components/Footer';
import { WaFloat } from '@/components/WaFloat';
import { RevealObserver } from '@/components/RevealObserver';

export default function Home() {
  return (
    <>
      <RevealObserver />
      <Header />
      <Hero />
      <TrustStrip />
      <Problem />
      <Services />
      <Process />
      <About />
      <Manual />
      <FAQ />
      <Form />
      <Instagram />
      <Footer />
      <WaFloat />
    </>
  );
}
