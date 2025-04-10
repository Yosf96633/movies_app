import Link from 'next/link';
import React from 'react'
interface NewsArticle {
    article_id: string;
    title: string;
    link: string;
    keywords: string[];
    creator: string[];
    description: string;
    content: string;
    pubDate: string;
    pubDateTZ: string;
    image_url: string;
    video_url: string | null;
    source_id: string;
    source_name: string;
    source_priority: number;
    source_url: string;
    source_icon: string;
    language: string;
    country: string[];
    category: string[];
    sentiment: string;
    sentiment_stats: string;
    ai_tag: string;
    ai_region: string;
    ai_org: string;
    duplicate: boolean;
  }
  const articles = [
    {
      article_id: "5db95bece90ac61c455b0c59d5a63513",
      title: "El espeluznante documental sobre un asesino en serie que se ha alzado al Top 3 de Netflix en España",
      link: "https://www.mundodeportivo.com/elotromundo/television/20250409/1002442411/espeluznante-documental-sobre-asesino-serie-alzado-top-3-netflix-espana-tvp-dct.html",
      keywords: ["televisión"],
      creator: ["Autor Redacción"],
      description: "Las plataformas de contenido en streaming como Netflix, HBO Max o Prime Video siguen ampliando semanalmente su catálogo...",
      content: "ONLY AVAILABLE IN PAID PLANS",
      pubDate: "2025-04-09 16:17:56",
      pubDateTZ: "UTC",
      image_url: "https://www.mundodeportivo.com/files/image_449_220/uploads/2025/04/09/67f69b7fba48e.jpeg",
      video_url: null,
      source_id: "mundodeportivo",
      source_name: "Mundo Deportivo",
      source_priority: 2442,
      source_url: "https://www.mundodeportivo.com",
      source_icon: "https://i.bytvi.com/domain_icons/mundodeportivo.png",
      language: "spanish",
      country: ["spain"],
      category: ["world"],
      sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
      ai_org: "ONLY AVAILABLE IN CORPORATE PLANS",
      duplicate: false
    },
    {
      article_id: "98684e19336ba9f0ddda0c83d62a0c77",
      title: "Meghan Markle Reveals She Suffered ‘Rare And Scary’ Medical Condition After Childbirth – Postpartum Preeclampsia",
      link: "https://www.thehealthsite.com/news/meghan-markle-health-duchess-of-sussex-reveals-she-suffered-rare-and-scary-medical-condition-after-childbirth-postpartum-preeclampsia-1205489/",
      keywords: [
        "post-pregnancy challenges",
        "postpartum preeclampsia",
        "health news",
        "meghan markle health",
        "pregnancy complications",
        "uk news",
        "meghan markle"
      ],
      creator: ["Satata Karmakar"],
      description: "Meghan Markle called postpartum preeclampsia “so rare” and “so scary,” recalling the emotional toll...",
      content: "ONLY AVAILABLE IN PAID PLANS",
      pubDate: "2025-04-09 16:17:52",
      pubDateTZ: "UTC",
      image_url: "https://st1.thehealthsite.com/wp-content/uploads/2025/04/Meghan-Markle-Reveals-She-Suffered-Rare-and-Scary-Medical-Condition-After-Childbirth-%E2%80%93-A-Battle-With-Postpartum-Preeclampsia.jpg",
      video_url: null,
      source_id: "thehealthsite",
      source_name: "Thehealthsite",
      source_priority: 13386,
      source_url: "https://www.thehealthsite.com",
      source_icon: "https://i.bytvi.com/domain_icons/thehealthsite.png",
      language: "english",
      country: ["india"],
      category: ["health"],
      sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
      ai_org: "ONLY AVAILABLE IN CORPORATE PLANS",
      duplicate: false
    },
    {
      article_id: "b08f3395ef94232c626f1a1335e7aab3",
      title: "Rafa Nadal and his wife Mery Perelló expecting their second child",
      link: "https://euroweeklynews.com/2025/04/09/rafa-nadal-and-his-wife-mery-perello-expecting-their-second-child/",
      keywords: ["celebrity news", "rafa nadal"],
      creator: ["Farah Mokrani"],
      description: "Spanish tennis legend Rafa Nadal and his wife Mery Perelló (known to many as Xisca) are preparing to welcome their [...]",
      content: "ONLY AVAILABLE IN PAID PLANS",
      pubDate: "2025-04-09 16:16:59",
      pubDateTZ: "UTC",
      image_url: "https://cdn.euroweeklynews.com/wp-content/uploads/2025/04/Rafa-Nadal.jpg",
      video_url: null,
      source_id: "euroweeklynews",
      source_name: "Euro Weekly News",
      source_priority: 40414,
      source_url: "https://euroweeklynews.com",
      source_icon: "https://i.bytvi.com/domain_icons/euroweeklynews.png",
      language: "english",
      country: ["spain"],
      category: ["top"],
      sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
      ai_org: "ONLY AVAILABLE IN CORPORATE PLANS",
      duplicate: false
    },
    {
      article_id: "63f8e55f60849fbcaf0ec3a37cd0a57f",
      title: "Where are Influencer Piper Rockelle and The Squad now? What We Know",
      link: "https://www.newsweek.com/piper-rockelle-documentary-netflix-tiffany-smith-squad-where-2057453",
      keywords: null,
      creator: null,
      description: "Netflix's 'Bad Influence: The Dark Side of Kidfluencing' exposes the rise and fall of Piper Rockelle and a controversial social media group, The Squad.",
      content: "ONLY AVAILABLE IN PAID PLANS",
      pubDate: "2025-04-09 16:15:52",
      pubDateTZ: "UTC",
      image_url: "https://d.newsweek.com/en/full/2624126/piper-rockelle.jpg",
      video_url: null,
      source_id: "newsweek",
      source_name: "Newsweek",
      source_priority: 537,
      source_url: "https://www.newsweek.com",
      source_icon: "https://i.bytvi.com/domain_icons/newsweek.png",
      language: "english",
      country: ["united states of america"],
      category: ["top"],
      sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
      ai_org: "ONLY AVAILABLE IN CORPORATE PLANS",
      duplicate: false
    }
  ];
  
const News = async () => {
    const [ar1 , ar2 , ar3 , ar4] = articles
    // const response = await fetch(`${process.env.NEWSDATA_BASE_URL}?apikey=${process.env.NEWSDATA_API_KEY}&q=netflix` , {
    //     cache:"force-cache",
    //     next:{
    //         revalidate:86400,
    //     }
    // })
    // const result = await response.json();
    // const data:NewsArticle = result?.results?.slice(0,4);
  return (
    <div className=" flex flex-col px-6 py-6 space-y-6">
      <h1 className=" md:text-4xl text-3xl font-extrabold">Related News</h1>
      <div className=" h-[75vh] grid grid-cols-3 grid-rows-2 max-md:grid-cols-1 max-md:grid-rows-4 gap-4 p-1 md:p-6 w-[90vw] mx-auto">
      {/* Item 1 - spans 2 columns */}
      <div className=" flex flex-col items-center md:space-y-2 cursor-pointer md:col-span-2 md:p-4 p-2 bg-[#D7DAEA] md:row-span-1 rounded-2xl shadow-md">
         <h1 className=' md:text-xl text-sm text-black  font-bold'>{ar1.title}</h1>
         <p className=' self-start text-black  max-md:text-xs '>From <span className=' uppercase'>{ar1.country.at(0)}</span></p>
         <p className=' self-start  text-black  max-md:text-xs'>At {ar1.pubDate}</p>
         <Link href={'/'} className='  max-md:text-xs text-xl font-bold self-start text-blue-500'>Click here for more details</Link>
         
      </div>

      {/* Item 2 */}
      <div className="bg-[#FAF1E2]  flex flex-col items-center md:space-y-2 cursor-pointer md:p-4 p-2 rounded-2xl  shadow-md">
      <h1 className=' md:text-xl text-sm text-black  font-bold'>{ar2.title}</h1>
         <p className='self-start  text-black max-md:text-xs '>From <span className=' uppercase'>{ar2.country.at(0)}</span></p>
         <p className='self-start text-black  max-md:text-xs '>At {ar2.pubDate}</p>
         <Link href={'/'} className='  max-md:text-xs text-xl font-bold self-start text-blue-500'>Click here for more details</Link>
      </div>

      {/* Item 3 */}
      <div className="bg-gray-200  flex flex-col items-center md:space-y-2 cursor-pointer  rounded-2xl md:p-4 p-2 shadow-md">
      <h1 className=' md:text-xl text-sm  text-black font-bold'>{ar3.title}</h1>
         <p className=' self-start text-black  max-md:text-xs  '>From <span className=' uppercase'>{ar3.country.at(0)}</span></p>
         <p className='self-start text-black  max-md:text-xs '>At {ar3.pubDate}</p>
         <Link href={'/'} className=" max-md:text-xs text-xl font-bold self-start text-blue-500">Click here for more details</Link>
      </div>

      {/* Item 4 - spans 2 columns */}
      <div className="md:col-span-2 bg-green-100 flex flex-col items-center md:space-y-2 cursor-pointer md:p-4 p-2 rounded-2xl shadow-md">
      <h1 className='  md:text-xl text-black  text-sm font-bold'>{ar4.title}</h1>
         <p className=' self-start text-black  max-md:text-xs  '>From <span className=' uppercase'>{ar4.country.at(0)}</span></p>
         <p className='self-start text-black  max-md:text-xs '>At {ar4.pubDate}</p>
         <Link href={'/'} className=' max-md:text-xs text-xl font-bold self-start text-blue-500'>Click here for more details</Link>
      </div>
    </div>
    </div>
  )
}

export default News