import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

export default async function admin({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page, navigation } = await getDictionary(lang);

  return <div className=""></div>;
}