import CookieConsent from '@/app/components/banners/CookieConsent';
import Faqs from '@/app/components/faqs/Faqs';
import Footer from '@/app/components/footer/Footer';
import MultiStepForm from '@/app/components/forms/multistep/MultiStepForm';
import Header from '@/app/components/header/header';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import Blog from '../about/page';

export default async function faqs({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);

  return (
    <div className="h-full md:mx-12 mx-2">
      <Header lang={lang} />
      <div className="md:mt-16 mt-4 px-2 sm:px-[40px] xl:px-[100px]  ">
        <Faqs faqs={page.faqs}/>
      </div>
      <div className="mt-96 relative">
        <Footer footer={page.footer} />
      </div>

      <CookieConsent
        lang={lang}
        cookieConsentTranslation={page?.cookiesConsent}
      />
    </div>
  );
}
