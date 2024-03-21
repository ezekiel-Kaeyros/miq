import Footer from '@/app/components/footer/Footer';
import MultiStepForm from '@/app/components/forms/multistep/MultiStepForm';
import Header from '@/app/components/header/header';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

export default async function melden({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);

  return (
    <div className="h-full md:mx-12 mx-2">
      <Header lang={lang} />
      <div className="md:mt-16 mt-4 px-2 sm:px-[40px] xl:px-[200px] ">
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam enim exercitationem fuga eveniet molestias eum dolorum omnis vitae culpa voluptatum, necessitatibus ratione dolorem fugit quae quibusdam ut perferendis suscipit numquam!</p><br />
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam enim exercitationem fuga eveniet molestias eum dolorum omnis vitae culpa voluptatum, necessitatibus ratione dolorem fugit quae quibusdam ut perferendis suscipit numquam!</p><br />
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam enim exercitationem fuga eveniet molestias eum dolorum omnis vitae culpa voluptatum, necessitatibus ratione dolorem fugit quae quibusdam ut perferendis suscipit numquam!</p>
      </div>
      <div className="mt-96 relative">
        <Footer footer={page.footer} />
      </div>
    </div>
  );
}
